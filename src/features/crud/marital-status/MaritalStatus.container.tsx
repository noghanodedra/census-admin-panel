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
import { RoutesConstants, PageTitleConstants } from 'constants/common';
import { columnModel, entityModel as maritalStatusModel } from './models';

const GET_DATA = gql`
  {
    maritalStatusList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createMaritalStatus($maritalStatus: CreateMaritalStatusInput!) {
        createMaritalStatus(data: $maritalStatus) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateMaritalStatus($id: String!, $maritalStatus: UpdateMaritalStatusInput!) {
        updateMaritalStatus(id: $id, data: $maritalStatus) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteMaritalStatus($id: String!) {
        deleteMaritalStatus(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createMaritalStatus] = useMutation(ADD_RECORD);
  const [updateMaritalStatus] = useMutation(UPDATE_RECORD);
  const [deleteMaritalStatus] = useMutation(DELETE_RECORD);

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
      const maritalStatus = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, maritalStatus } }) : mutationFn({ variables: { maritalStatus } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.MARITAL_STATUS}`);
      })
      .catch((e: any) => {
        console.log(e);
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.maritalStatusList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteMaritalStatus, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.MARITAL_STATUS}
      submitCallback={(model: Object) => {
        doOperation(model, createMaritalStatus);
      }}
      model={maritalStatusModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.MARITAL_STATUS}
      submitCallback={(model: Object) => {
        doOperation(model, updateMaritalStatus, editRecord.id);
      }}
      model={maritalStatusModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.MARITAL_STATUS}/add`} title={PageTitleConstants.MARITAL_STATUS} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.MARITAL_STATUS}/edit`}
          title={PageTitleConstants.MARITAL_STATUS}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.MARITAL_STATUS}`} title={PageTitleConstants.MARITAL_STATUS} component={table} />
      </Switch>
    </>
  );
};

export default List;
