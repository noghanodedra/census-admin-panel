import { NameSpaces as NS } from 'constants/i18n';
import { checkIsfilled, checkAtLeastLength } from 'utils/inputValidators';

const columnModel = [
  {
    id: 'line1',
    label: 'line1',
    minWidth: 170,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.name`,
    type: 'text',
  },
  {
    id: 'line2',
    label: 'Line2',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.description`,
    type: 'text',
  },
  {
    id: 'line3',
    label: 'Line3',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.description`,
    type: 'text',
  },
  {
    id: 'postcode',
    label: 'Postcode',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.description`,
    type: 'text',
  },
  {
    id: 'townCity',
    label: 'Town City',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.description`,
    type: 'text',
  },
  {
    id: 'district',
    label: 'District',
    minWidth: 180,
    align: 'left',
    i18nKey: `${NS.COMMON}:label.description`,
    type: 'text',
  },
  {
    id: 'state',
    label: 'State',
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
