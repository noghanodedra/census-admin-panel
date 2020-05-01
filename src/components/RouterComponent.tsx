import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Dashboard } from 'features/dashboard';
import { Login } from 'features/login';
import { ResponsiveDrawer, Page } from 'components';

const About: React.FC = () => (<div><h2>this is abount</h2></div>);

const AppRouter = () => (
  <>
    <Router>
      <Switch>
        <Page path="/" title="pages.login" exact component={Login} />

        <Route>
          <ResponsiveDrawer>
            <Switch>
              <Page
                path="/home"
                privateRoute={true}
                title="pages.dashboard"
                exact
                component={Dashboard}
              />
              <Page path="/about" title="About" privateRoute={true} exact component={About} />
            </Switch>
          </ResponsiveDrawer>
        </Route>
      </Switch>
    </Router>
  </>
);
export default AppRouter;
