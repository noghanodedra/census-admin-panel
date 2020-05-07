import React from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import CommonConstants from 'constants/common';
import { Dashboard } from 'features/dashboard';
import { Login } from 'features/login';
import { List as Census } from 'features/crud/census';

import { ResponsiveDrawer, Page } from 'components';
// https://codesandbox.io/s/hungry-dubinsky-q1l62?fontsize=14&file=/src/index.js
// https://stackoverflow.com/questions/56711663/react-router-v5-0-nested-routes


const AppRouter = () => (
  <>
    <Router>
      <Layouts />
    </Router>
  </>
);

function Layouts() {
  return (
    <Switch>
      <Route path="/auth" component={AuthRoutes} />
      <Route path="/app" component={PrivateRoutes} />
      <Redirect from="/" to="/auth/login" exact />
      <Route />
    </Switch>
  );
}

const PrivateRoutes: React.FC = () => (
  <>
    <ResponsiveDrawer>
      <Switch>
        <Page path="/app/home" privateRoute={true} title="pages.dashboard" exact component={Dashboard} />
        <Page
          path="/app/entities/census"
          title="pages.subPages.census"
          privateRoute={true}
          exact
          component={Census}
        />
        <Redirect from="/app" to="/app/home" exact />
        <Route />
      </Switch>
    </ResponsiveDrawer>
  </>
);

const AuthRoutes: React.FC = () => (
  <>
    <Switch>
      <Page path="/auth/login" title="pages.login" exact component={Login} />
      <Redirect from="/" to="/auth/login" exact />
      <Route />
    </Switch>
  </>
);

export default AppRouter;
