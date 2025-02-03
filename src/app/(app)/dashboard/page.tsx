import { findOrCreateUser } from "@/lib/auth/server"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const user = await findOrCreateUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1 className="font-semibold text-2xl">Dashboard</h1>
    </main>
  );
}