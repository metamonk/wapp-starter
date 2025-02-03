import { usePrivy } from '@privy-io/react-auth';
import useSWR from 'swr';
import { User } from '@/types';
import { fetcher } from '@/lib/utils';

export function useAuth() {
  const { ready, authenticated, user: privyUser, login, logout } = usePrivy();

  // const { data, error } = useSWR(
  //   ready && authenticated ? '/api/users' : null,
  //   fetcher
  // );

  // const user: User | null = data?.user || null;

  // if (ready && !authenticated) {
  //   login();
  // }

  // Ensure Privy is ready and the user is authenticated
  if (!ready) return { loading: true };
  if (!authenticated) return { login };

  return {
    ready,
    authenticated,
    // user,
    privyUser,
    login,
    logout,
    // error
  }
}