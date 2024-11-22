import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrainingsCardHeader } from "@/components/coach/trainings-card-header";
import { getGroupsFromTeam } from "@/data/group";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";

export async function TrainingsCard({ className }: { className?: string }) {
  const user = await currentUser();
  const team = await getTeamByCoachId(user.id);
  const groups = await getGroupsFromTeam(team?.id);

  return (
    <Card className={className}>
      <TrainingsCardHeader />
      <CardContent></CardContent>
    </Card>
  );
}
