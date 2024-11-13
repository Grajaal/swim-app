"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export async function updateRole(role: Role) {
  const session = await auth();

  if (!session?.user) return null;

  await db.user.update({
    where: { id: session.user.id },
    data: {
      role,
    },
  });
}
