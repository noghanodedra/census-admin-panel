import React, { FunctionComponent } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import makeApolloClient from 'utils/apollo';
import { LoadingProvider } from './LoadingProvider';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { UserDetailsProvider } from './UserDetailsProvider';

const AppProviders: FunctionComponent = ({ children }) => {
  const client = makeApolloClient();

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <LoadingProvider>
            <UserDetailsProvider>
              {children}
            </UserDetailsProvider>
          </LoadingProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
};
export default AppProviders;
