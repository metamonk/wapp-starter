import { getTokensFromCookies } from "@/lib/auth"
import TrpcProvider from "@/lib/trpc/Provider";
import { redirect } from "next/navigation"
import { getUserAuth } from "@/lib/auth"
import { api } from "@/lib/trpc/api"
import { validateProtectedRoute } from "@/lib/auth/server"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await validateProtectedRoute();

  const { privyToken } = await getTokensFromCookies();
  return (
    <main>
      <TrpcProvider cookies={privyToken ?? ""}>
        {children}
      </TrpcProvider>
    </main>
  );
}
