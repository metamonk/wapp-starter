"use client";

import { User } from "@privy-io/server-auth";
import { NewUserParams, insertUserParams } from "@/lib/db/schema/users"
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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserOnboard = ({
  user,
}: {
  user: User;
}) => {

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertUserParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertUserParams),
		defaultValues: {
			privyId: user.id,
     	walletAddress: user.wallet?.address,
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error)
      return;
    }
    await utils.users.getUsers.invalidate();
    router.refresh();
    toast.success(`User ${action}d!`);
  };

  const onError = async (action: "create" | "update" | "delete", data: { error: string }) => {
    toast.error(`Error: ${action} failed, ${data.error}`);
  };

  const { mutate: createUser, isLoading: isCreating } =
    trpc.users.createUser.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const handleClick = () => {
    const values = {
      privyId: user.id,
      walletAddress: user.wallet?.address,
      isAdmin: false
    } as NewUserParams;
    createUser(values);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="font-medium">ID:</div>
        <div className="text-gray-600">{user.id}</div>
      </div>
      <div>
        <div className="font-medium">Wallet Address:</div>
        <div className="text-gray-600">{user.wallet?.address}</div>
      </div>
      <Button
        onClick={handleClick}
        className="mr-1"
        disabled={isCreating}
      >
        Continue {isCreating && '...'}
      </Button>
    </div>
  );
};

export default UserOnboard;
