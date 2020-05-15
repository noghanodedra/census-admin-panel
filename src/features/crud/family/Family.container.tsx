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
import { columnModel, entityModel as familyModel } from './models';

const GET_DATA = gql`
    {
        familyList {
            id
            headName
        }
    }
`;

const ADD_RECORD = gql`
    mutation createFamily($family: CreateFamilyInput!) {
        createFamily(data: $family) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateFamily($id: String!, $family: UpdateFamilyInput!) {
        updateFamily(id: $id, data: $family) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteFamily($id: String!) {
        deleteFamily(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createFamily] = useMutation(ADD_RECORD);
  const [updateFamily] = useMutation(UPDATE_RECORD);
  const [deleteFamily] = useMutation(DELETE_RECORD);

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
      const family = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, family } }) : mutationFn({ variables: { family } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.FAMILY}`);
      })
      .catch((e: any) => {
        console.log(e);
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.familyList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteFamily, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.FAMILY}
      submitCallback={(model: Object) => {
        doOperation(model, createFamily);
      }}
      model={familyModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.FAMILY}
      submitCallback={(model: Object) => {
        doOperation(model, updateFamily, editRecord.id);
      }}
      model={familyModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.FAMILY}/add`} title={PageTitleConstants.FAMILY} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.FAMILY}/edit`}
          title={PageTitleConstants.FAMILY}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.FAMILY}`} title={PageTitleConstants.FAMILY} component={table} />
      </Switch>
    </>
  );
};

export default List;
