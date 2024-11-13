"use client";

import { updateRole } from "@/actions/role";
import { Button } from "@/components/ui/button";
import { Role } from "@prisma/client";

export default function CompleteProfilePage() {
  const handleClick = (role: Role) => {
    updateRole(role);
  };

  return (
    <div>
      <h1>Selecciona tu rol</h1>
      <div className="flex">
        <Button onClick={() => handleClick(Role.coach)}>👤Entrenador</Button>
        <Button onClick={() => handleClick(Role.swimmer)}>🏊🏼Nadador</Button>
      </div>
    </div>
  );
}
