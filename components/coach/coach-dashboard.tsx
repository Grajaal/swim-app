import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TodayDate } from "../today-date";
import { Card } from "../ui/card";
import { DailyRegister } from "@/components/coach/daily-register";
import { TrainingsCard } from "@/components/coach/group/trainings-card";

export default async function CoachDasboard() {
  const userSession = await currentUser();
  if (!userSession?.id) redirect("/auth/login");

  return (
    <div className="p-4 grid grid-rows-2 grid-cols-[2fr,1fr] gap-4 h-full">
      <TrainingsCard className="row-span-2" />
      <DailyRegister />
      <Card>
        <h2>Rendimiento semanal general</h2>
      </Card>
    </div>
  );
}
