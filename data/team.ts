"use server";

import { db } from "@/lib/db";

export async function getTeamByCoachId(id: string) {
  const coach = await db.coach.findUnique({
    where: {
      id
    }, 
    include: {
      team: true
    }
  })

  return coach?.team;
}