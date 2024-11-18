import { SwimmerNavbar } from "./swimmer-navbar";
import { DataForm } from "./data-form";
import { currentUser } from "@/lib/auth";
import { hasCompletedForm } from "@/data/swimmer";

export default async function SwimmerDashboard() {
  const sessionUser = await currentUser();

  if (!sessionUser || !sessionUser.id) return <p>Usurio no registrado</p>;

  const isCompleted = await hasCompletedForm(sessionUser.id, new Date());

  return (
    <div className="p-2">
      <SwimmerNavbar />
      {isCompleted ? <p>Formulario completado!</p> : <DataForm />}
    </div>
  );
}
