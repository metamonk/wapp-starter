"use client";
import { CompleteTransaction } from "@/lib/db/schema/transactions";
import { trpc } from "@/lib/trpc/client";
import TransactionModal from "./TransactionModal";


export default function TransactionList({ transactions }: { transactions: CompleteTransaction[] }) {
  const { data: t } = trpc.transactions.getTransactions.useQuery(undefined, {
    initialData: { transactions },
    refetchOnMount: false,
  });

  if (t.transactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.transactions.map((transaction) => (
        <Transaction transaction={transaction} key={transaction.id} />
      ))}
    </ul>
  );
}

const Transaction = ({ transaction }: { transaction: CompleteTransaction }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{transaction.signature}</div>
      </div>
      <TransactionModal transaction={transaction} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No transactions
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new transaction.
      </p>
      <div className="mt-6">
        <TransactionModal emptyState={true} />
      </div>
    </div>
  );
};

