import { Prisma } from "@prisma/client";

export type SwimmerWithUser = Prisma.SwimmerGetPayload<{ include: { user: true } }>;