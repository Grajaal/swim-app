import { useCurrentUser } from "@/hooks/use-current-user";
import { SwimmerNavbar } from "./swimmer-navbar";
import { useSession } from "next-auth/react";
import { currentUser } from "@/lib/auth";

export default async function SwimmerDashboard() {
  const user = await currentUser();

  return (
    <div>
      <SwimmerNavbar />
      <span>{JSON.stringify(user, null, 2)}</span>
    </div>
  );
}
