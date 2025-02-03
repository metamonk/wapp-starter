import { privyClient } from "./privy";
import { cookies, headers } from "next/headers";
import { User } from "@privy-io/server-auth";

/**
 * Retrieves multiple values from cookies.
 * @returns An object containing the token and other values or null if not found.
 */
export async function getTokensFromCookies(): Promise<{ privyToken: string | null, privyIdToken: string | null }> {
  const cookieStore = await cookies();

  return {
    privyToken: cookieStore.get('privy-token')?.value || null,
    privyIdToken: cookieStore.get('privy-id-token')?.value || null,
  };
}

/**
 * Retrieves the authenticated user from the request context.
 * @returns An object containing the authenticated user or null if authentication fails.
 */
export const getUserAuth = async (): Promise<{ user: User | null }> => {
  const { privyToken, privyIdToken } = await getTokensFromCookies();

  if (!privyToken || !privyIdToken) {
    return { user: null };
  }

  const verified = await privyClient.verifyAuthToken(privyToken);

  if (!verified) {
    return { user: null };
  }

  try {
    const userObject = await privyClient.getUser({ idToken: privyIdToken });
		return { user: userObject }
  } catch (error) {
    console.error('Failed to authenticate user:', error);
    return { user: null };
  }
}

export async function getPathname(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
}