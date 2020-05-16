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
import { columnModel, entityModel as relationshipModel } from './models';

const GET_DATA = gql`
  {
    relationshipList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createRelationship($relationship: CreateRelationshipInput!) {
        createRelationship(data: $relationship) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateRelationship($id: String!, $relationship: UpdateRelationshipInput!) {
        updateRelationship(id: $id, data: $relationship) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteRelationship($id: String!) {
        deleteRelationship(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createRelationship] = useMutation(ADD_RECORD);
  const [updateRelationship] = useMutation(UPDATE_RECORD);
  const [deleteRelationship] = useMutation(DELETE_RECORD);

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
      const relationship = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, relationship } }) : mutationFn({ variables: { relationship } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.RELATIONSHIP}`);
      })
      .catch((e: any) => {
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.relationshipList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteRelationship, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.RELATIONSHIP}
      submitCallback={(model: Object) => {
        doOperation(model, createRelationship);
      }}
      model={relationshipModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.RELATIONSHIP}
      submitCallback={(model: Object) => {
        doOperation(model, updateRelationship, editRecord.id);
      }}
      model={relationshipModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.RELATIONSHIP}/add`} title={PageTitleConstants.RELATIONSHIP} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.RELATIONSHIP}/edit`}
          title={PageTitleConstants.RELATIONSHIP}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.RELATIONSHIP}`} title={PageTitleConstants.RELATIONSHIP} component={table} />
      </Switch>
    </>
  );
};

export default List;
