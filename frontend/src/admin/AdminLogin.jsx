import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

export const AdminLogin = () => {
  const [email, setEmail] = useState("admin@cubeai.com");
  const [password, setPassword] = useState("Admin@Cube2026!");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.detail || "Invalid administrative credentials. Please verify your email and password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-2xl relative">
          
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/cube_logo.png"
                alt="CubeAI Solutions"
                className="h-11 w-auto mx-auto object-contain"
              />
            </Link>
            <h1 className="text-2xl font-extrabold text-[#0B1220] tracking-tight">
              Cube AI Command Center
            </h1>
            <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              Protected Administrative Portal
            </p>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 mb-6 text-xs font-mono text-blue-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Seeded Credentials:</span>
              <span>admin@cubeai.com // Admin@Cube2026!</span>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs mb-6 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                ADMINISTRATOR EMAIL
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cubeai.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                SECURITY PASSPHRASE
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-blue-600 transition-colors">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
