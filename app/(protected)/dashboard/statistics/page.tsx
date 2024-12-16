import { SleepChart } from "@/components/charts/sleep-chart";
import { SwimmersSelect } from "@/components/swimmers_select";
import { StatisticsProvider } from "@/context/statistics-context";
import { getSwimmersFromTeam } from "@/data/swimmer"
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";

export default async function StatisticsPage() {
  const userSession = await currentUser();
  const team = await getTeamByCoachId(userSession.id);
  const swimmers = await getSwimmersFromTeam(team.id);

  return (
    <StatisticsProvider>
      <div>
        <SwimmersSelect swimmers={swimmers} />
        <div className="grid grid-cols-6 grid-rows-[2fr_1fr] gap-4 p-4 h-screen">
          <SleepChart className="col-span-3" title="Horas de sueño" />
          <SleepChart className="col-span-3" title="Calidad de sueño" />
          <SleepChart className="col-span-2" title="Fatiga de sueño" />
          <SleepChart className="col-span-2" title="Dolor muscular" />
          <SleepChart className="col-span-2" title="Estrés" />
        </div>
      </div>
    </StatisticsProvider >
  )
}
