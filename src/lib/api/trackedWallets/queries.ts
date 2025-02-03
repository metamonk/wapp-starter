import { db } from "@/lib/db/index";
import { type TrackedWalletId, trackedWalletIdSchema } from "@/lib/db/schema/trackedWallets";

export const getTrackedWallets = async () => {
  const t = await db.trackedWallet.findMany({});
  return { trackedWallets: t };
};

export const getTrackedWalletById = async (id: TrackedWalletId) => {
  const { id: trackedWalletId } = trackedWalletIdSchema.parse({ id });
  const t = await db.trackedWallet.findFirst({
    where: { id: trackedWalletId}});
  return { trackedWallet: t };
};


