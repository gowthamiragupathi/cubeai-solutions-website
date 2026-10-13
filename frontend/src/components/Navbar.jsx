import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Brain,
  Code2,
  BarChart3,
  Cloud,
  Boxes,
  Shield,
  Cpu,
  LineChart,
} from "lucide-react";

// Social Icons as clean inline SVGs
const LinkedInIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const GitHubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const XIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'solutions' | null
  const [mobileExpanded, setMobileExpanded] = useState({ services: true, solutions: false });
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Main navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services", hasDropdown: true, dropdownKey: "services" },
    { name: "Solutions", href: "/#solutions", hasDropdown: true, dropdownKey: "solutions" },
    { name: "Analytics", href: "/#analytics" },
    { name: "Projects", href: "/projects" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ];

  // Exactly 5 Service Rows matching reference
  const serviceRows = [
    {
      title: "AI & Machine Learning",
      desc: "Predictive neural architectures & vision models",
      href: "/services",
      icon: Brain,
    },
    {
      title: "Generative AI & Autonomous Agents",
      desc: "Private RAG pipelines, fine-tuned LLMs & agent swarms",
      href: "/services",
      icon: Sparkles,
    },
    {
      title: "Web Development",
      desc: "Ultra-fast React, Vite & Next.js enterprise portals",
      href: "/services",
      icon: Code2,
    },
    {
      title: "Data Analytics",
      desc: "Real-time streaming telemetry & predictive BI",
      href: "/#analytics",
      icon: BarChart3,
    },
    {
      title: "Cloud Solutions",
      desc: "Sovereign zero-trust cloud & edge AI clusters",
      href: "/services",
      icon: Cloud,
    },
  ];

  // Solutions rows
  const solutionsList = [
    {
      title: "Predictive Autonomous Logistics",
      category: "Global Supply Chain",
      tagline: "Route simulation & demurrage mitigation",
      href: "/#solutions",
      icon: Boxes,
    },
    {
      title: "Sovereign Generative Knowledge Mesh",
      category: "Healthcare & Biotech",
      tagline: "Air-gapped private LLM matrix with zero data loss",
      href: "/#solutions",
      icon: Shield,
    },
    {
      title: "Neuromorphic Defect Telemetry",
      category: "Semiconductor",
      tagline: "Sub-millisecond computer vision inspection",
      href: "/#solutions",
      icon: Cpu,
    },
    {
      title: "Autonomous Settlement Engine",
      category: "FinTech & Markets",
      tagline: "High-frequency atomic clearing loops",
      href: "/#solutions",
      icon: LineChart,
    },
  ];

  const isItemActive = (item) => {
    if (activeDropdown === item.dropdownKey) return true;
    if (item.name === "Home") {
      return location.pathname === "/" && !location.hash;
    }
    if (item.href.startsWith("/#")) {
      const hash = item.href.replace("/", "");
      return location.pathname === "/" && location.hash === hash;
    }
    return location.pathname === item.href;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      ref={navRef}
      className="header-permanent-light fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 overflow-visible"
    >
      {/* =========================================================================
          1. SLIM FULL-WIDTH LIGHT ANNOUNCEMENT BAR
         ========================================================================= */}
      <div
        className={`announcement-bar w-full bg-white border-b border-[#DBEAFE] text-xs text-[#475569] transition-all duration-300 overflow-hidden relative ${
          isScrolled ? "max-h-0 opacity-0 py-0" : "max-h-12 opacity-100 py-2"
        }`}
        style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #DBEAFE" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 relative z-10">
          {/* Left: Blue sparkle in rounded container + text */}
          <div className="flex items-center gap-2.5 truncate">
            <span className="w-5 h-5 rounded-md bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            </span>
            <span className="font-medium text-[#0F172A] text-[12px] truncate">
              Building intelligent solutions for a smarter tomorrow.
            </span>
          </div>

          {/* Right: Contact information & socials with thin vertical dividers */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0 text-[#475569]">
            {/* Email */}
            <a
              href="mailto:contact@cubeai.com"
              className="flex items-center gap-1.5 text-[#475569] hover:text-[#2563EB] transition-colors"
              title="Direct Email"
            >
              <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="font-mono text-[11px]">contact@cubeai.com</span>
            </a>

            <div className="h-3 w-px bg-[#CBD5E1]" />

            {/* Phone */}
            <a
              href="tel:+18005552823"
              className="flex items-center gap-1.5 text-[#475569] hover:text-[#2563EB] transition-colors"
              title="Enterprise Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="font-mono text-[11px]">+1 (800) 555-CUBE</span>
            </a>

            <div className="h-3 w-px bg-[#CBD5E1] hidden lg:block" />

            {/* Location */}
            <div className="hidden lg:flex items-center gap-1.5 text-[#475569]">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="text-[11px]">Silicon Valley &amp; Global</span>
            </div>

            <div className="h-3 w-px bg-[#CBD5E1]" />

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 text-[#64748B]">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#2563EB] transition-colors p-0.5"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#2563EB] transition-colors p-0.5"
                title="GitHub"
                aria-label="GitHub Repository"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#2563EB] transition-colors p-0.5"
                title="X (Twitter)"
                aria-label="X Profile"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN FLOATING WHITE NAVIGATION CONTAINER (OVERFLOW VISIBLE)
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative overflow-visible">
        <div
          className="navbar-card bg-white border border-[#DBEAFE] rounded-[22px] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 relative overflow-visible"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #DBEAFE",
            boxShadow: "0 6px 24px rgba(37, 99, 235, 0.08)",
          }}
        >
          
          {/* Left: CubeAI Solutions Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center shrink-0 group focus:outline-none"
              title="CubeAI Solutions — Home"
            >
              <img
                src="/cube_logo.png"
                alt="CubeAI Solutions"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Subtle vertical divider separating logo from navigation */}
            <div className="hidden xl:block h-6 w-px bg-[#DBEAFE] ml-4 mr-2" />
          </div>

          {/* Centre: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 relative overflow-visible">
            {navItems.map((item) => {
              const active = isItemActive(item);
              const isDropdownOpen = activeDropdown === item.dropdownKey;

              return (
                <div
                  key={item.name}
                  className="relative overflow-visible"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.dropdownKey)}
                  onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault();
                        setActiveDropdown(isDropdownOpen ? null : item.dropdownKey);
                      }
                    }}
                    className={`nav-link inline-flex items-center text-xs xl:text-sm font-medium px-3 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 select-none ${
                      active
                        ? "nav-item-active bg-[#EFF6FF] text-[#2563EB] font-semibold border border-[#DBEAFE]"
                        : "nav-item-inactive text-[#0F172A] hover:text-[#2563EB] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    <span>{item.name}</span>

                    {/* Small Chevron Arrow */}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-[#2563EB]" : "text-[#64748B]"
                        }`}
                      />
                    )}
                  </a>

                  {/* =========================================================
                      PREMIUM SERVICES DROPDOWN (SOLID OPAQUE WHITE PANEL)
                     ========================================================= */}
                  {item.dropdownKey === "services" && (
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="dropdown-panel absolute top-full left-0 xl:left-[-40px] mt-3.5 w-[720px] max-w-[calc(100vw-2rem)] rounded-[20px] p-5 sm:p-6 z-[1000] before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #DBEAFE",
                            boxShadow: "0 16px 48px rgba(37, 99, 235, 0.14)",
                            backdropFilter: "none",
                            WebkitBackdropFilter: "none",
                          }}
                        >
                          <div className="flex items-stretch gap-6">
                            {/* 5 Distinct Service Rows */}
                            <div className="flex-1 min-w-0 space-y-1.5">
                              {serviceRows.map((svc) => {
                                const IconComponent = svc.icon;
                                return (
                                  <Link
                                    key={svc.title}
                                    to={svc.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EFF6FF] border border-transparent hover:border-[#DBEAFE] transition-all duration-200"
                                  >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                      {/* Blue Icon inside light-blue rounded-square container */}
                                      <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-105 transition-all duration-200 shadow-xs">
                                        <IconComponent className="w-5 h-5" />
                                      </div>
                                      <div className="text-left min-w-0">
                                        <div className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                                          {svc.title}
                                        </div>
                                        <div className="text-xs text-[#64748B] mt-0.5 leading-snug">
                                          {svc.desc}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right Chevron */}
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-3" />
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Separate Contained Visual Area on the Right */}
                            <div className="hidden md:flex w-[210px] shrink-0 flex-col justify-between p-4 rounded-xl bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF] border border-[#DBEAFE]">
                              <div>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#DBEAFE] text-[10px] font-mono font-semibold text-[#2563EB] uppercase tracking-wider mb-2">
                                  <Sparkles className="w-3 h-3 text-[#2563EB]" />
                                  <span>Architecture</span>
                                </div>
                                <div className="text-xs font-bold text-[#0F172A]">
                                  Enterprise AI Stack
                                </div>
                                <p className="text-[11px] text-[#64748B] mt-1 leading-snug">
                                  Deterministic AI architectures engineered for mission-critical enterprise workloads.
                                </p>
                              </div>

                              {/* Clean Contained Cube Illustration */}
                              <div className="my-3 flex items-center justify-center">
                                <div className="w-20 h-20 relative flex items-center justify-center">
                                  <svg viewBox="0 0 200 200" fill="none" className="w-full h-full drop-shadow-xs">
                                    <path d="M100 20L170 60V140L100 180L30 140V60L100 20Z" stroke="#2563EB" strokeWidth="5" strokeLinejoin="round" fill="#DBEAFE" fillOpacity="0.4" />
                                    <path d="M100 20V100M100 100L170 140M100 100L30 140" stroke="#3B82F6" strokeWidth="4" strokeLinejoin="round" />
                                    <circle cx="100" cy="100" r="9" fill="#2563EB" />
                                  </svg>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-[#DBEAFE]/80 text-[10px] font-mono text-[#2563EB] flex items-center justify-between">
                                <span>SLA 99.995%</span>
                                <span className="font-semibold">ACTIVE</span>
                              </div>
                            </div>
                          </div>

                          {/* Dropdown Footer Divider & Link */}
                          <div className="mt-4 pt-3.5 border-t border-[#DBEAFE] px-1 flex items-center justify-between text-xs">
                            <span className="text-[#64748B] font-medium">
                              Need custom AI engineering?
                            </span>
                            <Link
                              to="/contact"
                              onClick={() => setActiveDropdown(null)}
                              className="text-[#2563EB] font-bold hover:text-[#1D4ED8] hover:underline inline-flex items-center gap-1 group"
                            >
                              <span>Consult Architects</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* =========================================================
                      PREMIUM SOLUTIONS DROPDOWN (SOLID OPAQUE WHITE PANEL)
                     ========================================================= */}
                  {item.dropdownKey === "solutions" && (
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="dropdown-panel absolute top-full left-0 xl:left-[-30px] mt-3.5 w-[440px] max-w-[calc(100vw-2rem)] rounded-[20px] p-5 sm:p-6 z-[1000] before:content-[''] before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #DBEAFE",
                            boxShadow: "0 16px 48px rgba(37, 99, 235, 0.14)",
                            backdropFilter: "none",
                            WebkitBackdropFilter: "none",
                          }}
                        >
                          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#DBEAFE] px-1">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#2563EB] font-bold">
                              Enterprise Sector Solutions
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              PROVEN IMPACT
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {solutionsList.map((sol) => {
                              const IconComponent = sol.icon;
                              return (
                                <a
                                  key={sol.title}
                                  href={sol.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EFF6FF] border border-transparent hover:border-[#DBEAFE] transition-all duration-200"
                                >
                                  <div className="flex items-center gap-3.5 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200 shadow-xs">
                                      <IconComponent className="w-5 h-5" />
                                    </div>
                                    <div className="text-left min-w-0">
                                      <div className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                                        {sol.title}
                                      </div>
                                      <div className="text-xs text-[#64748B] mt-0.5 leading-snug">
                                        {sol.category} • {sol.tagline}
                                      </div>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
                                </a>
                              );
                            })}
                          </div>

                          {/* Solutions Footer */}
                          <div className="mt-3.5 pt-3 border-t border-[#DBEAFE] px-1 flex items-center justify-between text-xs">
                            <span className="text-[#64748B] font-medium">
                              Explore industry matrix
                            </span>
                            <a
                              href="/#solutions"
                              onClick={() => setActiveDropdown(null)}
                              className="text-[#2563EB] font-bold hover:text-[#1D4ED8] hover:underline inline-flex items-center gap-1 group"
                            >
                              <span>View All Deployments</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right-Side Utility Controls: CMS & Get a Quote */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* CMS Button */}
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] text-xs font-semibold tracking-wide transition-all duration-200 shadow-xs hover:shadow-sm"
              style={{ backgroundColor: "#FFFFFF" }}
              title="Access Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>CMS</span>
            </Link>

            {/* Get a Quote Button */}
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] hover:bg-blue-100 transition-colors ml-1 focus:outline-none"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. RESPONSIVE MOBILE NAVIGATION DRAWER
         ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-[#DBEAFE] shadow-2xl overflow-hidden"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-3">
              {/* Mobile Quick Action Strip */}
              <div className="flex items-center justify-between pb-3 border-b border-[#DBEAFE]">
                <span className="text-xs font-semibold text-[#0F172A]">CubeAI Solutions</span>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#2563EB] text-[#2563EB] text-xs font-semibold"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CMS Portal</span>
                </Link>
              </div>

              {/* Navigation Items List */}
              <div className="flex flex-col divide-y divide-slate-100">
                {navItems.map((item) => {
                  const active = isItemActive(item);

                  if (item.hasDropdown) {
                    const isExp = mobileExpanded[item.dropdownKey];
                    return (
                      <div key={item.name} className="py-2">
                        <button
                          onClick={() =>
                            setMobileExpanded((prev) => ({
                              ...prev,
                              [item.dropdownKey]: !prev[item.dropdownKey],
                            }))
                          }
                          className="w-full flex items-center justify-between py-1 text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#64748B] transition-transform ${
                              isExp ? "rotate-180 text-[#2563EB]" : ""
                            }`}
                          />
                        </button>

                        {/* Accordion children */}
                        {isExp && (
                          <div className="pl-2 pt-2 pb-1 space-y-2">
                            {item.dropdownKey === "services" &&
                              serviceRows.map((svc) => (
                                <Link
                                  key={svc.title}
                                  to={svc.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#DBEAFE] hover:bg-[#EFF6FF] text-xs text-[#0F172A] hover:text-[#2563EB] transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                                    <svc.icon className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="font-bold text-[#0F172A]">{svc.title}</div>
                                    <div className="text-[10px] text-[#64748B]">{svc.desc}</div>
                                  </div>
                                </Link>
                              ))}

                            {item.dropdownKey === "solutions" &&
                              solutionsList.map((sol) => (
                                <a
                                  key={sol.title}
                                  href={sol.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#DBEAFE] hover:bg-[#EFF6FF] text-xs text-[#0F172A] hover:text-[#2563EB] transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                                    <sol.icon className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="font-bold text-[#0F172A]">{sol.title}</div>
                                    <div className="text-[10px] text-[#64748B]">{sol.category} • {sol.tagline}</div>
                                  </div>
                                </a>
                              ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-3 text-sm font-semibold transition-colors ${
                        active
                          ? "text-[#2563EB] bg-[#EFF6FF] px-3 rounded-lg border border-[#DBEAFE]"
                          : "text-[#0F172A] hover:text-[#2563EB] hover:bg-[#F1F5F9] px-3 rounded-lg"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="pt-3">
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
