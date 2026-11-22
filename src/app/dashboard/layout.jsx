import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }) => (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="min-w-0 flex-1">
        <SidebarTrigger className="m-4" />
        {children}
      </main>
    </SidebarProvider>
);

export default DashboardLayout;
