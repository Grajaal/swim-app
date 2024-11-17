"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user-button";

export function CoachNavbar() {
  const user = useCurrentUser();

  return (
    <nav className="bg-secondary flex justify-between px-4 py-3 items-center rounded-xl">
      <h2 className="font-bold">Hola {user?.name} 👋🏼</h2>
      <UserButton />
    </nav>
  );
}
