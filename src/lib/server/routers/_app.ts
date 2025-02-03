import { router } from "@/lib/server/trpc";
import { usersRouter } from "./users";
import { trackedWalletsRouter } from "./trackedWallets";
import { transactionsRouter } from "./transactions";

export const appRouter = router({
  users: usersRouter,
  trackedWallets: trackedWalletsRouter,
  transactions: transactionsRouter,
});

export type AppRouter = typeof appRouter;
