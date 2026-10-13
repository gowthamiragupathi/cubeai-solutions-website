import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Activity,
  CheckCircle2,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";

export const Hero = ({ settings }) => {
  const prefersReducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Dynamic enterprise hero slides mirroring the reference video style & company content
  const slides = [
    {
      id: "slide-1",
      badge: "Applied AI & Enterprise Architecture",
      headlineLine1: "ENGINEERING INTELLIGENCE.",
      headlineLine2: "BUILDING WHAT'S NEXT.",
      description:
        settings?.hero_subheadline ||
        "We build intelligent digital experiences, AI-powered solutions, and scalable software that help businesses move forward with deterministic precision.",
      ctaPrimaryText: settings?.hero_cta_primary || "Explore Our Solutions",
      ctaPrimaryLink: "#solutions",
      ctaSecondaryText: settings?.hero_cta_secondary || "Start a Project",
      ctaSecondaryLink: "/contact",
      tagline: "Autonomous Enterprise Platforms • Sub-Millisecond Telemetry",
      bgImage:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85",
      accentTag: "Enterprise Scale Verified",
    },
    {
      id: "slide-2",
      badge: "Clinical Intelligence & Sovereign AI",
      headlineLine1: "HEALTHCARE & LIFE SCIENCES",
      headlineLine2: "REIMAGINED WITH AI.",
      description:
        "Optimizing, modernizing, and scaling sovereign research pipelines and clinical intelligence for forward-thinking payers, providers, and biotech firms.",
      ctaPrimaryText: "Explore Healthcare AI",
      ctaPrimaryLink: "#solutions",
      ctaSecondaryText: "View Case Studies",
      ctaSecondaryLink: "#projects",
      tagline: "HIPAA Compliant • Zero-Loss RAG • 99.8% Citation Precision",
      bgImage:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=85",
      accentTag: "Regulated Enterprise Grade",
    },
    {
      id: "slide-3",
      badge: "Quantitative Intelligence & Risk",
      headlineLine1: "REIMAGINING FINANCIAL SERVICES",
      headlineLine2: "WITH AI-POWERED SOLUTIONS.",
      description:
        "Driving amplification, continuous stochastic risk simulations, and automated fraud defense across mission-critical capital markets.",
      ctaPrimaryText: "Inspect FinTech Engine",
      ctaPrimaryLink: "#solutions",
      ctaSecondaryText: "Explore Analytics",
      ctaSecondaryLink: "#analytics",
      tagline: "$3.4B Capital Protected • Real-Time Telemetry • Sub-Millisecond SLA",
      bgImage:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2000&q=85",
      accentTag: "Real-Time Monte Carlo Swarm",
    },
    {
      id: "slide-4",
      badge: "Autonomous Edge Robotics & Vision",
      headlineLine1: "INTELLIGENT AUTOMATION &",
      headlineLine2: "COMPUTER VISION AT SCALE.",
      description:
        "Micro-second optical quality inspection and dynamic multi-agent supply chain optimization deployed on high-throughput robotic manufacturing lines.",
      ctaPrimaryText: "Explore Automation",
      ctaPrimaryLink: "#services",
      ctaSecondaryText: "Consult Our Engineers",
      ctaSecondaryLink: "/contact",
      tagline: "120 FPS Edge Inference • Zero Latency • $42M Scrap Reduction",
      bgImage:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=85",
      accentTag: "Edge TensorRT Accelerators",
    },
  ];

  // Auto-advance slides every 6.5s
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, prefersReducedMotion, slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section
      id="hero-banner"
      className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] overflow-hidden bg-[#0A1128] text-white flex items-center pt-20"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* =========================================================================
          1. Background Slides with Cross-Fade & Subtle Zoom
         ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <AnimatePresence>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={active.bgImage}
              alt={active.headlineLine1}
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08]"
            />
            {/* Dark gradient backdrop to guarantee high contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/50 to-transparent lg:via-[#0F172A]/30" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0F172A]/20 to-[#0F172A]/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =========================================================================
          2. The Iconic Angled Chevron / Polygon Glass Overlay (from Reference Video)
             On desktop: Angled chevron container extending to 62% width.
             On mobile: Soft full-width protective overlay for 100% legibility.
         ========================================================================= */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-[62%] pointer-events-none z-10">
        <svg
          className="absolute inset-0 w-full h-full filter drop-shadow-[15px_0_35px_rgba(15,23,42,0.6)]"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="chevronGrad" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0B132B" stopOpacity="0.96" />
              <stop offset="70%" stopColor="#0F172A" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="chevronBorder" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="85%" stopColor="#60A5FA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {/* Outer glowing border polygon */}
          <polygon
            points="0,0 80,0 100,50 80,100 0,100"
            fill="none"
            stroke="url(#chevronBorder)"
            strokeWidth="0.5"
          />
          {/* Main filled chevron */}
          <polygon points="0,0 79.5,0 99.5,50 79.5,100 0,100" fill="url(#chevronGrad)" />
        </svg>
      </div>

      {/* Mobile background shade */}
      <div className="lg:hidden absolute inset-0 bg-[#0B132B]/90 z-10 pointer-events-none" />

      {/* =========================================================================
          3. Hero Content Container
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
              {/* Top Live Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60A5FA] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3B82F6]" />
                </span>
                <span className="text-xs font-bold font-mono tracking-wider uppercase text-blue-200">
                  {active.badge}
                </span>
              </div>

              {/* Headline - Bold Uppercase Enterprise Typography (as seen in video) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold text-white leading-[1.12] tracking-tight uppercase">
                <span className="block drop-shadow-md">{active.headlineLine1}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#38BDF8] mt-1 drop-shadow-md">
                  {active.headlineLine2}
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow-xs">
                {active.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <motion.a
                  whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={active.ctaPrimaryLink}
                  className="relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-lg shadow-blue-600/30 transition-all duration-300 text-sm sm:text-base group border border-blue-400/40"
                >
                  <span>{active.ctaPrimaryText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </motion.a>

                <motion.a
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={active.ctaSecondaryLink}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-200 text-sm sm:text-base shadow-xs"
                >
                  <span>{active.ctaSecondaryText}</span>
                </motion.a>
              </div>

              {/* Micro-specs / SLA Assurance */}
              <div className="mt-10 pt-6 border-t border-white/15 w-full flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{active.tagline}</span>
                </div>
              </div>
            </motion.div>
        </div>
      </div>

      {/* =========================================================================
          4. Navigation Arrows (Left & Right - exactly as seen in reference video)
         ========================================================================= */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-108 hover:border-blue-400 focus:outline-hidden"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 hover:scale-108 hover:border-blue-400 focus:outline-hidden"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* =========================================================================
          5. Bottom Pagination Dots (7-dot array as seen in reference video)
         ========================================================================= */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/15">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full focus:outline-hidden ${
              currentSlide === idx
                ? "w-8 h-2.5 bg-[#3B82F6] shadow-sm shadow-blue-500/50"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Floating SLA Badge in bottom right corner */}
      <div className="hidden xl:flex absolute bottom-8 right-12 z-20 items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-white/15 text-xs text-white shadow-xl">
        <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span className="font-mono text-slate-300">
          GLOBAL INFRASTRUCTURE: <strong className="text-white">ONLINE</strong> • SLA 99.995%
        </span>
      </div>
    </section>
  );
};

export default Hero;
