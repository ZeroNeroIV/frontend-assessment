'use client';

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const makeClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: '/api/graphql' }),
    cache: new InMemoryCache(),
  });
};

export const apolloClient = makeClient();
