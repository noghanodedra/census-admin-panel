import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    // eslint-disable-next-line react-hooks/rules-of-hooks
    render={(routeProps) => (useAuth().data ? <Component {...routeProps} /> : <Redirect to="/sign-in" />)}
  />
);
/*  we are spreading routeProps to be able to access this routeProps in the component. */


export default PrivateRoute;
