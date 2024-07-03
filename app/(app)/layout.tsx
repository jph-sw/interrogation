import { checkAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NextAuthProvider from "@/lib/auth/Provider";
import { TooltipProvider } from "@/components/ui/tooltip";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <main>
      <NextAuthProvider>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 pt-2 overflow-y-auto">
            <Navbar />
            <TooltipProvider>{children}</TooltipProvider>
          </main>
        </div>
      </NextAuthProvider>

      <Toaster richColors />
    </main>
  );
}
