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

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger
      aria-label="Open user menu"
      className="flex items-center gap-2 rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-cream"
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-[#c9aa95] font-heading text-sm font-semibold text-charcoal">
        SA
      </span>
      <ChevronDown className="size-5 text-white" aria-hidden="true" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      sideOffset={18}
      className="w-72 rounded-xl bg-white p-4 text-charcoal shadow-xl"
    >
      <div className="px-3 pb-4 pt-1">
        <p className="text-lg font-semibold">Sarah Ahmed</p>
        <p className="text-sm text-ash">sarah.ahmed@example.com</p>
      </div>
      <DropdownMenuSeparator className="mx-1 my-0 bg-[#e5e2dd]" />
      <div className="py-2">
        <DropdownMenuItem className="cursor-pointer gap-4 rounded-lg px-3 py-2.5 text-base font-medium">
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
      >
        <LogOut className="size-5" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu;
