import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";

// Public Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import InsightsPage from "./pages/InsightsPage";
import ContactPage from "./pages/ContactPage";

// Admin CMS Components
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminEnquiries from "./admin/AdminEnquiries";
import AdminSettings from "./admin/AdminSettings";
import AdminServices from "./admin/AdminServices";
import AdminProjects from "./admin/AdminProjects";
import AdminInsights from "./admin/AdminInsights";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

// Layout wrapper for public website with Navbar & Footer
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0F172A] selection:bg-[#2563EB] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Website Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Admin CMS Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin CMS Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="insights" element={<AdminInsights />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
