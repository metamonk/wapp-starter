import TrackedWalletList from "@/components/trackedWallets/TrackedWalletList";
import NewTrackedWalletModal from "@/components/trackedWallets/TrackedWalletModal";
import { api } from "@/lib/trpc/api";

export default async function TrackedWallets() {
  const { trackedWallets } = await api.trackedWallets.getTrackedWallets.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tracked Wallets</h1>
        <NewTrackedWalletModal />
      </div>
      <TrackedWalletList trackedWallets={trackedWallets} />
    </main>
  );
}
