import { getTokensFromCookies } from "@/lib/auth"
import TrpcProvider from "@/lib/trpc/Provider";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = await getTokensFromCookies();
  
  return (
    <main>
      <TrpcProvider cookies={token ?? ""}>
        {children}
      </TrpcProvider>
    </main>
  );
}
