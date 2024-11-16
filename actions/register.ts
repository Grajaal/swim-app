"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { Role } from "@prisma/client";
import { createTeam } from "./team";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Faltan campos por completar." };
  }

  const { name, email, password, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const emailExists = await getUserByEmail(email);

  if (emailExists) {
    return { error: "Ese correo electrónico ya está en uso." };
  }

  console.log(role);

  const createdUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  if (values.role === Role.coach) {
    
    const createdTeam = await createTeam();

    await db.coach.create({
      data: {
        id: createdUser.id,
        teamId: createdTeam.id
      },
    });
  }

  return { success: "Registro completado." };
};
