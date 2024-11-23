"use client";

import { GroupWithSwimmer } from "@/prisma/custom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { deleteGroup } from "@/data/group";
import { EditGroupDialog } from "@/components/coach/group/header/edit-group-dialog";

export function GroupItem({ group }: { group: GroupWithSwimmer }) {
  const handleDeleteGroup = async () => {
    await deleteGroup(group.id);
  };

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 justify-between">
          <div className="flex space-x-2 w-auto">
            <Input placeholder="Metros recorridos" />
            <Input placeholder="Minutos" />
          </div>
          <div className="flex space-x-2">
            <EditGroupDialog group={group} />
            <Button variant="outline" size="icon" onClick={handleDeleteGroup}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
