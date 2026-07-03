/**
 * ⚠ ANYTHING PLATFORM — DO NOT REWRITE THIS FILE ⚠
 *
 * V1-compatible mobile user hook. Migrated apps commonly import
 * `@/utils/auth/useUser` and expect `{ user, data, loading, refetch }`.
 * Keep this surface stable; the V2 auth state still comes from `useAuth()`.
 */
import { useCallback } from 'react';
import { useAuth } from './useAuth';

export const useUser = () => {
  const { auth, isReady } = useAuth();
  const user = auth?.user ?? null;
  const refetch = useCallback(async () => user, [user]);

  return {
    user,
    data: user,
    loading: !isReady,
    refetch,
  };
};

export default useUser;
