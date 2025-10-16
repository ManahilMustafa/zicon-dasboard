
import Sidebar from "@/components/sidebar"
import Topbar from "@/components/topbar"

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-dvh flex bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-auto">{children}</main>
      </div>
    </div>
  )
}
