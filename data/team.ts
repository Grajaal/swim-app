import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateCode } from "@/lib/generate-code";
import { redirect } from "next/navigation";

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

export async function createTeam() {
  let isUnique = false; 
  let code = ''; 

  while(!isUnique) {
    code = generateCode();
    const existingTeam = await db.team.findUnique({ 
      where: {
        id: code,
      }
    })

    if (!existingTeam) {
      isUnique = true;
    }
  }

  const team = await db.team.create({
    data: {
      id: code
    }
  })

  if (!team) return;

  return team;
}

