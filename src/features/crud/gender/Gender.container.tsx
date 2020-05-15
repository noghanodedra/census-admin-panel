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
import { columnModel, entityModel as genderModel } from './models';

const GET_DATA = gql`
  {
    genderList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createGender($gender: CreateGenderInput!) {
        createGender(data: $gender) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateGender($id: String!, $gender: UpdateGenderInput!) {
        updateGender(id: $id, data: $gender) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteGender($id: String!) {
        deleteGender(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createGender] = useMutation(ADD_RECORD);
  const [updateGender] = useMutation(UPDATE_RECORD);
  const [deleteGender] = useMutation(DELETE_RECORD);

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
      const gender = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, gender } }) : mutationFn({ variables: { gender } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.GENDER}`);
      })
      .catch((e: any) => {
        console.log(e);
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.genderList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteGender, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.GENDER}
      submitCallback={(model: Object) => {
        doOperation(model, createGender);
      }}
      model={genderModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.GENDER}
      submitCallback={(model: Object) => {
        doOperation(model, updateGender, editRecord.id);
      }}
      model={genderModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.GENDER}/add`} title={PageTitleConstants.GENDER} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.GENDER}/edit`}
          title={PageTitleConstants.GENDER}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.GENDER}`} title={PageTitleConstants.GENDER} component={table} />
      </Switch>
    </>
  );
};

export default List;
