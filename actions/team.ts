"use server";

import { db } from "@/lib/db";
import { generateCode } from "@/lib/generate-code";

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

  return team;
}