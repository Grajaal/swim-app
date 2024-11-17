import { currentUser } from "@/lib/auth";
import { getUserById } from "./user";
import { db } from "@/lib/db";

export async function getSwimmersFromTeam(teamId: string) {
  const sessionUser = await currentUser();

  if (!sessionUser?.id) throw Error("There is not user session.");

  const dbUser = await getUserById(sessionUser.id);

  if (!dbUser?.hasTeam) throw Error("User has no team.");

  const swimmers = db.swimmer.findMany({
    where: {
      teamId
    }, 
    include: {
      user: true,
    }
  })

  return swimmers;
}