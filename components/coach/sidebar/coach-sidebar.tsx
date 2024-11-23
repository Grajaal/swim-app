"use client";
import { Home, LogOut, Train } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../../ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";
import { LogoutButton } from "../../auth/logout-button";

export function CoachSidebar({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <span className="font-bold text-2xl p-4">🏊🏼 SwimApp</span>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem className="rounded-lg">
            <SidebarMenuButton
              variant={pathname === "/dashboard" ? "outline" : "default"}
              size="lg"
              asChild
            >
              <Link href="/dashboard">
                <div className="inline-flex items-center space-x-2 ml-2">
                  <Home className="w-4 h-4" />
                  <span className="text-lg">Inicio</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="rounded-lg">
            <SidebarMenuButton
              variant={
                pathname === "/dashboard/trainings" ? "outline" : "default"
              }
              size="lg"
              asChild
            >
              <Link href="/dashboard/trainings">
                <div className="inline-flex items-center space-x-2 ml-2">
                  <Train className="h-4 w-4" />
                  <span className="text-lg">Entrenamientos</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{user.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <LogoutButton>
                <div className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Cerrar sesión</span>
                </div>
              </LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
