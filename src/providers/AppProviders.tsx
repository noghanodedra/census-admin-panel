import React, { FunctionComponent } from 'react';

import { ApolloProvider } from '@apollo/react-hooks';

import makeApolloClient from 'utils/apollo';
import { LoadingProvider } from './LoadingProvider';
import { AuthProvider } from './AuthProvider';

import { UserDetailsProvider } from './UserDetailsProvider';

const client = makeApolloClient();

const AppProviders: FunctionComponent = ({ children }) => (
  <AuthProvider>
    <ApolloProvider client={client}>
      <LoadingProvider>
        <UserDetailsProvider>{children}</UserDetailsProvider>
      </LoadingProvider>
    </ApolloProvider>
  </AuthProvider>
);

export default AppProviders;
