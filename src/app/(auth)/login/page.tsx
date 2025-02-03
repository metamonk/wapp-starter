import LoginCard from "@/components/LoginCard"
import { redirect } from "next/navigation"
import { getUserAuth } from "@/lib/auth"

export default async function LoginPage() {
  const { user } = await getUserAuth();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <LoginCard />
    </div>
  );
}
