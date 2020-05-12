import React, {
  FunctionComponent, memo, useContext, useEffect,
} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { CustomTable, Page } from 'components';
import FormPanel from 'components/FormPanel';
import { LoadingContext } from 'contexts';
import { Login } from 'features/login';
import { Redirect, Route, Switch } from 'react-router-dom';
import { columnModel, entityModel as censusModel } from './models';


/*

const censusModel = [
  {
    id: 'name',
    label: 'Name',
    placeholder: 'Name',
    type: 'text',
    defaultValue: '',
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Name is required',
      },
      {
        id: 'name-length',
        isValidFun: (expression: any) => checkAtLeastLength(expression, 3),
        alert: 'Name is too short',
      },
    ],
  },
  {
    id: 'age',
    label: 'Age',
    placeholder: 'Age',
    type: 'select',
    defaultValue: '',
    lookUp: { key: 'name', value: 'id', options: [{ id: 1, name: 'one' }] },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Please select age.',
      },
    ],
  },
  {
    id: 'myage',
    label: 'myAge',
    placeholder: 'myAge',
    type: 'number',
    InputProps: {
      inputProps: {
        max: 10,
        min: 1,
      },
    },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Please enter age.',
      },
    ],
    onInput: (e:any) => onlyNumbers(e),
  },
];
*/

const GET_DATA = gql`
  {
    censusList {
      id
      name
      description
    }
  }`;

const List: FunctionComponent = () => {
  const { showLoading, hideLoading } = useContext(LoadingContext);

  const { loading, data } = useQuery(GET_DATA);
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
  console.log(data);

  const table = () => (<CustomTable rows={data.censusList} columns={columnModel} />);

  const addRecordForm = () => (<FormPanel
    title="pages.subPages.census"
    submitCallback={() => {
      console.log('submit', censusModel);
    }}
    model={censusModel}
    isEdit={false}
  />);

  const editRecordForm = () => (
    <FormPanel
      title="pages.subPages.census"
      submitCallback={() => {
        console.log('submit', censusModel);
      }}
      model={censusModel}
      isEdit={false}
    />
  );

  return (
    <>
      <Switch>
        <Page path="/app/entities/census/list" title="pages.login" component={table} />
        <Redirect from="/app/entities/census" to="/app/entities/census/list" />
        <Route />
      </Switch>
    </>
  );
};
export default memo(List);
