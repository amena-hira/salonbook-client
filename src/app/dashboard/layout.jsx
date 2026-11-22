import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardTopbar from "@/components/dashboard/dashboard-topbar";
import { SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }) => (
    <SidebarProvider style={{ "--sidebar-width": "17rem", "--sidebar-width-mobile": "16rem" }}>
      <DashboardSidebar />
      <main className="min-w-0 flex-1 bg-background">
        <DashboardTopbar />
        {children}
      </main>
    </SidebarProvider>
);

export default DashboardLayout;
