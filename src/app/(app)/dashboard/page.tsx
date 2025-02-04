import { getUserAuth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {  
  return (
    <main>
      <h1 className="font-semibold text-2xl">Dashboard</h1>
    </main>
  );
}