import { getUserAuth } from "./utils"

import { User } from "@/lib/db/schema/users"
import { createUser } from "../api/users/mutations"
import { getUserById } from "@/lib/api/users/queries"
import {useSolanaWallets} from '@privy-io/react-auth/solana';



/**
 * Checks if a user exists in the Prisma database for the logged-in Privy user.
 * If not, creates the user.
 * @returns The user object from the Prisma database.
 */
export const findOrCreateUser = async (): Promise<User | null> => {
  const { user } = await getUserAuth();
  
  console.log({ user });
  
  if (!user) {
    return null;
  }

  try {
    // Check if the user exists in the database
    const dbUser = await getUserById(user.privyId);

    if (dbUser.user) {
      return dbUser.user;
    }

    // If the user does not exist, create them
    const newUser = {
      privyId: user.privyId,
      walletAddress: user.walletAddress,
      isAdmin: false,
    };

    const createdUser = await createUser(newUser);
    return createdUser.user;
  } catch (error) {
    console.error('Error fetching or creating user:', error);
    return null;
  }
}

