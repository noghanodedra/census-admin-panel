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
import { columnModel, entityModel as workClassModel } from './models';

const GET_DATA = gql`
  {
    workClassList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createWorkClass($workClass: CreateWorkClassInput!) {
        createWorkClass(data: $workClass) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateWorkClass($id: String!, $workClass: UpdateWorkClassInput!) {
        updateWorkClass(id: $id, data: $workClass) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteWorkClass($id: String!) {
        deleteWorkClass(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createWorkClass] = useMutation(ADD_RECORD);
  const [updateWorkClass] = useMutation(UPDATE_RECORD);
  const [deleteWorkClass] = useMutation(DELETE_RECORD);

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
      const workClass = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, workClass } }) : mutationFn({ variables: { workClass } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.WORK_CLASS}`);
      })
      .catch((e: any) => {
        console.log(e);
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.workClassList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteWorkClass, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.WORK_CLASS}
      submitCallback={(model: Object) => {
        doOperation(model, createWorkClass);
      }}
      model={workClassModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.WORK_CLASS}
      submitCallback={(model: Object) => {
        doOperation(model, updateWorkClass, editRecord.id);
      }}
      model={workClassModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.WORK_CLASS}/add`} title={PageTitleConstants.WORK_CLASS} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.WORK_CLASS}/edit`}
          title={PageTitleConstants.WORK_CLASS}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.WORK_CLASS}`} title={PageTitleConstants.WORK_CLASS} component={table} />
      </Switch>
    </>
  );
};

export default List;
