import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateGroupDialog } from "@/components/coach/create-group-dialog";

export function TrainingsCardHeader() {
  return (
    <CardHeader>
      <div className="flex justify-between">
        <CardTitle>Entrenamientos</CardTitle>
        <CreateGroupDialog />
      </div>
    </CardHeader>
  );
}
