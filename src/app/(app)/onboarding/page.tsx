import UserOnboard from "@/components/users/UserOnboard"
import { getUserAuth } from "@/lib/auth"

export default async function Onboarding() {
	const { user } = await getUserAuth();

	if (!user) {
		return <div>Loading...</div>
	}

  return <UserOnboard user={user} />
}