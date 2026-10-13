import React from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Mail,
  Sliders,
  Cpu,
  Briefcase,
  FileText,
  LogOut,
  ExternalLink,
  Box,
  ShieldCheck,
} from "lucide-react";

export const AdminLayout = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex items-center gap-3 font-mono text-sm text-blue-400">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
          <span>Verifying Security Clearance...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Contact Enquiries", href: "/admin/enquiries", icon: Mail },
    { label: "Site & Hero Settings", href: "/admin/settings", icon: Sliders },
    { label: "Services Portfolio", href: "/admin/services", icon: Cpu },
    { label: "Projects & Case Studies", href: "/admin/projects", icon: Briefcase },
    { label: "Insights & Articles", href: "/admin/insights", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#0B1220] border-r border-slate-800 flex flex-col justify-between shrink-0 text-slate-300">
        <div>
          {/* Logo & Portal title */}
          <div className="p-6 border-b border-slate-800/80">
            <Link to="/admin" className="inline-flex items-center gap-2 group bg-white px-2.5 py-1.5 rounded-xl shadow-xs">
              <img
                src="/cube_logo.png"
                alt="CubeAI Solutions"
                className="h-7 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 border border-blue-300 text-blue-700 font-bold">
                CMS
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? location.pathname === "/admin"
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">{user?.full_name || "Administrator"}</span>
              <span className="text-[10px] font-mono text-blue-400 block truncate">{user?.email || "admin@cubeai.com"}</span>
            </div>
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              to="/"
              target="_blank"
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={logout}
              className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
