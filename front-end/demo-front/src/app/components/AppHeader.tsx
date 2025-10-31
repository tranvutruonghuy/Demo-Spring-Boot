import { ModeToggle } from "@/components/ModeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4 md:px-8">
        {/* ==== NAVIGATION MENU ==== */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuItem asChild>
                <SidebarTrigger />
              </NavigationMenuItem>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuItem asChild>
                <Link href="/" className="px-4 py-2 text-lg font-semibold">
                  Dashboard
                </Link>
              </NavigationMenuItem>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* ==== RIGHT ACTIONS ==== */}
        <div className="flex items-center gap-2">
          <Separator orientation="vertical" className="h-6 mr-[20px]">
            <ModeToggle />
          </Separator>
        </div>
      </div>
    </header>
  );
}
