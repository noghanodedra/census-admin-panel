import React, {
  FunctionComponent, memo, useContext, useEffect,
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
    mutation updateCensus($id: string, $census: UpdateCensusInput!) {
        updateCensus(id: $id, data: $census) {
            id
        }
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();

  const { loading, data } = useQuery(GET_DATA);
  const [createCensus] = useMutation(ADD_RECORD);
  const [updateCensus] = useMutation(UPDATE_RECORD);

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [loading]);

  if (loading) {
    return null;
  }
  console.log(data);

  const addRecord = () => {
    const census = modelToObject(censusModel);
    console.log('recor', census);
    showLoading();
    createCensus({ variables: { census } })
      .then(({ data: any }) => {
        hideLoading();
        history.push('/app/entities/census');
      })
      .catch((e) => {
        console.log(e);
        hideLoading();
      });
  };

  const updateRecord = () => {};

  const deleteRecord = (id: number) => {};

  const table = () => (<CustomTable rows={data.censusList} columns={columnModel} delCallback={deleteRecord} />);

  const addRecordForm = () => (<FormPanel
    title="pages.subPages.census"
    submitCallback={addRecord}
    model={censusModel}
    isEdit={false}
  />);

  const editRecordForm = () => (
    <FormPanel
      title="pages.subPages.census"
      submitCallback={updateRecord}
      model={censusModel}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path="/app/entities/census/add" title="page.login" component={addRecordForm} />
        <Page path="/app/entities/census/edit" title="page.login" component={editRecordForm} />
        <Page path="/app/entities/census" title="page.login" component={table} />
      </Switch>
    </>
  );
};
export default memo(List);
