"use server";

import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Faltan campos por completar." };
  }

  const { name, email, password, role } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);

  const emailExists = await getUserByEmail(email);

  if (emailExists) {
    return { error: "Ese correo electrónico ya está en uso." };
  }

  console.log(role);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return { success: "Registro completado." };
};
