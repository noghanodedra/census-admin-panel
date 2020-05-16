import { NameSpaces as NS } from 'constants/i18n';
import { checkIsfilled, checkAtLeastLength, onlyNumbers } from 'utils/inputValidators';

const columnModel = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.name`,
    type: 'text',
  },
  {
    id: 'age',
    label: 'Age',
    minWidth: 180,
    align: 'right',
    i18nKey: `${NS.CRUD}:label.age`,
    type: 'number',
  },
  {
    id: 'educationYears',
    label: 'Education Years',
    minWidth: 180,
    align: 'right',
    i18nKey: `${NS.CRUD}:label.educationYears`,
    type: 'number',
  },
  {
    id: 'hoursPerWeek',
    label: 'Hours Per Week',
    minWidth: 180,
    align: 'right',
    i18nKey: `${NS.CRUD}:label.hoursPerWeek`,
    type: 'number',
  },
  /* {
    id: 'education',
    label: 'Education',
    minWidth: 170,
    nestedProp: 'name',
    align: 'left',
    i18nKey: `${NS.CRUD}:label.education`,
    type: 'text',
  },
  {
    id: 'workClass',
    label: 'Work Class',
    minWidth: 170,
    nestedProp: 'name',
    align: 'left',
    i18nKey: `${NS.CRUD}:label.workClass`,
    type: 'text',
  },
  {
    id: 'occupation',
    label: 'Occupation',
    minWidth: 170,
    nestedProp: 'name',
    align: 'left',
    i18nKey: `${NS.CRUD}:label.occupation`,
    type: 'text',
  },
  {
    id: 'relationship',
    label: 'Relationship',
    minWidth: 170,
    nestedProp: 'name',
    align: 'left',
    i18nKey: `${NS.CRUD}:label.relationship`,
    type: 'text',
  },
  {
    id: 'caste',
    label: 'Caste',
    minWidth: 170,
    nestedProp: 'name',
    align: 'left',
    i18nKey: `${NS.CRUD}:label.caste`,
    type: 'text',
  },
  {
    id: 'incomeClass',
    label: 'Income Class',
    minWidth: 170,
    nestedProp: 'name',
    align: 'left',
    i18nKey: `${NS.CRUD}:label.incomeClass`,
    type: 'text',
  },
  {
    id: 'gender',
    label: 'Gender',
    minWidth: 170,
    nestedProp: 'name',
    align: 'left',
    i18nKey: `${NS.CRUD}:label.gender`,
    type: 'text',
  },
  {
    id: 'maritalStatus',
    label: 'Marital Status',
    minWidth: 170,
    nestedProp: 'name',
    align: 'left',
    i18nKey: `${NS.CRUD}:label.maritalStatus`,
    type: 'text',
  }, */
];

const entityModel = [
  {
    id: 'name',
    label: `${NS.COMMON}:label.name`,
    placeholder: `${NS.COMMON}:placeholder.name`,
    type: 'text',
    defaultValue: '',
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: `${NS.COMMON}:messages.required.name`,
      },
      {
        id: 'name-length',
        isValidFun: (expression: any) => checkAtLeastLength(expression, 3),
        alert: `${NS.COMMON}:messages.length.name`,
      },
    ],
  },
  {
    id: 'age',
    label: 'Age',
    placeholder: 'Age',
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
    onInput: (e: any) => onlyNumbers(e),
  },
  {
    id: 'educationYears',
    label: 'Education Years',
    placeholder: 'Education Years',
    type: 'number',
    InputProps: {
      inputProps: {
        max: 30,
        min: 0,
      },
    },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Please enter age.',
      },
    ],
    onInput: (e: any) => onlyNumbers(e),
  },
  {
    id: 'hoursPerWeek',
    label: 'Hours Per Week',
    placeholder: 'hoursPerWeek',
    type: 'number',
    InputProps: {
      inputProps: {
        max: 100,
        min: 0,
      },
    },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: 'Please enter hoursPerWeek.',
      },
    ],
    onInput: (e: any) => onlyNumbers(e),
  },

];

export { columnModel, entityModel };
