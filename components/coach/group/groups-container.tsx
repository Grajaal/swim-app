"use client";

import { GroupItem } from "@/components/coach/group/group-item";
import { GroupWithSwimmer } from "@/prisma/custom";

export function GroupsContainer({ groups }: { groups: GroupWithSwimmer[] }) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </div>
  );
}
