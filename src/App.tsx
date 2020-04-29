import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import AppRouter from 'components/RouterComponent';
import './App.scss';


// const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
// const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));
// https://reacttraining.com/blog/react-router-v5-1/

const App: React.StatelessComponent<{}> = () => (
  <div className="App">
    <CssBaseline />
    <div>
      <Container>
        <AppRouter />
      </Container>
    </div>
  </div>
);

export default App;
