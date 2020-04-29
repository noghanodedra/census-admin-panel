import React, {
  useState, useEffect, useContext,
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
import { useAuth } from 'providers/AuthProvider';


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
    marginTop: theme.spacing(10),
  },
}));

const Login = () => {
  const classes = useStyles();
  const authContext = useAuth();
  const history = useHistory();
  const { t } = useTranslation(['translation', 'login']);


  const { showLoading, hideLoading } = useContext(LoadingContext);

  const [login] = useMutation(LOGIN_USER);

  const [email, setEmail] = useState({ value: 'test@test.com', error: false, helperText: '' });
  const [password, setPassword] = useState({
    value: 'test', error: false, helperText: '', showPassword: false,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  useEffect(() => {
    if (email.value.trim() && password.value.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleLogin = () => {
    if (email.value === 'abc@email.com' && password.value === 'password') {
      // setError(false);
    } else {
      // setError(true);
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
        // console.log(data);
        hideLoading();
        authContext.onLogin(data.login.profile);
        history.push('/home');
      })
      .catch((e) => {
        hideLoading();
      });
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      isButtonDisabled || handleLogin();
    }
  };

  return (
    <>
      <LocaleDropdown />
      <form className={classes.container} noValidate autoComplete="off">
        <Logo />
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Login App" />
          <CardContent>
            <div>
              <TextField
                error={email.error}
                variant="outlined"
                value={email.value}
                fullWidth
                id="username"
                type="email"
                label={t('login:username')}
                placeholder={t('login:username')}
                margin="normal"
                helperText={email.helperText}
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
                label="Password"
                placeholder="Password"
                margin="normal"
                helperText={password.helperText}
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
          <CardActions style={{ justifyContent: 'space-between' }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Forgot password?
            </Link>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className={classes.loginBtn}
              onClick={() => handleLogin()}
              disabled={isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
};

export default Login;
