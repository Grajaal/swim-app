import { getSwimmersFromTeam } from "@/data/swimmer";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";

export default async function TeamMembers() {
  const sessionUser = await currentUser();

  if (!sessionUser || !sessionUser.id)
    return <span>Session or user id does not exists</span>;

  const team = await getTeamByCoachId(sessionUser.id);

  if (!team || !team.id) return;

  const swimmers = await getSwimmersFromTeam(team.id);

  return (
    <div>
      {swimmers.map((swimmer) => (
        <div key={swimmer.id} className="flex space-x-2">
          <p>{swimmer.user.name}</p>
          <p>{swimmer.user.email}</p>
        </div>
      ))}
    </div>
  );
}
