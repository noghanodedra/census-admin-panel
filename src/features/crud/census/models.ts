import { NameSpaces as NS } from 'constants/i18n';
import { checkIsfilled, checkAtLeastLength } from 'utils/inputValidators';

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
    id: 'description',
    label: 'Description',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.description`,
    type: 'text',
  },
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
    id: 'description',
    label: `${NS.COMMON}:label.description`,
    placeholder: `${NS.COMMON}:placeholder.description`,
    type: 'text',
    defaultValue: '',
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: `${NS.COMMON}:messages.required.description`,
      },
    ],
  },
];

export { columnModel, entityModel };
