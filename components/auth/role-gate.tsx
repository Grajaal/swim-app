"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { Role } from "@prisma/client";
import { FormError } from "@/components/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message="No tienes permiso para ver este contenido." />;
  }

  return <>{children}</>;
}
