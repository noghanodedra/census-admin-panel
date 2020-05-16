import React, {
  FunctionComponent, useContext, useEffect, useState,
} from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Switch, useHistory } from 'react-router-dom';

import { CustomTable, Page } from 'components';
import FormPanel from 'components/FormPanel';
import { LoadingContext } from 'contexts';
import { modelToObject, setLookUpOptions } from 'utils/helpers';
import { CommonConstants, RoutesConstants, PageTitleConstants } from 'constants/common';
import { usePersistedState } from 'hooks';
import { columnModel, entityModel as districtModel } from './models';

const GET_DATA = gql`
  {
    districtList {
      id
      name
      state {
        id
        name
      }
    }
  }`;

const ADD_RECORD = gql`
    mutation createDistrict($district: CreateDistrictInput!) {
        createDistrict(data: $district) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateDistrict($id: String!, $district: UpdateDistrictInput!) {
        updateDistrict(id: $id, data: $district) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteDistrict($id: String!) {
        deleteDistrict(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [dropDownData, setDropDownData] = usePersistedState(CommonConstants.DROP_DOWN_DATA);
  setLookUpOptions(districtModel, dropDownData);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createDistrict] = useMutation(ADD_RECORD);
  const [updateDistrict] = useMutation(UPDATE_RECORD);
  const [deleteDistrict] = useMutation(DELETE_RECORD);

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
      const district = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, district } }) : mutationFn({ variables: { district } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.DISTRICT}`);
      })
      .catch((e: any) => {
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.districtList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteDistrict, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.DISTRICT}
      submitCallback={(model: Object) => {
        doOperation(model, createDistrict);
      }}
      model={districtModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.DISTRICT}
      submitCallback={(model: Object) => {
        doOperation(model, updateDistrict, editRecord.id);
      }}
      model={districtModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.DISTRICT}/add`} title={PageTitleConstants.DISTRICT} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.DISTRICT}/edit`}
          title={PageTitleConstants.DISTRICT}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.DISTRICT}`} title={PageTitleConstants.DISTRICT} component={table} />
      </Switch>
    </>
  );
};

export default List;
