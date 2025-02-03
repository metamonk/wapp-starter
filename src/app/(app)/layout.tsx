import { getTokensFromCookies } from "@/lib/auth"
import TrpcProvider from "@/lib/trpc/Provider";
import { validateProtectedRoute } from "@/lib/auth/guard"

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
