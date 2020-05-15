import React from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import { RoutesConstants, PageTitleConstants } from 'constants/common';
import { Dashboard as DashboardPage } from 'features/dashboard';
import { Login as LoginPage } from 'features/login';
import { List as CensusPage } from 'features/crud/census';
import { List as CastePage } from 'features/crud/caste';
import { List as EducationPage } from 'features/crud/education';
import { List as IncomeClassPage } from 'features/crud/income-class';
import { List as WorkClassPage } from 'features/crud/work-class';
import { List as RelationshipPage } from 'features/crud/relationship';
import { List as OccupationPage } from 'features/crud/occupation';
import { List as MaritalStatusPage } from 'features/crud/marital-status';
import { List as GenderPage } from 'features/crud/gender';
import { List as DistrictPage } from 'features/crud/district';
import { List as StatePage } from 'features/crud/state';

import { ResponsiveDrawer, Page } from 'components';

const AppRouter = () => (
  <>
    <Router>
      <Layouts />
    </Router>
  </>
);

const Layouts = () => (
  <Switch>
    <Route path={RoutesConstants.AUTH} component={AuthRoutes} />
    <Route path={RoutesConstants.APP} component={PrivateRoutes} />
    <Redirect from="/" to={RoutesConstants.LOGIN} exact />
    <Route />
  </Switch>
);

const PrivateRoutes: React.FC = () => (
  <>
    <ResponsiveDrawer>
      <Switch>
        <Page
          path={RoutesConstants.HOME}
          privateRoute={true}
          title={PageTitleConstants.HOME}
          exact
          component={DashboardPage}
        />
        <Page
          path={RoutesConstants.ADDRESS}
          title={PageTitleConstants.ADDRESS}
          privateRoute={true}
          component={CensusPage}
        />
        <Page
          path={RoutesConstants.CASTE}
          title={PageTitleConstants.CASTE}
          privateRoute={true}
          component={CastePage}
        />
        <Page
          path={RoutesConstants.CENSUS}
          title={PageTitleConstants.CENSUS}
          privateRoute={true}
          component={CensusPage}
        />
        <Page
          path={RoutesConstants.DISTRICT}
          title={PageTitleConstants.DISTRICT}
          privateRoute={true}
          component={DistrictPage}
        />
        <Page
          path={RoutesConstants.EDUCATION}
          title={PageTitleConstants.EDUCATION}
          privateRoute={true}
          component={EducationPage}
        />
        <Page
          path={RoutesConstants.FAMILY}
          title={PageTitleConstants.FAMILY}
          privateRoute={true}
          component={CensusPage}
        />
        <Page
          path={RoutesConstants.GENDER}
          title={PageTitleConstants.GENDER}
          privateRoute={true}
          component={GenderPage}
        />
        <Page
          path={RoutesConstants.INDIVIDUAL}
          title={PageTitleConstants.INDIVIDUAL}
          privateRoute={true}
          component={CensusPage}
        />
        <Page
          path={RoutesConstants.INCOME_CLASS}
          title={PageTitleConstants.INCOME_CLASS}
          privateRoute={true}
          component={IncomeClassPage}
        />
        <Page
          path={RoutesConstants.MARITAL_STATUS}
          title={PageTitleConstants.MARITAL_STATUS}
          privateRoute={true}
          component={MaritalStatusPage}
        />
        <Page
          path={RoutesConstants.OCCUPATION}
          title={PageTitleConstants.OCCUPATION}
          privateRoute={true}
          component={OccupationPage}
        />
        <Page
          path={RoutesConstants.RELATIONSHIP}
          title={PageTitleConstants.RELATIONSHIP}
          privateRoute={true}
          component={RelationshipPage}
        />
        <Page
          path={RoutesConstants.STATE}
          title={PageTitleConstants.STATE}
          privateRoute={true}
          component={StatePage}
        />
        <Page
          path={RoutesConstants.WORK_CLASS}
          title={PageTitleConstants.WORK_CLASS}
          privateRoute={true}
          component={WorkClassPage}
        />
        <Redirect from={RoutesConstants.APP} to={RoutesConstants.HOME} exact />
        <Route />
      </Switch>
    </ResponsiveDrawer>
  </>
);

const AuthRoutes: React.FC = () => (
  <>
    <Switch>
      <Page path={RoutesConstants.LOGIN} title={PageTitleConstants.LOGIN} exact component={LoginPage} />
      <Redirect from="/" to={RoutesConstants.LOGIN} exact />
      <Route />
    </Switch>
  </>
);

export default AppRouter;
