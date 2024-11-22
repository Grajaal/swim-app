import { db } from "@/lib/db";

export async function getGroupsFromTeam(teamId: string | undefined) {

  if (!teamId){
    return [];
  }

  const groups = await db.swimmerGroup.findMany({
    where: {
      teamId
    }
  })

  return groups;  
}