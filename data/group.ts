"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getGroupsFromTeam(teamId: string | undefined) {

  if (!teamId){
    return [];
  }

  const groups = await db.group.findMany({
    where: {
      teamId
    }, 
    include: {
      swimmers: {
        include: {
          user: true,
        }
      }
    }
  })

  return groups;  
}

export async function deleteGroup(id: string) {
  await db.group.delete({
    where: {
      id,
    }
  })

  revalidatePath("/dashboard")
}