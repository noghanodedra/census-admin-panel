import React, { FunctionComponent, useEffect } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { NameSpaces as NS } from 'constants/i18n';
import { CommonConstants } from 'constants/common';

interface IPageProps extends RouteProps {
  title: string;
  privateRoute?: boolean;
}

const Page: FunctionComponent<IPageProps> = ({ component: Component, ...rest }) => {
  const { t } = useTranslation([NS.COMMON]);
  const { title, privateRoute } = rest;
  const userDetails = JSON.parse(sessionStorage.getItem(CommonConstants.USER_DETAILS) || null);

  const authenticated = !!userDetails;
  useEffect(() => {
    document.title = `${t(`${NS.COMMON}:label.appTitle`)} | ${t(`${NS.COMMON}:${title}`)}`;
  });
  if (!privateRoute) {
    return <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />;
  }
  return (
    <Route
      {...rest}
      render={(routeProps) => (authenticated ? <Component {...routeProps} /> : <Redirect to="/home" />)}
    />
  );
};

export default Page;
