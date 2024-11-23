import { Card, CardContent } from "@/components/ui/card";
import { TrainingsCardHeader } from "@/components/coach/group/trainings-card-header";
import { GroupsContainer } from "@/components/coach/group/groups-container";
import { getGroupsFromTeam } from "@/data/group";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";

export async function TrainingsCard({ className }: { className?: string }) {
  const team = await getTeamByCoachId((await currentUser()).id);
  const groups = await getGroupsFromTeam(team.id);

  return (
    <Card className={className}>
      <TrainingsCardHeader />
      <CardContent>
        <GroupsContainer groups={groups} />
      </CardContent>
    </Card>
  );
}
