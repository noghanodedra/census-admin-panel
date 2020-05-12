import React, {
  FunctionComponent, memo, useContext, useEffect,
} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import { NameSpaces as NS } from 'constants/i18n';
import { CustomTable } from 'components';
import FormPanel from 'components/FormPanel';

import { LoadingContext } from 'contexts';
import { checkAtLeastLength, checkIsfilled } from 'utils/inputValidators';

const columns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.name`,
    type: 'text',
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.description`,
    type: 'text',
  },
];

/*
const censusModel = [
  {
    id: 'name',
    label: 'Name',
    placeholder: 'Name',
    type: 'text',
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
        max: 10, min: 1,
      },
    },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Please enter age.',
      },
    ],
  },
];
*/

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
    defaultValue: 0,
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
  },
];

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
  const { t } = useTranslation([NS.LOGIN]);

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
  return (
  // <CustomTable rows={data.censusList} columns={columns} />
    <FormPanel
      title="pages.subPages.census"
      submitCallback={() => { console.log('submit', censusModel); }}
      model={censusModel}
      isEdit={false}
    />
  );
};
export default memo(List);
