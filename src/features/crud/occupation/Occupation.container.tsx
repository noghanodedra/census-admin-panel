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
import { columnModel, entityModel as occupationModel } from './models';

const GET_DATA = gql`
  {
    occupationList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createOccupation($occupation: CreateOccupationInput!) {
        createOccupation(data: $occupation) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateOccupation($id: String!, $occupation: UpdateOccupationInput!) {
        updateOccupation(id: $id, data: $occupation) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteOccupation($id: String!) {
        deleteOccupation(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createOccupation] = useMutation(ADD_RECORD);
  const [updateOccupation] = useMutation(UPDATE_RECORD);
  const [deleteOccupation] = useMutation(DELETE_RECORD);

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
      const occupation = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, occupation } }) : mutationFn({ variables: { occupation } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.OCCUPATION}`);
      })
      .catch((e: any) => {
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.occupationList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteOccupation, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.OCCUPATION}
      submitCallback={(model: Object) => {
        doOperation(model, createOccupation);
      }}
      model={occupationModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.OCCUPATION}
      submitCallback={(model: Object) => {
        doOperation(model, updateOccupation, editRecord.id);
      }}
      model={occupationModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.OCCUPATION}/add`} title={PageTitleConstants.OCCUPATION} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.OCCUPATION}/edit`}
          title={PageTitleConstants.OCCUPATION}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.OCCUPATION}`} title={PageTitleConstants.OCCUPATION} component={table} />
      </Switch>
    </>
  );
};

export default List;
