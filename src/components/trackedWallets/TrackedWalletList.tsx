"use client";
import { CompleteTrackedWallet } from "@/lib/db/schema/trackedWallets";
import { trpc } from "@/lib/trpc/client";
import TrackedWalletModal from "./TrackedWalletModal";


export default function TrackedWalletList({ trackedWallets }: { trackedWallets: CompleteTrackedWallet[] }) {
  const { data: t } = trpc.trackedWallets.getTrackedWallets.useQuery(undefined, {
    initialData: { trackedWallets },
    refetchOnMount: false,
  });

  if (t.trackedWallets.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.trackedWallets.map((trackedWallet) => (
        <TrackedWallet trackedWallet={trackedWallet} key={trackedWallet.id} />
      ))}
    </ul>
  );
}

const TrackedWallet = ({ trackedWallet }: { trackedWallet: CompleteTrackedWallet }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{trackedWallet.address}</div>
      </div>
      <TrackedWalletModal trackedWallet={trackedWallet} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No tracked wallets
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new tracked wallet.
      </p>
      <div className="mt-6">
        <TrackedWalletModal emptyState={true} />
      </div>
    </div>
  );
};

