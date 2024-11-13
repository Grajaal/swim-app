import { RoleGate } from "@/components/auth/role-gate";
import { Role } from "@prisma/client";

export default function CoachDasbboardPage() {
  return (
    <div>
      <RoleGate allowedRole={Role.coach}>Eres entrenador</RoleGate>
    </div>
  );
}
