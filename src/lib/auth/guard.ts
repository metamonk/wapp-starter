import { redirect } from "next/navigation";
import { getPathname, getUserAuth } from "@/lib/auth";
import { api } from "@/lib/trpc/api";
import { User } from "../db/schema/users"

export async function fetchUserWithPrivyId(privyId: string): Promise<User | null> {
	try {
		const response = await api.users.getUserByPrivyId.query({ privyId });
		return response.user;
	} catch (error) {
		console.error('Error fetching user data:', error);
		return null;
	}
}

export async function getUserAndUserData() {
	const { user } = await getUserAuth();
	const userData = user ? await fetchUserWithPrivyId(user.id) : null;
	return { user, userData };
}

export async function validateAuthRoute() {
	const { user, userData } = await getUserAndUserData();
	
	if (user && userData) {
		redirect("/dashboard");
	}
	
	if (user && !userData) {
		redirect("/onboarding");
	}

	return { user, userData };
}

export async function validateProtectedRoute() {
	const { user, userData } = await getUserAndUserData();
	const pathname = await getPathname();
	
	if (!user && pathname !== "/login") {
		redirect("/login");
	}

	if (user && !userData) {
		redirect("/onboarding");
	}

	return { user, userData };
}
