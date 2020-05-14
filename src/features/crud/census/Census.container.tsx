import React, {
  FunctionComponent, useContext, useEffect, useState,
} from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Switch, useHistory } from 'react-router-dom';

import { CustomTable, Page } from 'components';
import FormPanel from 'components/FormPanel';
import { LoadingContext } from 'contexts';
import { modelToObject } from 'utils/helpers';
import { columnModel, entityModel as censusModel } from './models';


/*

const censusModel = [
  {
    id: 'name',
    label: 'Name',
    placeholder: 'Name',
    type: 'text',
    defaultValue: '',
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Name is required',
      },
      {
        id: 'name-length',
        isValidFun: (expression: any) => checkAtLeastLength(expression, 3),
        alert: 'Name is too short',
      },
    ],
  },
  {
    id: 'age',
    label: 'Age',
    placeholder: 'Age',
    type: 'select',
    defaultValue: '',
    lookUp: { key: 'name', value: 'id', options: [{ id: 1, name: 'one' }] },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Please select age.',
      },
    ],
  },
  {
    id: 'myage',
    label: 'myAge',
    placeholder: 'myAge',
    type: 'number',
    InputProps: {
      inputProps: {
        max: 10,
        min: 1,
      },
    },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Please enter age.',
      },
    ],
    onInput: (e:any) => onlyNumbers(e),
  },
];
*/

const GET_DATA = gql`
  {
    censusList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createCensus($census: CreateCensusInput!) {
        createCensus(data: $census) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateCensus($id: String!, $census: UpdateCensusInput!) {
        updateCensus(id: $id, data: $census) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteCensus($id: String!) {
        deleteCensus(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createCensus] = useMutation(ADD_RECORD);
  const [updateCensus] = useMutation(UPDATE_RECORD);
  const [deleteCensus] = useMutation(DELETE_RECORD);

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
    console.log(data);
  }, [loading]);

  if (loading) {
    return null;
  }

  const doOperation = (model:Object, mutationFn: Function, id?:string, del:boolean = false) => {
    let requestFn = null;
    console.log('id', id, 'ed', editRecord);
    console.log('model', model);

    if (!del) {
      const census = modelToObject(model);
      console.log('recor', census);
      requestFn = id ? mutationFn({ variables: { id, census } }) : mutationFn({ variables: { census } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace('/app/entities/census');
      })
      .catch((e: any) => {
        console.log(e);
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.censusList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteCensus, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (<FormPanel
    title="pages.subPages.census"
    submitCallback={(model: Object) => { doOperation(model, createCensus); }}
    model={censusModel}
    isEdit={false}
  />);

  const editRecordForm = () => (
    <FormPanel
      title="pages.subPages.census"
      submitCallback={(model: Object) => {
        doOperation(model, updateCensus, editRecord.id);
      }}
      model={censusModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path="/app/entities/census/add" title="pages.subPages.census" component={addRecordForm} />
        <Page path="/app/entities/census/edit" title="pages.subPages.census" component={editRecordForm} />
        <Page path="/app/entities/census" title="pages.subPages.census" component={table} />
      </Switch>
    </>
  );
};

export default List;
