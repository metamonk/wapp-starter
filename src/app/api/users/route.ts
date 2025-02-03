import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createUser,
  deleteUser,
  updateUser,
} from "@/lib/api/users/mutations";
import { 
  userIdSchema,
  insertUserParams,
  updateUserParams 
} from "@/lib/db/schema/users";

export async function POST(req: Request) {
  try {
    const validatedData = insertUserParams.parse(await req.json());

    const { user } = await createUser(validatedData);

    revalidatePath("/users"); // optional - assumes you will have named route same as entity

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateUserParams.parse(await req.json());
    const validatedParams = userIdSchema.parse({ id });

    const { user } = await updateUser(validatedParams.id, validatedData);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = userIdSchema.parse({ id });
    const { user } = await deleteUser(validatedParams.id);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
