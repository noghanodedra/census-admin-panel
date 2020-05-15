import React from 'react';

import {
  makeStyles, Theme, createStyles, Card, CardHeader, CardContent, CardActions, Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useForm from 'hooks/useForm';
import { NameSpaces as NS } from 'constants/i18n';
import { TextInput, SelectInput } from 'components';
import { deepCopy } from 'utils/helpers';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    margin: `${theme.spacing(0)} auto`,
  },
  header: {
    textAlign: 'left',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
  card: {
    marginTop: theme.spacing(10),
  },
}));


interface IFormPanelProps {
  title: string;
  model: Array<any>;
  isEdit: boolean;
  submitCallback: Function;
  data?: object;
}

const FormPanel = ({
  title, submitCallback, model, isEdit, data,
}: IFormPanelProps) => {
  const classes = useStyles();
  const { t } = useTranslation([NS.COMMON]);
  const history = useHistory();

  const modelClone = deepCopy(model);
  if (isEdit && data) {
    // input.value = data[input.id];
    modelClone.map((input: any) => {
      // eslint-disable-next-line no-param-reassign
      input.value = data[input.id];
    });
  }
  const { inputs, handleChange, handleSubmit } = useForm(modelClone, submitCallback);
  const inputsClone = deepCopy(inputs);

  const getComponent = (inputType: string) => {
    switch (inputType) {
      case 'text':
        return TextInput;
      case 'number':
        return TextInput;
      case 'select':
        return SelectInput;
      default:
        return null;
    }
  };

  const renderInput = (input:any) => {
    const Component = getComponent(input.type);
    return (
      <Component key={input.id} onChange={handleChange} {...input} />
    );
  };

  const getTitle = () => `${t(`${NS.COMMON}:${isEdit ? 'label.edit' : 'label.add'}`)} - ${t(`${NS.COMMON}:${title}`)}`;

  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title={getTitle()} />
          <CardContent>
            <div>{inputsClone.map((input: any) => renderInput(input))}</div>
          </CardContent>
          <CardActions style={{ justifyContent: 'space-between', margin: 8 }}>
            <Button
              variant="outlined"
              size="medium"
              color="secondary"
              style={{ maxWidth: 140, marginBottom: 12 }}
              onClick={() => history.goBack()}
            >
              {t(`${NS.COMMON}:button.cancel`)}
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              style={{ maxWidth: 140, marginBottom: 12 }}
              onClick={handleSubmit}
            >
              {t(`${NS.COMMON}:${isEdit ? 'button.save' : 'button.add'}`)}
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};


export default FormPanel;
