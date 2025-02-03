import { getTokensFromCookies } from "@/lib/auth"
import TrpcProvider from "@/lib/trpc/Provider";
import { getUserAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { validateAuthRoute } from "@/lib/auth/server"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await validateAuthRoute();
  
  const { privyToken } = await getTokensFromCookies();
  return (
    <main>
      <TrpcProvider cookies={privyToken ?? ""}>
        {children}
      </TrpcProvider>
    </main>
  );
}
