import CoachDasboard from "@/components/coach/coach-dashboard";
import SwimmerDashboard from "@/components/swimmer/swimmer-dashboard";
import { hasTeam } from "@/data/swimmer";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user || !user.id) return <p>No estás autenticado.</p>;

  if (user?.role === Role.coach) {
    return <CoachDasboard />;
  }

  const isInTeam = await hasTeam(user.id);

  if (!isInTeam) {
    redirect("/join-team");
  }

  return <SwimmerDashboard />;
}
