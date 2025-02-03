import { db } from "@/lib/db/index"
import { authenticateRequest } from "@/lib/auth/privy"

export async function createTRPCContext(opts: { headers: Headers }) {
  const user = await authenticateRequest();

  return {
    db,
    user,
    ...opts,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
