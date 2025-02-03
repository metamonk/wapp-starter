"use client";

import { Transaction, NewTransactionParams, insertTransactionParams } from "@/lib/db/schema/transactions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TransactionForm = ({
  transaction,
  closeModal,
}: {
  transaction?: Transaction;
  closeModal?: () => void;
}) => {
  const { data: trackedWallets } = trpc.trackedWallets.getTrackedWallets.useQuery();
  const editing = !!transaction?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertTransactionParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertTransactionParams),
    defaultValues: transaction ?? {
      signature: "",
     trackedWalletId: "",
     walletId: "",
     type: "",
     amount: 0.0,
     token: "",
     status: "",
     raw: ""
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.transactions.getTransactions.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Transaction ${action}d!`);
  };

  const { mutate: createTransaction, isLoading: isCreating } =
    trpc.transactions.createTransaction.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateTransaction, isLoading: isUpdating } =
    trpc.transactions.updateTransaction.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteTransaction, isLoading: isDeleting } =
    trpc.transactions.deleteTransaction.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewTransactionParams) => {
    if (editing) {
      updateTransaction({ ...values, id: transaction.id });
    } else {
      createTransaction(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (<FormItem>
              <FormLabel>Signature</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trackedWalletId"
          render={({ field }) => (<FormItem>
              <FormLabel>Tracked Wallet Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tracked wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {trackedWallets?.trackedWallets.map((trackedWallet) => (
                      <SelectItem key={trackedWallet.id} value={trackedWallet.id.toString()}>
                        {trackedWallet.id}  {/* TODO: Replace with a field from the trackedWallet model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="walletId"
          render={({ field }) => (<FormItem>
              <FormLabel>Wallet Id</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (<FormItem>
              <FormLabel>Type</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (<FormItem>
              <FormLabel>Amount</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (<FormItem>
              <FormLabel>Token</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (<FormItem>
              <FormLabel>Status</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="raw"
          render={({ field }) => (<FormItem>
              <FormLabel>Raw</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteTransaction({ id: transaction.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default TransactionForm;
