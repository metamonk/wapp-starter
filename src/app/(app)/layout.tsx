import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( <main>
<TrpcProvider cookies={cookies().toString()}>{children}</TrpcProvider>
</main> )
}