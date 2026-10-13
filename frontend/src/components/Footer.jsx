import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export const Footer = ({ settings }) => {
  const contactEmail = settings?.contact_email || "contact@cubeai.com";
  const contactPhone = settings?.contact_phone || "+1 (800) 555-CUBE";
  const contactAddress = settings?.contact_address || "Cube AI Innovation Lab, Suite 800, Silicon Corridor";

  return (
    <footer className="relative bg-[#F8FAFC] border-t border-[#E2E8F0] text-[#475569] overflow-hidden">
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-[#E2E8F0]">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#EFF6FF] via-white to-[#EFF6FF] border border-[#DBEAFE] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-100/40 blur-[100px] pointer-events-none" />

          <div>
            <span className="text-xs font-mono text-[#2563EB] uppercase tracking-widest block mb-2 font-bold">
              READY TO SCALE INTELLIGENCE?
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Start Your Enterprise AI Roadmap Today
            </h3>
            <p className="mt-2 text-sm text-[#475569] max-w-xl">
              Schedule a technical feasibility session with our principal engineers and model scientists.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-md shadow-blue-500/25 transition-all group"
            >
              <span>Initiate Consultation</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center group">
              <img
                src="/cube_logo.png"
                alt="CubeAI Solutions"
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#475569] max-w-sm leading-relaxed">
              Pioneering enterprise applied artificial intelligence, high-frequency distributed architectures, and cinematic digital software for visionary organizations worldwide.
            </p>

            {/* System Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] font-mono text-xs text-[#0F172A]">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
              <span className="font-semibold">All Systems Operational (99.995%)</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F172A] font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#2563EB] transition-colors">Company &amp; Mission</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#2563EB] transition-colors">Services Portfolio</Link>
              </li>
              <li>
                <a href="/#analytics" className="hover:text-[#2563EB] transition-colors">Live Analytics</a>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#2563EB] transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#2563EB] transition-colors">Technical Insights</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#2563EB] transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F172A] font-bold mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="hover:text-[#2563EB] transition-colors cursor-pointer">Autonomous Agent Swarms</li>
              <li className="hover:text-[#2563EB] transition-colors cursor-pointer">Private RAG Pipelines</li>
              <li className="hover:text-[#2563EB] transition-colors cursor-pointer">Microsecond Edge Vision</li>
              <li className="hover:text-[#2563EB] transition-colors cursor-pointer">Distributed Microservices</li>
              <li className="hover:text-[#2563EB] transition-colors cursor-pointer">Predictive Telemetry</li>
              <li className="hover:text-[#2563EB] transition-colors cursor-pointer">Zero-Trust Cloud Modernization</li>
            </ul>
          </div>

          {/* Direct Contact info */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F172A] font-bold mb-4">
              Direct Inquiries
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <a href={`mailto:${contactEmail}`} className="hover:text-[#2563EB] transition-colors">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <a href={`tel:${contactPhone}`} className="hover:text-[#2563EB] transition-colors">
                  {contactPhone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                <span className="text-[#475569]">
                  {contactAddress}
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-[#E2E8F0] py-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <div>
            © {new Date().getFullYear()} CubeAI Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#0F172A] cursor-pointer">Security Disclosures</span>
            <span className="hover:text-[#0F172A] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#0F172A] cursor-pointer">Terms of Service</span>
            <Link to="/admin" className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
