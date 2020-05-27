import React, {
  useState, useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Link,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import { LOGIN_USER } from 'constants/graphql-queries-mutations';
import { Logo, LocaleDropdown } from 'components';
import { LoadingContext } from 'contexts';

import { NameSpaces as NS } from 'constants/i18n';
import { CommonConstants, RoutesConstants } from 'constants/common';


const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 400,
    margin: `${theme.spacing(0)} auto`,
  },
  loginBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
  card: {
    marginTop: theme.spacing(8),
    marginRight: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation([NS.LOGIN]);


  const { showLoading, hideLoading } = useContext(LoadingContext);

  const [login] = useMutation(LOGIN_USER);

  const [email, setEmail] = useState({ value: '', error: false, helperText: '' });
  const [password, setPassword] = useState({
    value: '', error: false, helperText: '', showPassword: false,
  });

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleLogin = () => {
    if (!email.value) {
      setEmail({ ...email, error: true, helperText: 'validation.email.required' });
      return;
    }
    if (!password.value) {
      setPassword({ ...password, error: true, helperText: 'validation.password.required' });
      return;
    }

    showLoading();
    login({
      variables: {
        email: email.value,
        password: password.value,
      },
      fetchPolicy: 'no-cache',
    })
      .then(({ data }) => {
        hideLoading();
        sessionStorage.setItem(CommonConstants.USER_DETAILS, JSON.stringify(data.login.profile));
        history.replace(`${RoutesConstants.HOME}`);
      })
      .catch((e) => {
        hideLoading();
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      handleLogin();
    }
  };

  return (
    <>
      <LocaleDropdown />
      <form className={classes.container} noValidate autoComplete="off">
        <Logo />
        <Card className={classes.card}>
          <CardHeader className={classes.header} title={t(`${NS.LOGIN}:label.login`)} />
          <CardContent>
            <div>
              <TextField
                error={email.error}
                variant="outlined"
                value={email.value}
                fullWidth
                id="username"
                type="email"
                label={t(`${NS.LOGIN}:label.username`)}
                placeholder={t(`${NS.LOGIN}:label.username`)}
                margin="normal"
                helperText={t(`${NS.LOGIN}:${email.helperText}`)}
                onChange={(e) => setEmail({ value: e.target.value, error: false, helperText: '' })}
                onKeyPress={(e) => handleKeyPress(e)}
              />
              <TextField
                error={password.error}
                fullWidth
                variant="outlined"
                id="password"
                value={password.value}
                type={password.showPassword ? 'text' : 'password'}
                label={t(`${NS.LOGIN}:label.password`)}
                placeholder={t(`${NS.LOGIN}:label.password`)}
                margin="normal"
                helperText={t(`${NS.LOGIN}:${password.helperText}`)}
                onChange={(e) => setPassword({
                  value: e.target.value,
                  error: false,
                  helperText: '',
                  showPassword: false,
                })}
                onKeyPress={(e) => handleKeyPress(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {password.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </CardContent>
          <CardActions style={{ justifyContent: 'space-between', margin: 8 }}>
            <Link
              component="button"
              variant="body2"
            >
              {t(`${NS.LOGIN}:label.forgotPassword`)}
            </Link>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className={classes.loginBtn}
              style={{ maxWidth: 140, marginBottom: 12 }}
              onClick={() => handleLogin()}
            >
              {t(`${NS.LOGIN}:button.login`)}
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default Login;
