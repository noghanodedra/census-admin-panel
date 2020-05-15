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
import { columnModel, entityModel as educationModel } from './models';

const GET_DATA = gql`
  {
    educationList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createEducation($education: CreateEducationInput!) {
        createEducation(data: $education) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateEducation($id: String!, $education: UpdateEducationInput!) {
        updateEducation(id: $id, data: $education) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteEducation($id: String!) {
        deleteEducation(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createEducation] = useMutation(ADD_RECORD);
  const [updateEducation] = useMutation(UPDATE_RECORD);
  const [deleteEducation] = useMutation(DELETE_RECORD);

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
      const education = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, education } }) : mutationFn({ variables: { education } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.EDUCATION}`);
      })
      .catch((e: any) => {
        console.log(e);
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.educationList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteEducation, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.EDUCATION}
      submitCallback={(model: Object) => {
        doOperation(model, createEducation);
      }}
      model={educationModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.EDUCATION}
      submitCallback={(model: Object) => {
        doOperation(model, updateEducation, editRecord.id);
      }}
      model={educationModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.EDUCATION}/add`} title={PageTitleConstants.EDUCATION} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.EDUCATION}/edit`}
          title={PageTitleConstants.EDUCATION}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.EDUCATION}`} title={PageTitleConstants.EDUCATION} component={table} />
      </Switch>
    </>
  );
};

export default List;
