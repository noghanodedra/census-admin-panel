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
import { columnModel, entityModel as casteModel } from './models';

const GET_DATA = gql`
  {
    casteList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createCaste($caste: CreateCasteInput!) {
        createCaste(data: $caste) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateCaste($id: String!, $caste: UpdateCasteInput!) {
        updateCaste(id: $id, data: $caste) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteCaste($id: String!) {
        deleteCaste(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, error, data } = useQuery(GET_DATA, {
    variables: { antiCache: refetch },
    fetchPolicy: 'network-only',
  });

  const [createCaste] = useMutation(ADD_RECORD);
  const [updateCaste] = useMutation(UPDATE_RECORD);
  const [deleteCaste] = useMutation(DELETE_RECORD);

  useEffect(() => {
    if (loading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [loading]);

  if (loading || error || !data) {
    return null;
  }

  const doOperation = (model:Object, mutationFn: Function, id?:string, del:boolean = false) => {
    let requestFn = null;
    if (!del) {
      const caste = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, caste } }) : mutationFn({ variables: { caste } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.CASTE}`);
      })
      .catch((e: any) => {
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.casteList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteCaste, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.CASTE}
      submitCallback={(model: Object) => {
        doOperation(model, createCaste);
      }}
      model={casteModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.CASTE}
      submitCallback={(model: Object) => {
        doOperation(model, updateCaste, editRecord.id);
      }}
      model={casteModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.CASTE}/add`} title={PageTitleConstants.CASTE} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.CASTE}/edit`}
          title={PageTitleConstants.CASTE}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.CASTE}`} title={PageTitleConstants.CASTE} component={table} />
      </Switch>
    </>
  );
};

export default List;
