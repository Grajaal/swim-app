import { CoachNavbar } from "@/components/coach/coach-navbar";
import { SwimmerNavbar } from "@/components/swimmer/swimmer-navbar";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

export default async function DasboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = await currentUser();

  if (!userSession || !userSession.id) {
    redirect("/auth/login");
  }

  const team = await getTeamByCoachId(userSession.id);

  if (userSession.role === Role.coach) {
    return (
      <div className="p-2">
        <CoachNavbar teamId={team?.id} />
        {children}
      </div>
    );
  }

  return (
    <div className="p-2">
      <SwimmerNavbar />
      {children}
    </div>
  );
}
