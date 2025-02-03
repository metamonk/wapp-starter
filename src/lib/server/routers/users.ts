import {
  publicProcedure,
  router
} from "@/lib/server/trpc"
import {
  userIdSchema,
  privyIdSchema,
  insertUserParams,
  updateUserParams,
} from "@/lib/db/schema/users";
import {
  getUserById,
  getUserByPrivyId,
  getUsers
} from "@/lib/api/users/queries"
import {
  createUser,
  deleteUser,
  updateUser
} from "@/lib/api/users/mutations";

export const usersRouter = router({
  getUsers: publicProcedure.query(async () => {
    return getUsers();
  }),
  getUserById: publicProcedure.input(userIdSchema).query(async ({ input }) => {
    return getUserById(input.id);
  }),
  getUserByPrivyId: publicProcedure.input(privyIdSchema).query(async ({ input }) => {
    return getUserByPrivyId(input.privyId);
  }),
  createUser: publicProcedure
    .input(insertUserParams)
    .mutation(async ({ input }) => {
      return createUser(input);
    }),
  updateUser: publicProcedure
    .input(updateUserParams)
    .mutation(async ({ input }) => {
      return updateUser(input.id, input);
    }),
  deleteUser: publicProcedure
    .input(userIdSchema)
    .mutation(async ({ input }) => {
      return deleteUser(input.id);
    }),
});
