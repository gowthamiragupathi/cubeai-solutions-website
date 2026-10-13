import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Boxes,
  Shield,
  Eye,
  LineChart,
  Radio,
  Factory,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export const SolutionsShowcase = () => {
  const [activeTab, setActiveTab] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const solutions = [
    {
      id: "supply-chain",
      category: "Autonomous Logistics & Supply Chain",
      shortTitle: "Supply Chain & Logistics",
      headline: "Dynamic multi-agent rerouting and autonomous fleet optimization",
      description:
        "Continuous AIS maritime and ground fleet simulation loops with automated demurrage mitigation, predictive port congestion rerouting, and transformer-based multi-modal freight forecasting.",
      icon: Boxes,
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Route Deviations", value: "-34%" },
        { label: "Fuel Cost Saved", value: "$18.2M" },
        { label: "Telemetry Latency", value: "<45s" },
      ],
      points: [
        "Continuous AIS maritime & fleet simulation loops",
        "Automated demurrage mitigation & port congestion rerouting",
        "Transformer-based multi-modal freight rate forecasting",
      ],
    },
    {
      id: "healthcare-biotech",
      category: "Healthcare & Life Sciences",
      shortTitle: "Healthcare & Life Sciences",
      headline: "Air-gapped sovereign LLM matrix with zero-loss retrieval guarantees",
      description:
        "Deploying local open-weight foundation models on sovereign hardware. Hybrid sparse-dense retrieval with cross-encoder mathematical verification and deterministic audit trails meeting strict FDA and HIPAA regulatory compliance.",
      icon: Shield,
      image:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Research Acceleration", value: "+65%" },
        { label: "Indexed Dossiers", value: "4.2M+" },
        { label: "Citation Precision", value: "99.8%" },
      ],
      points: [
        "Local open-weight foundation models on sovereign hardware",
        "Hybrid sparse-dense retrieval with cross-encoder verification",
        "Deterministic audit trails meeting FDA & HIPAA compliance",
      ],
    },
    {
      id: "manufacturing-vision",
      category: "Advanced Manufacturing & Robotics",
      shortTitle: "Manufacturing & Robotics",
      headline: "Micro-second optical quality inspection running on assembly lines",
      description:
        "Edge TensorRT accelerators embedded directly into robotic pick-and-place arms. Sub-micron defect classification on silicon wafers and instant WebSocket telemetry streams triggering automated reject diverters.",
      icon: Factory,
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Inference Speed", value: "120 FPS" },
        { label: "Defect Escape Rate", value: "0.003%" },
        { label: "Scrap Reduction", value: "$42M" },
      ],
      points: [
        "Edge TensorRT accelerators embedded into robotic arms",
        "Sub-micron defect classification on silicon wafers and PCBs",
        "Instant WebSocket telemetry triggering automated diverters",
      ],
    },
    {
      id: "fintech-risk",
      category: "Banking & Financial Services",
      shortTitle: "Banking & Financial Services",
      headline: "Continuous stochastic Monte Carlo simulations protecting billions in capital",
      description:
        "Decentralized agent swarms modeling cross-asset contagion in real time, with automated margin liquidation safeguards, liquidity depth analysis, and sub-millisecond stress testing against systemic black swan events.",
      icon: LineChart,
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Protected Capital", value: "$3.4B" },
        { label: "Scenarios / Sec", value: "100k+" },
        { label: "Telemetry Interval", value: "Real-Time" },
      ],
      points: [
        "Decentralized agent swarms modeling cross-asset contagion",
        "Automated margin liquidation safeguards & liquidity depth",
        "Sub-millisecond stress testing against systemic events",
      ],
    },
    {
      id: "telecom-networks",
      category: "Telecom & Edge Digital Platforms",
      shortTitle: "Telecom & Edge Networks",
      headline: "Next-gen digital platforms and differentiated offerings for 5G technologies",
      description:
        "Dynamic spectrum allocation algorithms, predictive cell tower maintenance swarms, and autonomous QoS packet prioritization maintaining ultra-low latency across nationwide edge distribution fabrics.",
      icon: Radio,
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Packet QoS Reliability", value: "99.999%" },
        { label: "Edge Latency", value: "<12ms" },
        { label: "Autonomous Reroutes", value: "2.4M/day" },
      ],
      points: [
        "Dynamic spectrum allocation and predictive maintenance",
        "Autonomous QoS packet prioritization for edge distribution",
        "Real-time cell tower fault isolation and self-healing telemetry",
      ],
    },
    {
      id: "smart-utilities",
      category: "Energy & Smart Utilities",
      shortTitle: "Energy & Utilities",
      headline: "AI-driven grid transformation moving from reactive to predictive control at scale",
      description:
        "Predictive renewable load balancing, harmonic fault detection across high-voltage transmission lines, and automated demand-response dispatchers minimizing carbon intensity while stabilizing peak load surges.",
      icon: Zap,
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Peak Load Shaved", value: "-18%" },
        { label: "Fault Prevention", value: "94.2%" },
        { label: "Carbon Optimization", value: "240k Tons" },
      ],
      points: [
        "Predictive renewable load balancing across regional grids",
        "Harmonic fault detection across high-voltage transmission lines",
        "Automated demand-response dispatchers stabilizing peak surges",
      ],
    },
  ];

  // 10-second auto-rotate timer
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % solutions.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [isPaused, solutions.length]);

  const goToPrev = () => {
    setActiveTab((prev) => (prev === 0 ? solutions.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveTab((prev) => (prev + 1) % solutions.length);
  };

  const current = solutions[activeTab];

  return (
    <section
      id="solutions"
      className="relative py-24 sm:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] font-bold text-xs mb-3 shadow-2xs font-mono tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>INDUSTRY APPLICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Mission-Critical Solutions In Action
            </h2>
          </div>
          
          <p className="text-[#475569] max-w-md text-sm sm:text-base leading-relaxed">
            Deploying applied intelligence engineered to solve high-stakes operational constraints across global enterprise verticals.
          </p>
        </div>

        {/* =========================================================================
            Reference Video Layout (Frame 006):
            Two-column layout:
            - Left: Vertical list of industries with icons, active state & arrow indicator
            - Right: Featured Showcase Card with Image on top, Deep Navy Card below
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Vertical Interactive Industries List */}
          <div className="lg:col-span-5 h-fit flex flex-col gap-1.5 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-3 sm:p-4">
            {solutions.map((sol, index) => {
              const Icon = sol.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left px-5 py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? "bg-[#EFF6FF] text-[#2563EB] font-bold shadow-2xs"
                      : "text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#2563EB] text-white shadow-sm"
                          : "bg-[#F1F5F9] text-[#64748B] group-hover:text-[#2563EB] group-hover:bg-[#EFF6FF]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm sm:text-base font-semibold block leading-snug">
                        {sol.shortTitle}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-200 ${
                      isActive
                        ? "text-[#2563EB] translate-x-1 opacity-100"
                        : "text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Featured Industry Showcase Card */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl bg-white"
              >
                {/* Top Image Showcase */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={current.image}
                    alt={current.category}
                    className="w-full h-full object-cover object-center filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] text-xs font-bold font-mono text-[#2563EB] shadow-sm">
                    {current.category}
                  </div>

                  {/* Previous / Next Detail Controls & Position */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-300">
                      0{activeTab + 1} / 0{solutions.length}
                    </span>
                    <button
                      onClick={goToPrev}
                      aria-label="Previous Solution"
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center transition-all shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={goToNext}
                      aria-label="Next Solution"
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center transition-all shadow-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Metrics Bar on Image Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white">
                    {current.stats.map((st, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[11px] text-slate-300 font-medium">{st.label}</div>
                        <div className="text-sm font-extrabold text-[#60A5FA]">{st.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Deep Navy Showcase Container (Reference Video Style) */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold leading-snug tracking-tight text-white mb-3">
                      {current.headline}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                      {current.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {current.points.map((pt, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-white/15 flex items-center justify-between">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-md transition-all duration-200 group"
                    >
                      <span>Explore Solution</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <span className="text-xs font-mono text-slate-400">
                      SLA Guarantee: 99.99%
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SolutionsShowcase;
