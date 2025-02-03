import { db } from "@/lib/db/index";
import { type UserId, userIdSchema, type PrivyId, privyIdSchema } from "@/lib/db/schema/users";

export const getUsers = async () => {
  const u = await db.user.findMany({});
  return { users: u };
};

export const getUserById = async (id: UserId) => {
  const { id: userId } = userIdSchema.parse({ id });
  const u = await db.user.findFirst({
    where: { id: userId}});
  return { user: u };
};

export const getUserByPrivyId = async (id: PrivyId) => {
  const { privyId } = privyIdSchema.parse({ privyId: id });
  const u = await db.user.findFirst({
    where: { privyId: privyId }
  });
  return { user: u };
};

