import CoachDasboard from "@/components/coach/coach-dashboard";
import SwimmerDashboard from "@/components/swimmer/swimmer-dashboard";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";

export default async function DashboardPage() {
  const user = await currentUser();

  if (user?.role === Role.coach) {
    return <CoachDasboard />;
  }

  return <SwimmerDashboard />;
}
