import React, {
  FunctionComponent, useContext, useEffect, useState,
} from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Switch, useHistory } from 'react-router-dom';

import { CustomTable, Page } from 'components';
import FormPanel from 'components/FormPanel';
import { LoadingContext } from 'contexts';
import { modelToObject, setLookUpOptions } from 'utils/helpers';
import { RoutesConstants, PageTitleConstants, CommonConstants } from 'constants/common';
import { usePersistedState } from 'hooks';
import { columnModel, entityModel as individualModel } from './models';

const GET_DATA = gql`
    {
        individualList {
            id
            name
            age
            educationYears
            hoursPerWeek
        }
    }
`;

const ADD_RECORD = gql`
    mutation createIndividual($individual: CreateIndividualInput!) {
        createIndividual(data: $individual) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateIndividual($id: String!, $individual: UpdateIndividualInput!) {
        updateIndividual(id: $id, data: $individual) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteIndividual($id: String!) {
        deleteIndividual(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const [dropDownData, setDropDownData] = usePersistedState(CommonConstants.DROP_DOWN_DATA);
  setLookUpOptions(individualModel, dropDownData);


  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createIndividual] = useMutation(ADD_RECORD);
  const [updateIndividual] = useMutation(UPDATE_RECORD);
  const [deleteIndividual] = useMutation(DELETE_RECORD);

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

  const doOperation = (model:Object, mutationFn: Function, id?:string, del:boolean = false) => {
    let requestFn = null;
    if (!del) {
      const individual = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, individual } }) : mutationFn({ variables: { individual } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.INDIVIDUAL}`);
      })
      .catch((e: any) => {
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.individualList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteIndividual, id, true);
      }}
      setEditRecord={setEditRecord}
      disableActions={true}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.INDIVIDUAL}
      submitCallback={(model: Object) => {
        doOperation(model, createIndividual);
      }}
      model={individualModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.INDIVIDUAL}
      submitCallback={(model: Object) => {
        doOperation(model, updateIndividual, editRecord.id);
      }}
      model={individualModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.INDIVIDUAL}/add`} title={PageTitleConstants.INDIVIDUAL} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.INDIVIDUAL}/edit`}
          title={PageTitleConstants.INDIVIDUAL}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.INDIVIDUAL}`} title={PageTitleConstants.INDIVIDUAL} component={table} />
      </Switch>
    </>
  );
};

export default List;
