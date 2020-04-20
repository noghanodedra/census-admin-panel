import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

import { Spinner, LoadingProvider } from 'components';

import App from './src/App';
import 'i18n';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <Suspense fallback={null}>
    <ApolloProvider client={client}>
      <LoadingProvider>
        <App />
        <Spinner />
      </LoadingProvider>
    </ApolloProvider>
  </Suspense>,
  document.getElementById('root'),
);
