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
import { columnModel, entityModel as incomeClassModel } from './models';

const GET_DATA = gql`
  {
    incomeClassList {
      id
      name
      description
    }
  }`;

const ADD_RECORD = gql`
    mutation createIncomeClass($incomeClass: CreateIncomeClassInput!) {
        createIncomeClass(data: $incomeClass) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateIncomeClass($id: String!, $incomeClass: UpdateIncomeClassInput!) {
        updateIncomeClass(id: $id, data: $incomeClass) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteIncomeClass($id: String!) {
        deleteIncomeClass(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createIncomeClass] = useMutation(ADD_RECORD);
  const [updateIncomeClass] = useMutation(UPDATE_RECORD);
  const [deleteIncomeClass] = useMutation(DELETE_RECORD);

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
      const incomeClass = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, incomeClass } }) : mutationFn({ variables: { incomeClass } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.INCOME_CLASS}`);
      })
      .catch((e: any) => {
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.incomeClassList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteIncomeClass, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.INCOME_CLASS}
      submitCallback={(model: Object) => {
        doOperation(model, createIncomeClass);
      }}
      model={incomeClassModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.INCOME_CLASS}
      submitCallback={(model: Object) => {
        doOperation(model, updateIncomeClass, editRecord.id);
      }}
      model={incomeClassModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.INCOME_CLASS}/add`} title={PageTitleConstants.INCOME_CLASS} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.INCOME_CLASS}/edit`}
          title={PageTitleConstants.INCOME_CLASS}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.INCOME_CLASS}`} title={PageTitleConstants.INCOME_CLASS} component={table} />
      </Switch>
    </>
  );
};

export default List;
