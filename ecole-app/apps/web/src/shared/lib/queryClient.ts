import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';

/**
 * Determines if a failed request should be retried.
 * Never retry on auth or client errors (401, 403, 404, 422).
 */
const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (failureCount >= 2) return false;

  const status = (error as any)?.response?.status;
  if (status && [401, 403, 404, 422].includes(status)) return false;

  return true;
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only log errors for queries that have already been loaded (background refetch failures)
      if (query.state.data !== undefined) {
        console.error(`[QueryCache] Background refetch failed for "${String(query.queryKey)}":`, error);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error('[MutationCache] Mutation failed:', error);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: shouldRetry,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
    },
    mutations: {
      retry: false, // Never auto-retry mutations
    },
  },
});
