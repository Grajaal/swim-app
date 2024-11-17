"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { Role } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { joinTeam } from "@/actions/join-team";
import { useCurrentUser } from "@/hooks/use-current-user";
import { userHasTeam } from "@/data/user";
import { redirect } from "next/navigation";

export default function JoinTeamPage() {
  const [teamId, setTeamId] = useState("");
  const [error, setError] = useState("");
  const [hasTeam, setHasTeam] = useState<boolean | undefined>(false);
  const sessionUser = useCurrentUser();

  useEffect(() => {
    const checkHasTeam = async () => {
      const initialHasTeam = await userHasTeam(sessionUser?.id);
      setHasTeam(initialHasTeam);
    };

    checkHasTeam();
  }, [sessionUser]);

  const handleClick = () => {
    setError("");

    joinTeam(teamId).then((data) => {
      setError(data.error);
    });
  };

  if (hasTeam) redirect("dashboard");

  return (
    <RoleGate allowedRole={Role.swimmer}>
      <div className="flex justify-center items-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Únete a tu equipo!</CardTitle>
            <CardDescription>
              Pídele el código del equipo a tu entrenador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="AX54J"
              onChange={(e) => {
                setTeamId(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" onClick={handleClick}>
              Unirse
            </Button>
          </CardFooter>
        </Card>
      </div>
    </RoleGate>
  );
}
