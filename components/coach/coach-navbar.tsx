"use client";

import { Copy } from "lucide-react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "@/components/auth/user-button";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function CoachNavbar({ teamId }: { teamId: string | undefined }) {
  const user = useCurrentUser();
  const pathname = usePathname();

  const handleCopy = () => {
    if (teamId) {
      navigator.clipboard.writeText(teamId).then(() => {
        toast.success("Código copiado correctamente.");
      });
    }
  };

  return (
    <nav className="bg-secondary flex justify-between px-4 py-3 items-center rounded-xl">
      <div className="flex space-x-2">
        <h1 className="font-bold text-2xl">Hola {user?.name} 👋🏼</h1>
        <Button
          asChild
          variant={pathname === "/dashboard" ? "default" : "outline"}
        >
          <Link href="/dashboard">Inicio</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/dashboard/trainings" ? "default" : "outline"}
        >
          <Link href="/dashboard/trainings">Entrenamientos</Link>
        </Button>
      </div>
      <div className="flex space-x-2 items-center">
        <Button onClick={handleCopy}>
          <Copy className="h-4 w-4" />
          {teamId}
        </Button>
        <UserButton />
      </div>
    </nav>
  );
}
