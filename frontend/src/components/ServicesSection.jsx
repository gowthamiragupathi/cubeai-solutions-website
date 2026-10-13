import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Sparkles,
  Globe,
  Code2,
  BarChart3,
  Cpu,
  Cloud,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  LayoutGrid,
} from "lucide-react";

const ICON_MAP = {
  Brain: Brain,
  Sparkles: Sparkles,
  Globe: Globe,
  Code2: Code2,
  BarChart3: BarChart3,
  Cpu: Cpu,
  Cloud: Cloud,
};

const parseList = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try {
    return typeof data === "string" ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const ServicesSection = ({ services = [] }) => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const displayServices = services && services.length > 0 ? services : [
    {
      id: 1,
      title: "AI & Machine Learning",
      slug: "ai-machine-learning",
      tagline: "Predictive Models & Deep Learning Architecture",
      description: "Custom neural networks, predictive algorithms, computer vision, and NLP models engineered for enterprise workflows and mission-critical accuracy.",
      icon_name: "Brain",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      features_json: '["Custom Deep Learning Models", "Edge AI & Real-Time Inferencing", "Predictive Analytics & Forecasting", "Computer Vision Systems"]',
      capabilities_json: '["PyTorch & TensorFlow", "ONNX Optimization", "GPU Cluster Orchestration", "MLOps & Automated Drift Detection"]',
    },
    {
      id: 2,
      title: "Generative AI & Autonomous Agents",
      slug: "generative-ai-agents",
      tagline: "Multi-Agent Architectures & RAG Intelligence",
      description: "Bespoke LLM fine-tuning, private retrieval-augmented generation (RAG) pipelines, and collaborative autonomous agent swarms that automate complex cognitive processes.",
      icon_name: "Sparkles",
      image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      features_json: '["Autonomous Multi-Agent Swarms", "Enterprise Private RAG Pipelines", "Domain-Specific LLM Fine-Tuning", "Cognitive Workflow Automation"]',
      capabilities_json: '["LangChain & LlamaIndex", "Vector DBs (Pinecone, Qdrant)", "Local Open-Source LLMs", "Guardrails & Safety Alignment"]',
    },
    {
      id: 3,
      title: "Intelligent Automation",
      slug: "intelligent-automation",
      tagline: "RPA & Autonomous Industrial Workflows",
      description: "Eliminating manual bottlenecks with AI-driven Robotic Process Automation, document comprehension, automated triage, and intelligent system orchestration.",
      icon_name: "Cpu",
      image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      features_json: '["Intelligent Document Processing", "Autonomous Exception Handling", "Legacy System API Bridging", "24/7 Cognitive Task Execution"]',
      capabilities_json: '["OCR & Vision Transformers", "Workflow State Machines", "Audit Logging & Compliance", "Human-in-the-Loop Safeguards"]',
    },
    {
      id: 4,
      title: "Quality & Systems Engineering",
      slug: "quality-engineering",
      tagline: "Ultra-Resilient Testing & Deterministic Safety",
      description: "Automated end-to-end testing, chaos engineering, formal model verification, and deterministic safety guardrails that protect production deployments.",
      icon_name: "Code2",
      image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      features_json: '["Automated Chaos Engineering", "LLM Hallucination Red-Teaming", "High-Throughput Load Testing", "Deterministic Verification Suites"]',
      capabilities_json: '["Pytest & Playwright", "Artillery & k6 Load Tools", "OpenTelemetry Traces", "Security Penetration Testing"]',
    },
    {
      id: 5,
      title: "Web & Digital Platforms",
      slug: "web-application-development",
      tagline: "Ultra-Fast, Cinematic Digital Interfaces",
      description: "Modern React, Next.js, and Vite web applications designed with uncompromising visual elegance, fluid motion graphics, and sub-second performance.",
      icon_name: "Globe",
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      features_json: '["Interactive 3D & Framer Motion", "Server-Driven Dynamic UI", "Enterprise Design Systems", "Progressive Web Applications"]',
      capabilities_json: '["React 19 & Next.js", "Tailwind CSS & shadcn", "WebGL & Three.js Canvas", "Sub-second Web Vitals"]',
    },
    {
      id: 6,
      title: "Data Analytics & Telemetry",
      slug: "data-analytics-bi",
      tagline: "Real-Time Telemetry & Actionable Dashboards",
      description: "Transforming fragmented enterprise data lakes into unified, real-time analytics engines with interactive executive dashboards and automated KPI forecasting.",
      icon_name: "BarChart3",
      image_url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
      features_json: '["Real-Time Streaming Telemetry", "Automated Executive Dashboards", "Modern Data Warehousing", "Anomaly Detection Pipelines"]',
      capabilities_json: '["Snowflake & BigQuery", "dbt Data Modeling", "Apache Spark Processing", "Self-Healing ETL Pipelines"]',
    },
    {
      id: 7,
      title: "Cloud & Sovereign Infrastructure",
      slug: "cloud-digital-transformation",
      tagline: "Multi-Cloud Modernization & Sovereign Infrastructure",
      description: "Migrating mission-critical legacy applications to secure cloud-native architectures with automated scaling, zero-trust security, and sovereign compliance.",
      icon_name: "Cloud",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      features_json: '["Multi-Cloud Infrastructure (AWS/GCP/Azure)", "Kubernetes GitOps Architecture", "Zero-Trust Identity & Compliance", "Cloud Cost Optimization"]',
      capabilities_json: '["Terraform & OpenTofu", "Istio Service Mesh", "SOC2 & ISO 27001 Controls", "Disaster Recovery Automation"]',
    },
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth } = carouselRef.current;
      if (scrollLeft <= 25) {
        carouselRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: -340, behavior: "smooth" });
      }
    }
  };

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 25) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: 340, behavior: "smooth" });
      }
    }
  }, []);

  const handlePrevDetail = useCallback(() => {
    setSelectedServiceIndex((prev) =>
      prev === null ? 0 : prev === 0 ? displayServices.length - 1 : prev - 1
    );
  }, [displayServices.length]);

  const handleNextDetail = useCallback(() => {
    setSelectedServiceIndex((prev) =>
      prev === null ? 0 : (prev + 1) % displayServices.length
    );
  }, [displayServices.length]);

  const handleBackToCards = () => {
    setSelectedServiceIndex(null);
  };

  // 10-second auto-rotate timer with clean pause/resume
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (selectedServiceIndex !== null) {
        handleNextDetail();
      } else {
        scrollRight();
      }
    }, 10000);

    return () => clearInterval(timer);
  }, [isPaused, selectedServiceIndex, handleNextDetail, scrollRight]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedServiceIndex === null) return;
      if (e.key === "Escape") handleBackToCards();
      if (e.key === "ArrowLeft") handlePrevDetail();
      if (e.key === "ArrowRight") handleNextDetail();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedServiceIndex, handlePrevDetail, handleNextDetail]);

  const isDetailView = selectedServiceIndex !== null;
  const currentService = isDetailView ? displayServices[selectedServiceIndex] : null;
  const CurrentIcon = currentService ? (ICON_MAP[currentService.icon_name] || Cpu) : Cpu;
  const features = currentService ? parseList(currentService.features_json) : [];
  const capabilities = currentService ? parseList(currentService.capabilities_json) : [];
  const prevService = isDetailView
    ? displayServices[selectedServiceIndex === 0 ? displayServices.length - 1 : selectedServiceIndex - 1]
    : null;
  const nextService = isDetailView
    ? displayServices[(selectedServiceIndex + 1) % displayServices.length]
    : null;

  return (
    <section
      id="services"
      className="relative py-24 sm:py-28 bg-white border-b border-[#E2E8F0] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            VIEW 1: DEDICATED DETAIL SLIDE VIEW (Replaces popup modal)
           ========================================================================= */}
        {isDetailView && currentService ? (
          <div className="space-y-8">
            {/* Top Navigation Bar: Back to Cards + Counter + Previous / Next */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
              <button
                onClick={handleBackToCards}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-bold text-xs sm:text-sm transition-all shadow-xs group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Cards</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#DBEAFE]">
                  Service 0{selectedServiceIndex + 1} of 0{displayServices.length}
                </span>

                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-emerald-500 animate-pulse"}`} />
                  <span>{isPaused ? "Paused" : "10s Auto-Rotate"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevDetail}
                  aria-label="Previous Service"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#CBD5E1] hover:border-[#2563EB] bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] text-xs font-semibold transition-all shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  onClick={handleNextDetail}
                  aria-label="Next Service"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#CBD5E1] hover:border-[#2563EB] bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] text-xs font-semibold transition-all shadow-xs"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dedicated Detail Showcase Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id || selectedServiceIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden bg-white"
              >
                {/* Hero Header Banner */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
                  <img
                    src={currentService.image_url}
                    alt={currentService.title}
                    className="w-full h-full object-cover object-center filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/55 to-transparent" />

                  {/* Top Left Icon Badge */}
                  <div className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-md">
                    <CurrentIcon className="w-7 h-7" />
                  </div>

                  {/* Top Right Service Tag */}
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] text-xs font-bold font-mono text-[#2563EB] shadow-sm">
                    CAPABILITY • 0{selectedServiceIndex + 1}
                  </div>

                  {/* Bottom Text in Banner */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                    <div className="text-xs sm:text-sm font-mono text-blue-200 uppercase tracking-widest block mb-2 font-bold">
                      {currentService.tagline || "ENTERPRISE SERVICE ARCHITECTURE"}
                    </div>
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                      {currentService.title}
                    </h2>
                  </div>
                </div>

                {/* Body Content Section */}
                <div className="p-6 sm:p-10 bg-white">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* Left: Overview & Features */}
                    <div className="lg:col-span-7 space-y-8">
                      <div>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                          EXECUTIVE OVERVIEW
                        </div>
                        <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
                          {currentService.description}
                        </p>
                      </div>

                      {/* Core Technical Features */}
                      {features.length > 0 && (
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] mb-4 flex items-center gap-2 font-bold">
                            <Sparkles className="w-4 h-4 text-[#2563EB]" />
                            <span>CORE TECHNICAL ARCHITECTURE</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {features.map((feat, idx) => (
                              <div
                                key={idx}
                                className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center gap-3 text-xs sm:text-sm text-[#0F172A] font-medium shadow-2xs"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Specialized Competencies & CTA Card */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      
                      {/* Competencies */}
                      {capabilities.length > 0 && (
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] mb-3 flex items-center gap-2 font-bold">
                            <Layers className="w-4 h-4 text-[#2563EB]" />
                            <span>SPECIALIZED COMPETENCIES</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {capabilities.map((cap, idx) => (
                              <span
                                key={idx}
                                className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#334155] font-semibold"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Box */}
                      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white space-y-4 shadow-lg">
                        <div>
                          <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider font-semibold mb-1">
                            ENTERPRISE ENGAGEMENT
                          </div>
                          <h4 className="text-lg sm:text-xl font-bold text-white">
                            Ready to integrate {currentService.title}?
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                            Deploy secure, production-grade architectures with deterministic SLA guarantees and direct solutions engineering.
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <Link
                            to={`/contact?service=${encodeURIComponent(currentService.title)}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm shadow-md transition-all group"
                          >
                            <span>Initiate Solution</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>

                          <span className="text-[11px] font-mono text-slate-400">
                            99.99% SLA Uptime
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* Footer Navigation Strip */}
                <div className="p-5 sm:p-6 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={handlePrevDetail}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#334155] hover:text-[#2563EB] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous: {prevService?.title}</span>
                  </button>

                  <button
                    onClick={handleBackToCards}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#CBD5E1] bg-white hover:bg-[#EFF6FF] text-xs font-bold text-[#0F172A] hover:text-[#2563EB] shadow-2xs transition-all"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Back to Cards Carousel</span>
                  </button>

                  <button
                    onClick={handleNextDetail}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#334155] hover:text-[#2563EB] transition-colors"
                  >
                    <span>Next: {nextService?.title}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick-Jump Card Selector Strip */}
            <div className="pt-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
                SELECT ANY SERVICE DIRECTLY
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {displayServices.map((svc, idx) => {
                  const SvcIcon = ICON_MAP[svc.icon_name] || Cpu;
                  const isActive = idx === selectedServiceIndex;
                  return (
                    <button
                      key={svc.id || idx}
                      onClick={() => setSelectedServiceIndex(idx)}
                      className={`p-3 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between h-24 ${
                        isActive
                          ? "bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] shadow-xs"
                          : "bg-white border-[#E2E8F0] text-[#334155] hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <SvcIcon className={`w-4 h-4 ${isActive ? "text-[#2563EB]" : "text-[#64748B]"}`} />
                        <span className="text-[10px] font-mono font-bold text-slate-400">0{idx + 1}</span>
                      </div>
                      <span className="text-xs font-bold line-clamp-2 leading-tight">
                        {svc.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* =========================================================================
              VIEW 2: SERVICES CARDS CAROUSEL (With 10s Auto-Rotate)
             ========================================================================= */
          <div>
            {/* Section Header with Kicker, Title & Reference Video < > Carousel Arrows */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
              <div>
                <div className="text-xs sm:text-sm font-bold font-mono tracking-widest uppercase text-[#2563EB] mb-2">
                  FUTURE READY SERVICES
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight max-w-2xl">
                  Transforming enterprises with innovative digital solutions
                </h2>
              </div>

              {/* Carousel Controls with 10s Auto-Rotate Status Indicator */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-slate-500 mr-2">
                  <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-emerald-500 animate-pulse"}`} />
                  <span>{isPaused ? "Paused" : "Auto-Rotate 10s"}</span>
                </div>

                <button
                  onClick={scrollLeft}
                  aria-label="Previous Services"
                  className="w-12 h-12 rounded-full border border-[#CBD5E1] hover:border-[#2563EB] bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center transition-all shadow-xs hover:shadow-sm focus:outline-hidden"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollRight}
                  aria-label="Next Services"
                  className="w-12 h-12 rounded-full border border-[#CBD5E1] hover:border-[#2563EB] bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center transition-all shadow-xs hover:shadow-sm focus:outline-hidden"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Services Carousel: 4 Tall Vertical Cards with Photo & Hover Expansion */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {displayServices.map((service, index) => {
                const IconComponent = ICON_MAP[service.icon_name] || Cpu;
                return (
                  <div
                    key={service.id || service.slug || index}
                    onClick={() => setSelectedServiceIndex(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${service.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedServiceIndex(index);
                      }
                    }}
                    className="relative min-w-[280px] sm:min-w-[320px] lg:min-w-[285px] h-[450px] sm:h-[480px] rounded-3xl overflow-hidden cursor-pointer snap-start group shadow-md hover:shadow-2xl transition-all duration-500 shrink-0 border border-[#E2E8F0] hover:border-[#93C5FD]"
                  >
                    {/* Background Realistic Photo */}
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05] transition-transform duration-700 group-hover:scale-108"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent group-hover:via-[#0F172A]/85 transition-colors duration-500" />

                    {/* Top Icon Badge */}
                    <div className="absolute top-5 left-5 w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-sm group-hover:bg-[#2563EB] transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Top Right Click to View Pill */}
                    <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Click for Details
                    </div>

                    {/* Content Container (Reveals Description on Hover) */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transition-transform duration-500">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#60A5FA] transition-colors">
                        {service.title}
                      </h3>

                      {/* Tagline */}
                      <div className="text-xs text-blue-200 font-mono mt-1 font-semibold">
                        {service.tagline}
                      </div>

                      {/* Expandable description on hover */}
                      <div className="max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-3">
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#93C5FD]">
                          <span>Open Full Detail View</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Quick Indicator Strip */}
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-mono text-[#64748B]">
                Click any service card above to open its dedicated detail slide.
              </span>
              <div className="flex items-center gap-1.5">
                {displayServices.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (carouselRef.current) {
                        carouselRef.current.scrollTo({ left: i * 340, behavior: "smooth" });
                      }
                    }}
                    aria-label={`Scroll to card ${i + 1}`}
                    className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0] hover:bg-[#2563EB] transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ServicesSection;
