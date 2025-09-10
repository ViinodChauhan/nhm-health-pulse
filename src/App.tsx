import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import Index from "./pages/Index";
import BeneficiaryManagement from "./pages/BeneficiaryManagement";
import NutritionMonitoring from "./pages/NutritionMonitoring";
import DiagnosticResults from "./pages/DiagnosticResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <DashboardHeader />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/beneficiaries" element={<BeneficiaryManagement />} />
                  <Route path="/beneficiaries/search" element={<BeneficiaryManagement />} />
                  <Route path="/health/nutrition" element={<NutritionMonitoring />} />
                  <Route path="/health/medicine" element={<NutritionMonitoring />} />
                  <Route path="/health/diagnostics" element={<DiagnosticResults />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
