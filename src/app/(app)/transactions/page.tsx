import TransactionList from "@/components/transactions/TransactionList";
import NewTransactionModal from "@/components/transactions/TransactionModal";
import { api } from "@/lib/trpc/api";

export default async function Transactions() {
  const { transactions } = await api.transactions.getTransactions.query();  

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Transactions</h1>
        <NewTransactionModal />
      </div>
      <TransactionList transactions={transactions} />
    </main>
  );
}
