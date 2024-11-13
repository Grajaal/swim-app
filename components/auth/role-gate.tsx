"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { Role } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();
}
