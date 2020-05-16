import { NameSpaces as NS } from 'constants/i18n';
import { checkIsfilled, checkAtLeastLength } from 'utils/inputValidators';

const columnModel = [
  {
    id: 'line1',
    label: 'line1',
    minWidth: 170,
    align: 'left',
    i18nKey: `${NS.CRUD}:label.line1`,
    type: 'text',
  },
  {
    id: 'line2',
    label: 'Line2',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.CRUD}:label.line2`,
    type: 'text',
  },
  {
    id: 'line3',
    label: 'Line3',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.CRUD}:label.line3`,
    type: 'text',
  },
  {
    id: 'postcode',
    label: 'Postcode',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.CRUD}:label.postcode`,
    type: 'text',
  },
  {
    id: 'townCity',
    label: 'Town City',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.CRUD}:label.townCity`,
    type: 'text',
  },
  {
    id: 'district',
    label: 'District',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.CRUD}:label.district`,
    type: 'text',
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.CRUD}:label.state`,
    type: 'text',
  },
];


const entityModel = [
  {
    id: 'line1',
    label: `${NS.CRUD}:label.line1`,
    placeholder: `${NS.CRUD}:placeholder.line1`,
    type: 'text',
    defaultValue: '',
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: `${NS.CRUD}:messages.required.line1`,
      },
      {
        id: 'name-length',
        isValidFun: (expression: any) => checkAtLeastLength(expression, 3),
        alert: `${NS.CRUD}:messages.length.line1`,
      },
    ],
  },
  {
    id: 'line2',
    label: `${NS.CRUD}:label.line2`,
    placeholder: `${NS.CRUD}:placeholder.line2`,
    type: 'text',
    defaultValue: '',
    validators: [],
  },
  {
    id: 'line3',
    label: `${NS.CRUD}:label.line3`,
    placeholder: `${NS.CRUD}:placeholder.line3`,
    type: 'text',
    defaultValue: '',
    validators: [],
  },
  {
    id: 'postcode',
    label: `${NS.CRUD}:label.postcode`,
    placeholder: `${NS.CRUD}:placeholder.postcode`,
    type: 'text',
    defaultValue: '',
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: `${NS.CRUD}:messages.required.postcode`,
      },
      {
        id: 'name-length',
        isValidFun: (expression: any) => checkAtLeastLength(expression, 3),
        alert: `${NS.CRUD}:messages.length.postcode`,
      },
    ],
  },
  {
    id: 'townCity',
    label: `${NS.CRUD}:label.townCity`,
    placeholder: `${NS.CRUD}:placeholder.townCity`,
    type: 'text',
    defaultValue: '',
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: `${NS.CRUD}:messages.required.townCity`,
      },
      {
        id: 'name-length',
        isValidFun: (expression: any) => checkAtLeastLength(expression, 3),
        alert: `${NS.CRUD}:messages.length.townCity`,
      },
    ],
  },

  {
    id: 'state',
    label: `${NS.CRUD}:label.state`,
    placeholder: `${NS.CRUD}:placeholder.state`,
    type: 'select',
    defaultValue: '',
    lookUp: {
      key: 'name',
      value: 'name',
      entity: 'state',
      optionsKey: 'stateList',
      options: [{}],
    },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: `${NS.CRUD}:messages.required.state`,
      },
    ],
  },
  {
    id: 'district',
    label: `${NS.CRUD}:label.district`,
    placeholder: `${NS.CRUD}:placeholder.district`,
    type: 'select',
    defaultValue: '',
    lookUp: {
      key: 'name',
      value: 'name',
      entity: 'district',
      optionsKey: 'stateList',
      options: [{}],
    },
    validators: [
      {
        id: 'required',
        isValidFun: (expression: any) => checkIsfilled(expression),
        alert: `${NS.CRUD}:messages.required.district`,
      },
    ],
  },
];

export { columnModel, entityModel };
