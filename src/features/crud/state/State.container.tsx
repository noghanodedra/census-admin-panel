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
import { columnModel, entityModel as stateModel } from './models';

const GET_DATA = gql`
  {
    stateList {
      id
      name
      code
    }
  }`;

const ADD_RECORD = gql`
    mutation createState($state: CreateStateInput!) {
        createState(data: $state) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateState($id: String!, $state: UpdateStateInput!) {
        updateState(id: $id, data: $state) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteState($id: String!) {
        deleteState(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createState] = useMutation(ADD_RECORD);
  const [updateState] = useMutation(UPDATE_RECORD);
  const [deleteState] = useMutation(DELETE_RECORD);

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
      const state = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, state } }) : mutationFn({ variables: { state } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.STATE}`);
      })
      .catch((e: any) => {
        console.log(e);
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.stateList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteState, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.STATE}
      submitCallback={(model: Object) => {
        doOperation(model, createState);
      }}
      model={stateModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.STATE}
      submitCallback={(model: Object) => {
        doOperation(model, updateState, editRecord.id);
      }}
      model={stateModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.STATE}/add`} title={PageTitleConstants.STATE} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.STATE}/edit`}
          title={PageTitleConstants.STATE}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.STATE}`} title={PageTitleConstants.STATE} component={table} />
      </Switch>
    </>
  );
};

export default List;
