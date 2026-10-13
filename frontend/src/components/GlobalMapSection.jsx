import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, Activity, CheckCircle, Server } from "lucide-react";

export const GlobalMapSection = () => {
  const [activeRegion, setActiveRegion] = useState("all");

  const hubs = [
    {
      id: "us-west",
      name: "Silicon Valley",
      country: "USA",
      region: "North America",
      role: "Global AI Core & Edge Accelerators",
      latency: "18 ms",
      uptime: "99.999%",
      x: "19%",
      y: "36%",
    },
    {
      id: "us-east",
      name: "New York",
      country: "USA",
      region: "North America",
      role: "FinTech & Low-Latency Quantitative Node",
      latency: "22 ms",
      uptime: "99.995%",
      x: "28%",
      y: "34%",
    },
    {
      id: "eu-west",
      name: "London & Frankfurt",
      country: "Europe",
      region: "Europe",
      role: "Sovereign GDPR & Financial Mesh",
      latency: "24 ms",
      uptime: "99.995%",
      x: "50%",
      y: "28%",
    },
    {
      id: "in-core",
      name: "Bengaluru",
      country: "India",
      region: "India",
      role: "Global Engineering & Innovation Core",
      latency: "28 ms",
      uptime: "99.995%",
      x: "69%",
      y: "52%",
      isHeadquarters: true,
    },
    {
      id: "apac-east",
      name: "Tokyo & Singapore",
      country: "Asia Pacific",
      region: "Asia Pacific",
      role: "Autonomous Logistics & Edge Vision Cluster",
      latency: "32 ms",
      uptime: "99.990%",
      x: "82%",
      y: "48%",
    },
  ];

  const regions = [
    { id: "all", label: "All Global Hubs", count: "128 Nodes" },
    { id: "North America", label: "North America", count: "Silicon Valley, New York" },
    { id: "Europe", label: "Europe", count: "London, Frankfurt" },
    { id: "India", label: "India", count: "Bengaluru Core Hub" },
    { id: "Asia Pacific", label: "Asia Pacific", count: "Tokyo, Singapore" },
  ];

  const filteredHubs =
    activeRegion === "all"
      ? hubs
      : hubs.filter((h) => h.region === activeRegion);

  return (
    <section className="relative py-24 sm:py-28 bg-[#090E24] text-white border-y border-blue-900/40 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs sm:text-sm font-bold font-mono tracking-widest uppercase text-[#60A5FA] mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#38BDF8]" />
              <span>GLOBAL DEPLOYMENT FOOTPRINT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Enterprise Infrastructure &amp; Active Nodes
            </h2>
          </div>
          
          <p className="text-slate-300 max-w-md text-sm sm:text-base leading-relaxed">
            Delivering high-availability, low-latency AI inferencing and deterministic data streaming across interconnected continents.
          </p>
        </div>

        {/* =========================================================================
            Interactive World Map with Pulsing Location Pins (Frame 026 in video)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: Deep Navy World Map Graphic */}
          <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[440px] rounded-3xl bg-[#0F172A] border border-white/10 p-6 sm:p-8 flex items-center justify-center overflow-hidden shadow-2xl">
            {/* SVG Stylized World Map Silhouette */}
            <svg
              className="w-full h-full opacity-35"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* North America */}
              <path
                d="M150,80 Q220,70 280,110 T320,180 Q280,240 220,260 T160,220 Q120,160 150,80 Z"
                fill="#2563EB"
              />
              {/* South America */}
              <path
                d="M260,280 Q320,300 330,370 T280,460 Q240,420 230,350 Z"
                fill="#1D4ED8"
              />
              {/* Europe */}
              <path
                d="M480,90 Q540,80 560,130 T510,180 Q460,160 480,90 Z"
                fill="#3B82F6"
              />
              {/* Africa */}
              <path
                d="M490,200 Q560,210 570,300 T510,400 Q450,320 490,200 Z"
                fill="#1E40AF"
              />
              {/* Asia */}
              <path
                d="M580,70 Q750,60 820,140 T780,260 Q660,250 580,180 Z"
                fill="#2563EB"
              />
              {/* India */}
              <path
                d="M660,210 Q710,220 700,280 T660,310 Q640,260 660,210 Z"
                fill="#60A5FA"
              />
              {/* Australia */}
              <path
                d="M780,330 Q860,320 870,390 T800,430 Q750,380 780,330 Z"
                fill="#1D4ED8"
              />
            </svg>

            {/* Glowing Connecting Network Arcs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 28 34 Q 40 20 50 28" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2,2" fill="none" opacity="0.6" />
              <path d="M 50 28 Q 60 38 69 52" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2,2" fill="none" opacity="0.6" />
              <path d="M 69 52 Q 76 50 82 48" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2,2" fill="none" opacity="0.6" />
            </svg>

            {/* Glowing Location Pins */}
            {hubs.map((hub) => (
              <div
                key={hub.id}
                style={{ left: hub.x, top: hub.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-7 w-7 rounded-full opacity-75 ${hub.isHeadquarters ? "bg-amber-400" : "bg-[#38BDF8]"}`} />
                  <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white shadow-lg ${hub.isHeadquarters ? "bg-amber-400" : "bg-[#2563EB]"}`} />
                </div>

                {/* Tooltip on Hover */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none whitespace-nowrap">
                  <div className="px-3 py-2 rounded-xl bg-slate-900/95 border border-white/20 text-white shadow-xl text-xs backdrop-blur-md">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{hub.name} ({hub.country})</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">{hub.role}</div>
                    <div className="text-[10px] text-[#60A5FA] font-mono mt-1 font-bold">
                      Latency: {hub.latency} • SLA: {hub.uptime}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Status Legend Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ALL REGIONS OPERATIONAL</span>
              </div>
              <div>
                <span>P99 GLOBAL LATENCY: &lt;32.4ms</span>
              </div>
            </div>
          </div>

          {/* Right: Regional Office & Hub Selector (Frame 026 in video) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-[#0F172A] rounded-3xl border border-white/10 p-5 sm:p-6 space-y-3">
            <div className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-2">
              REGIONAL CLUSTERS
            </div>

            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setActiveRegion(reg.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border flex items-center justify-between group ${
                  activeRegion === reg.id
                    ? "bg-[#1E3A8A] border-[#60A5FA] text-white shadow-md"
                    : "bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/15"
                }`}
              >
                <div>
                  <div className="text-sm font-bold group-hover:text-white transition-colors">
                    {reg.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-normal">
                    {reg.count}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-slate-400">Online</span>
                </div>
              </button>
            ))}

            <div className="pt-4 border-t border-white/10">
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <Server className="w-3.5 h-3.5" />
                <span>Deploy Sovereign Node</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GlobalMapSection;
