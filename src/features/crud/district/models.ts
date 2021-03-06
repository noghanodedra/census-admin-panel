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
    id: 'state',
    label: 'State',
    nestedProp: 'name',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.state`,
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
    id: 'stateId',
    label: `${NS.COMMON}:label.state`,
    placeholder: 'Select state',
    type: 'select',
    defaultValue: '',
    lookUp: {
      key: 'name',
      value: 'id',
      entity: 'state',
      optionsKey: 'stateList',
      options: [{}],
    },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: `${NS.COMMON}:messages.required.name`,
      },
    ],
    parseFunc: (expression: any) => parseInt(expression, 10),
  },
];

export { columnModel, entityModel };
