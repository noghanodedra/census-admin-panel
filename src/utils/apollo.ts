import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { CommonConstants } from 'constants/common';
import { EventEmitter } from 'utils/events';

const makeApolloClient = () => {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache({
      addTypename: false,
    }),
    credentials: 'include',
    request: async (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
      });
    },
    onError: ({
      graphQLErrors, networkError, operation, forward,
    }) => {
      if (networkError && !graphQLErrors) {
        console.log(`[Network error]: ${networkError}`);
        // showErrorToast('Network error.');
      }
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          // handle errors differently based on its error code
          console.log(err.extensions.code);
          switch (err.extensions.code) {
            case 'BAD_USER_INPUT':
              // showErrorToast(err.extensions.inputError.message);
              break;
            case 'FORBIDDEN':
              EventEmitter.dispatch(CommonConstants.UNAUTHORISED_ACCESS, {});
              break;
            case 'UNAUTHENTICATED':
              EventEmitter.dispatch(CommonConstants.UNAUTHORISED_ACCESS, {});

              // old token has expired throwing AuthenticationError,
              // one way to handle is to obtain a new token and
              // add it to the operation context

              // const headers = operation.getContext().headers;
              // operation.setContext({
              //  headers: {
              //    ...headers,
              // //authorization: getNewToken(),
              //  },
              // });
              // Now, pass the modified operation to the next link
              // in the chain. This effectively intercepts the old
              // failed request, and retries it with a new token
              // return forward(operation);
              break;

            case 'INTERNAL_SERVER_ERROR':
              // showErrorToast('Server error.');
              break;
          }
        }
      }
    },
  });
  return client;
};
export default makeApolloClient;
