"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  LayoutGrid,
  Grid2X2,
  Home,
  LogOut,
  Scissors,
  UserRound,
  UsersRound,
  Wrench,
  CreditCard
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const customerLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Overview", href: "/dashboard/customer", icon: LayoutGrid },
  { label: "My Appointments", href: "/dashboard/customer/my-appointments", icon: CalendarDays },
  { label: "My Profile", href: "/dashboard/my-profile", icon: UserRound },
];

const adminLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutGrid },
  { label: "Services", href: "/dashboard/admin/manage-services", icon: Wrench },
  { label: "Appointment Requests", href: "/dashboard/admin/appointments", icon: CalendarDays },
  { label: "Customers", href: "/dashboard/admin/manage-users", icon: UsersRound },
  { label: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
  { label: "My Profile", href: "/dashboard/my-profile", icon: UserRound },
];

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const links = isAdmin ? adminLinks : customerLinks;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <Sidebar className="border-0" collapsible="offcanvas">
      <SidebarHeader className="px-4 pb-6 pt-5">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Scissors className="size-8 text-[#caa65d]" strokeWidth={1.5} aria-hidden="true" />
          <span className="font-heading text-2xl font-semibold tracking-tight">SalonBook</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 pb-2 text-sm text-white/85">
            {isAdmin ? "Admin Panel" : "Customer"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {links.map(({ label, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} prefetch={false} />}
                    isActive={pathname === href}
                    tooltip={label}
                    className="h-11 gap-3 rounded-lg px-3 text-sm font-medium text-white hover:bg-white/10 hover:text-white data-active:bg-[#fff5f0] data-active:text-charcoal"
                  >
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto px-4 pb-5">
        <div className="border-t border-white/15 pt-4">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-10 w-full items-center gap-3 rounded-lg px-2 text-left text-sm font-medium text-red-300 transition-colors hover:bg-red-300/10"
          >
            <LogOut className="size-5" strokeWidth={1.8} aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
