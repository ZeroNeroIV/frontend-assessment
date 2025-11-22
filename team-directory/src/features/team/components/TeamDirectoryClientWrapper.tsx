'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/apollo-client';
import { TeamDirectoryClient } from './TeamDirectoryClient';

export default function TeamDirectoryClientWrapper() {
  return (
    <ApolloProvider client={apolloClient}>
      <TeamDirectoryClient />
    </ApolloProvider>
  );
}