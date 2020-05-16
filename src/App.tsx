import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import AppRouter from 'components/RouterComponent';
import './App.scss';

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
