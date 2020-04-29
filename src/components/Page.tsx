import React, { FunctionComponent, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface IPageProps extends RouteProps {
  title: string;
}

const Page: FunctionComponent<IPageProps> = (props) => {
  useEffect(() => {
    document.title = `Census Admin Panel | ${props.title}`;
  });

  const { title, ...rest } = props;
  return <Route {...rest} />;
};

export default Page;
