import { CoachNavbar } from "./coach-navbar";
import TeamMembersCard from "@/components/coach/team-members-card";

export default function CoachDasboard() {
  return (
    <div>
      <div className="p-2">
        <CoachNavbar />
      </div>
      <div className="flex justify-center">
        <TeamMembersCard />
      </div>
    </div>
  );
}
