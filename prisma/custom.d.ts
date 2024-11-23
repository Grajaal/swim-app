import { Prisma } from "@prisma/client";

export type SwimmerWithUser = Prisma.SwimmerGetPayload<{ include: { user: true } }>;


export type GroupWithSwimmer = Prisma.GroupGetPayload<{ 
  include: { 
    swimmers: {
      include: {
          user: true;
      }
    }
  }
}>;