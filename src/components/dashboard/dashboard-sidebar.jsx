"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarDays,
  Flower2,
  Grid2X2,
  Home,
  LogOut,
  Scissors,
  UserRound,
  UsersRound,
  Wrench,
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
  { label: "Overview", href: "/dashboard/customer", icon: Home },
  { label: "My Appointments", href: "/dashboard/customer/appointments", icon: CalendarDays },
  { label: "My Profile", href: "/dashboard/customer/profile", icon: UserRound },
];

const adminLinks = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Services", href: "/dashboard/admin/services", icon: Wrench },
  { label: "Categories", href: "/dashboard/admin/categories", icon: Grid2X2 },
  { label: "Appointment Requests", href: "/dashboard/admin/appointments", icon: CalendarDays },
  { label: "Customers", href: "/dashboard/admin/customers", icon: UsersRound },
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
          router.push("/");
        },
      },
    });
  };

  return (
    <Sidebar className="border-0" collapsible="offcanvas">
      <SidebarHeader className="px-5 pb-8 pt-7">
        <Link href="/" className="flex items-center gap-3 text-white">
          <Scissors className="size-11 text-[#caa65d]" strokeWidth={1.5} aria-hidden="true" />
          <span className="font-heading text-3xl font-semibold tracking-tight">SalonBook</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 pb-3 text-base text-white/85">
            {isAdmin ? "Admin Panel" : "Customer"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {links.map(({ label, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} />}
                    isActive={pathname === href}
                    tooltip={label}
                    className="h-14 gap-5 rounded-xl px-4 text-base font-medium text-white hover:bg-white/10 hover:text-white data-active:bg-[#fff5f0] data-active:text-charcoal"
                  >
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto px-5 pb-8">
        <div className="border-t border-white/15 pt-5">
          <button
            type="button"
            onClick={handleSignOut}
            className="flex h-12 w-full items-center gap-4 rounded-lg px-3 text-left text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            <LogOut className="size-6" strokeWidth={1.8} aria-hidden="true" />
            Log Out
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
