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
import { columnModel, entityModel as addressModel } from './models';

const GET_DATA = gql`
    {
        addressList {
            id
            line1
            line2
            line3
            postcode
            townCity
            district
            state
        }
    }
`;

const ADD_RECORD = gql`
    mutation createAddress($address: CreateAddressInput!) {
        createAddress(data: $address) {
            id
        }
    }
`;

const UPDATE_RECORD = gql`
    mutation updateAddress($id: String!, $address: UpdateAddressInput!) {
        updateAddress(id: $id, data: $address) {
            id
        }
    }
`;

const DELETE_RECORD = gql`
    mutation deleteAddress($id: String!) {
        deleteAddress(id: $id)
    }
`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);
  const history = useHistory();
  const [refetch, setRefetch] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const { loading, data } = useQuery(GET_DATA, { variables: { antiCache: refetch }, fetchPolicy: 'network-only' });

  const [createAddress] = useMutation(ADD_RECORD);
  const [updateAddress] = useMutation(UPDATE_RECORD);
  const [deleteAddress] = useMutation(DELETE_RECORD);

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
      const address = modelToObject(model);
      requestFn = id ? mutationFn({ variables: { id, address } }) : mutationFn({ variables: { address } });
    } else {
      requestFn = mutationFn({ variables: { id } });
    }
    showLoading();
    requestFn
      .then(() => {
        hideLoading();
        setEditRecord(null);
        setRefetch(new Date().getTime());
        history.replace(`${RoutesConstants.ADDRESS}`);
      })
      .catch((e: any) => {
        console.log(e);
        hideLoading();
      });
  };

  const table = () => (
    <CustomTable
      rows={data.addressList}
      columns={...columnModel}
      delCallback={(id: string) => {
        doOperation(null, deleteAddress, id, true);
      }}
      setEditRecord={setEditRecord}
    />
  );

  const addRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.ADDRESS}
      submitCallback={(model: Object) => {
        doOperation(model, createAddress);
      }}
      model={addressModel}
      isEdit={false}
    />
  );

  const editRecordForm = () => (
    <FormPanel
      title={PageTitleConstants.ADDRESS}
      submitCallback={(model: Object) => {
        doOperation(model, updateAddress, editRecord.id);
      }}
      model={addressModel}
      data={editRecord}
      isEdit={true}
    />
  );

  return (
    <>
      <Switch>
        <Page path={`${RoutesConstants.ADDRESS}/add`} title={PageTitleConstants.ADDRESS} component={addRecordForm} />
        <Page
          path={`${RoutesConstants.ADDRESS}/edit`}
          title={PageTitleConstants.ADDRESS}
          component={editRecordForm}
        />
        <Page path={`${RoutesConstants.ADDRESS}`} title={PageTitleConstants.ADDRESS} component={table} />
      </Switch>
    </>
  );
};

export default List;
