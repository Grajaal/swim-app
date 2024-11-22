"use server";

import { getSwimmersByNames } from "@/data/swimmer";
import { db } from "@/lib/db";
import { Swimmer } from "@prisma/client";

export async function createGroup(teamId: string, name: string, swimmersNames: string[]) {

  const swimmers = await getSwimmersByNames(swimmersNames);

  db.swimmerGroup.create({
    data: {
      name, 
      swimmers,
    }
  })
}