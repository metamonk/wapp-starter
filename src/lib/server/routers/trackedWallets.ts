import { getTrackedWalletById, getTrackedWallets } from "@/lib/api/trackedWallets/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  trackedWalletIdSchema,
  insertTrackedWalletParams,
  updateTrackedWalletParams,
} from "@/lib/db/schema/trackedWallets";
import { createTrackedWallet, deleteTrackedWallet, updateTrackedWallet } from "@/lib/api/trackedWallets/mutations";

export const trackedWalletsRouter = router({
  getTrackedWallets: publicProcedure.query(async () => {
    return getTrackedWallets();
  }),
  getTrackedWalletById: publicProcedure.input(trackedWalletIdSchema).query(async ({ input }) => {
    return getTrackedWalletById(input.id);
  }),
  createTrackedWallet: publicProcedure
    .input(insertTrackedWalletParams)
    .mutation(async ({ input }) => {
      return createTrackedWallet(input);
    }),
  updateTrackedWallet: publicProcedure
    .input(updateTrackedWalletParams)
    .mutation(async ({ input }) => {
      return updateTrackedWallet(input.id, input);
    }),
  deleteTrackedWallet: publicProcedure
    .input(trackedWalletIdSchema)
    .mutation(async ({ input }) => {
      return deleteTrackedWallet(input.id);
    }),
});
