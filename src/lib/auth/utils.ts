import { privyClient } from "./privy";
import { cookies } from "next/headers";
import { User } from "@privy-io/server-auth";

/**
 * Retrieves multiple values from cookies.
 * @returns An object containing the token and other values or null if not found.
 */
export async function getTokensFromCookies(): Promise<{ token: string | null, idToken: string | null }> {
  const cookieStore = await cookies();

  return {
    token: cookieStore.get('privy-token')?.value || null,
    idToken: cookieStore.get('privy-id-token')?.value || null,
  };
}

/**
 * Retrieves the authenticated user from the request context.
 * @returns An object containing the authenticated user or null if authentication fails.
 */
// @todo: implement caching (if appropriate)
// export const getUserAuth = cache(async (): Promise<{ user: User | null }> => {
export const getUserAuth = async (): Promise<{ user: User | null }> => {
  const { token, idToken } = await getTokensFromCookies();

  if (!token || !idToken) {
    return { user: null };
  }

  try {
    await privyClient.verifyAuthToken(token);
    
    const userObject = await privyClient.getUser({ idToken: idToken });

		return { user: userObject }
  } catch (error) {
    console.error('Failed to authenticate user:', error);
    return { user: null };
  }
}

