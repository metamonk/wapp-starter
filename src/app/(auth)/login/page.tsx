import LoginCard from "@/components/LoginCard"
import { redirect } from "next/navigation"
import { getUserAuth } from "@/lib/auth"

export default async function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <LoginCard />
    </div>
  );
}
