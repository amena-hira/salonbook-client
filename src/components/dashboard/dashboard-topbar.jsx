"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardTopbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const initials = user?.name
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";
  const title = "SalonBook";

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="size-9 rounded-md border border-border text-charcoal hover:bg-cream hover:text-charcoal" />
        <h1 className="font-heading text-xl font-semibold text-charcoal sm:text-2xl">{title}</h1>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <button type="button" aria-label="Notifications" className="relative grid size-8 place-items-center rounded-full text-charcoal transition-colors hover:bg-cream">
          <Bell className="size-5" aria-hidden="true" />
          <span className="absolute right-0.5 top-0.5 size-2 rounded-full bg-red-500 ring-2 ring-background" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Open user menu" className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-charcoal">
            <Avatar className="size-9 border border-border">
              {user?.image && <AvatarImage src={user.image} alt={user.name || "User profile"} />}
              <AvatarFallback className="bg-cream font-semibold text-charcoal">{initials}</AvatarFallback>
            </Avatar>
            <ChevronDown className="hidden size-4 text-charcoal sm:block" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 rounded-xl bg-white p-3 text-charcoal shadow-xl">
            <div className="px-3 py-2">
              <p className="font-semibold">{user?.name || "SalonBook User"}</p>
              <p className="mt-1 truncate text-sm text-ash">{user?.email}</p>
            </div>
            <DropdownMenuSeparator className="my-2 bg-border" />
            <DropdownMenuItem variant="destructive" onClick={handleSignOut} className="cursor-pointer rounded-lg px-3 py-2.5 font-medium">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardTopbar;
