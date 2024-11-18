import { Swimmer } from "@prisma/client";
import { User } from "next-auth";

export type SwimmerWithUser = Swimmer & {
  user: User;
}