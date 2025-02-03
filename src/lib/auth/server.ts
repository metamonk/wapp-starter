import { redirect } from "next/navigation";
import { getUserAuth } from "@/lib/auth";
import { api } from "@/lib/trpc/api";
import { headers } from "next/headers";

type AuthRouteConfig = {
	isAuthRoute?: boolean; // true for routes like /login, /onboarding
};

export async function validateAuthAndRedirect(config: AuthRouteConfig = {}) {
	const { isAuthRoute = false } = config;
	
	// Get authentication status
	const { user } = await getUserAuth();
	
	// Get user data if we have a user
	const userData = user ? await api.users.getUserByPrivyId.query({
		privyId: user.id,
	}).then(res => res.user).catch(() => null) : null;

	// Get current pathname
	const headersList = await headers();
	const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";

	// Handle authentication routes (login, onboarding)
	if (isAuthRoute) {
		// Only redirect if user is authenticated
		if (user && userData) {
			redirect("/dashboard");
		}
		return { user, userData };
	}

	// Handle protected routes
	if (!user && pathname !== "/login") {
		redirect("/login");
	}

	// Handle onboarding requirement
	if (!userData) {
		redirect("/onboarding");
	}

	return { user, userData };
}

export async function validateAuthRoute() {
	const { user } = await getUserAuth();
	const headersList = await headers();
	const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
	// Redirect to login if not authenticated (except on login page)
  if (!user && pathname !== "/login") {
    // redirect("/login");
  }
  
  // Only query user data if we have an authenticated user
  const userData = user ? await api.users.getUserByPrivyId.query({
    privyId: user.id,
	}).then(res => res.user).catch(() => null) : null;
	
	if (!userData) {
    // redirect("/onboarding");
	}
	
  // If user is fully authenticated and onboarded, send them to dashboard
  if (user && userData) {
    redirect("/dashboard");
  }

  return { user, userData };
}


export async function validateProtectedRoute() {
  const { user } = await getUserAuth();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";
  
  // Redirect to login if not authenticated (except on login page)
  if (!user && pathname !== "/login") {
    redirect("/login");
  }

  // Get user data for onboarding check
  const userData = user ? await api.users.getUserByPrivyId.query({
    privyId: user.id,
  }).then(res => res.user).catch(() => null) : null;

  // Redirect to onboarding if not onboarded
  if (!userData) {
    redirect("/onboarding");
  }

  return { user, userData };
}
