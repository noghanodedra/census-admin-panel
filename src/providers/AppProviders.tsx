import React, { FunctionComponent } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import makeApolloClient from 'utils/apollo';
import { LoadingProvider } from './LoadingProvider';
import { ThemeProvider } from './ThemeProvider';

const AppProviders: FunctionComponent = ({ children }) => {
  const client = makeApolloClient();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
export default AppProviders;
