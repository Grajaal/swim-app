import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user-button";
import { currentUser } from "@/lib/auth";

export async function SwimmerNavbar() {
  const user = await currentUser();

  return (
    <nav className="bg-secondary flex justify-between p-2 items-center rounded-xl">
      <h2 className="font-bold">Hola {user?.name} 👋🏼</h2>
      <UserButton />
    </nav>
  );
}
