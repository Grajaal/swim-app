import { User } from "next-auth";
import { CoachNavbar } from "./coach-navbar";

export default function CoachDasboard() {
  return (
    <div className="m-4">
      <CoachNavbar />
    </div>
  );
}
