import React, { FunctionComponent, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Namespaces } from 'constants/i18n';

interface IPageProps extends RouteProps {
  title: string;
}

const Page: FunctionComponent<IPageProps> = (props) => {
  const { t } = useTranslation([Namespaces.COMMON]);
  useEffect(() => {
    document.title = `${t(`${Namespaces.COMMON}:label.app_title`)} | ${t(`${Namespaces.COMMON}:${props.title}`)}`;
  });

  const { title, ...rest } = props;
  return <Route {...rest} />;
};

export default Page;
