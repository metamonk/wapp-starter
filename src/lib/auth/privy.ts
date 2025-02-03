import { PrivyClient } from '@privy-io/server-auth';
import { getTokensFromCookies } from '@/lib/auth/utils';

export const privyClient = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET!
)

// @todo: implement caching (if appropriate)
// export const authenticateRequest = cache(async (headers: Headers) => {
/**
 * Authenticates a request by retrieving the token from cookies.
 * @returns The authenticated user or throws an error if authentication fails.
 */
export async function authenticateRequest() {
  const { privyToken } = await getTokensFromCookies();

  if (!privyToken) {
    console.warn('No token provided');
    return null; // Return null if no token is provided
  }

  try {
    const user = await privyClient.verifyAuthToken(privyToken);
    return user;
  } catch (error) {
    console.error('Failed to verify token:', error);
    throw new Error('Invalid token');
  }
}