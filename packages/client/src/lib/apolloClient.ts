import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:4000/graphql', // URI of Apollo Server
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}