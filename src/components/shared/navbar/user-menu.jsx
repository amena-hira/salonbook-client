"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

const UserMenu = ({ user }) => {
  const router = useRouter();
  const dashboardPath = user?.role === "admin" ? "/dashboard/admin" : "/dashboard/customer";
  const initials = user?.name
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  return (
    <DropdownMenu>
    <DropdownMenuTrigger
      aria-label="Open user menu"
      className="flex items-center rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-cream sm:gap-2"
    >
      <Avatar className="size-10 border border-cream/40">
        {user?.image && <AvatarImage src={user.image} alt={user.name || "User profile"} />}
        <AvatarFallback className="bg-[#c9aa95] font-heading font-semibold text-charcoal">
          {initials}
        </AvatarFallback>
      </Avatar>
      <ChevronDown className="hidden size-5 text-white sm:block" aria-hidden="true" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      sideOffset={18}
      className="w-72 rounded-xl bg-white p-4 text-charcoal shadow-xl"
    >
      <div className="px-3 pb-4 pt-1">
        <p className="text-lg font-semibold">{user?.name || "SalonBook User"}</p>
        <p className="text-sm text-ash">{user?.email}</p>
      </div>
      <DropdownMenuSeparator className="mx-1 my-0 bg-[#e5e2dd]" />
      <div className="py-2">
        <DropdownMenuItem
          onClick={() => router.push(dashboardPath)}
          className="cursor-pointer gap-4 rounded-lg px-3 py-2.5 text-base font-medium"
        >
          <LayoutDashboard className="size-5" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-4 rounded-lg px-3 py-2.5 text-base font-medium">
          <UserRound className="size-5" />
          My Profile
        </DropdownMenuItem>
      </div>
      <DropdownMenuSeparator className="mx-1 my-0 bg-[#e5e2dd]" />
      <DropdownMenuItem
        variant="destructive"
        className="mt-2 cursor-pointer gap-4 rounded-lg px-3 py-2.5 text-base font-medium"
        onClick={handleSignOut}
      >
        <LogOut className="size-5" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
