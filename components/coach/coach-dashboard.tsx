import TeamMembersCard from "@/components/coach/team-members-card";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CoachDasboard() {
  const sessionUser = await currentUser();

  if (!sessionUser || !sessionUser.id) {
    redirect("/auth/login");
  }

  return (
    <div className="h-screen flex flex-col p-2">
      <div className="flex-1 flex justify-center items-center">
        <TeamMembersCard />
      </div>
    </div>
  );
}
