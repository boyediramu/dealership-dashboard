import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import VehicleInventory from "@/pages/VehicleInventory";
import UsedVehicleAppraisal from "@/pages/UsedVehicleAppraisal";
import SalesLeads from "@/pages/SalesLeads";
import Deals from "@/pages/Deals";
import ServiceScheduling from "@/pages/ServiceScheduling";
import PartsInventory from "@/pages/PartsInventory";
import Customers from "@/pages/Customers";
import Reports from "@/pages/Reports";
import SettingsPage from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vehicles" element={<VehicleInventory />} />
              <Route path="/appraisal" element={<UsedVehicleAppraisal />} />
              <Route path="/leads" element={<SalesLeads />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/service" element={<ServiceScheduling />} />
              <Route path="/parts" element={<PartsInventory />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
