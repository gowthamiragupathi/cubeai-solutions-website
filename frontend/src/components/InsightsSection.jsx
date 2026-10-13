import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  User,
} from "lucide-react";
import ArticleModal from "./ArticleModal";

export const InsightsSection = ({ insights = [] }) => {
  const [activeArticle, setActiveArticle] = useState(null);
  const carouselRef = useRef(null);

  // Default verified technical articles
  const defaultInsights = [
    {
      id: 1,
      title: "Reimagining Enterprise Workflows with Autonomous Agentic Swarms",
      slug: "architecting-multi-agent-systems",
      tagType: "POV",
      excerpt:
        "How distributed multi-agent systems move from experimental prototypes to mission-critical production with deterministic guardrails and strict state convergence.",
      content: `Autonomous AI agent swarms represent a paradigm shift from deterministic software to goal-oriented orchestration. However, moving agentic workflows from toy prototypes to mission-critical enterprise environments introduces severe challenges in state convergence, runaway cost loops, and stochastic drift.

### Core Architectural Pillars
1. Decoupled Memory & Reflex Layers: Agents require segregated short-term scratchpad context and long-term vector semantic embeddings.
2. Deterministic Guardrails: LLMs propose actions; deterministic validators verify safety boundaries before execution.
3. Structured Tool Schemas: Strict Pydantic contracts ensure that agent actions produce verifiable, reproducible side effects.

By enforcing these constraints, Cube AI clients achieve up to 99.9% task reliability with autonomous swarms.`,
      category: "AI Research",
      read_time: "6 min read",
      author: "CubeAI Research Labs",
      cover_image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
      published_at: "2026-04-10T09:00:00Z",
    },
    {
      id: 2,
      title: "Zero-Loss RAG: Eliminating Hallucinations in Clinical & Financial Systems",
      slug: "zero-loss-rag-precision",
      tagType: "Article",
      excerpt:
        "A deep dive into hybrid sparse-dense retrieval, cross-encoder rerankers, and citation attribution that deliver 99.8% factual precision in regulated domains.",
      content: `Traditional naïve RAG relies solely on standard cosine similarity over dense vector embeddings. While adequate for casual chat, this approach catastrophically fails when precision, numerical details, or regulatory clauses are at stake.

### The Hybrid Pipeline
In our proprietary enterprise implementations, Cube AI fuses:
- BM25 sparse keyword indices with modern ColBERT dense late-interaction representations.
- Cross-encoder rerankers to surface exact paragraph matches.
- Automated citation attribution engines that cross-check every single generated token against the source corpus.

The outcome is mathematical provability in generative response generation.`,
      category: "Engineering",
      read_time: "5 min read",
      author: "Systems Architecture Group",
      cover_image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      published_at: "2026-03-28T14:30:00Z",
    },
    {
      id: 3,
      title: "Sub-Millisecond Edge Vision: Accelerating Advanced Manufacturing Lines",
      slug: "next-decade-industrial-automation",
      tagType: "Whitepaper",
      excerpt:
        "How mounting localized TensorRT accelerators directly on assembly arms reduces defect escape rates to 0.003% while cutting annual scrap by $42M.",
      content: `Industrial automation is shifting from rigid robotic arms running static PLC logic to adaptive physical intelligence. By mounting low-power edge accelerators on assembly floors and streaming aggregated telemetry to central foundation models, factories achieve real-time self-healing workflows.

When a manufacturing anomaly is flagged, the vision transformer isolates the anomaly in micro-seconds, while the higher-level foundation model generates diagnostic repair runbooks for floor engineers within seconds.`,
      category: "Industrial AI",
      read_time: "7 min read",
      author: "Robotics & Edge Lead",
      cover_image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      published_at: "2026-03-15T11:00:00Z",
    },
  ];

  const sourceArticles =
    insights && insights.length > 0 ? insights : defaultInsights;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section id="insights" className="relative py-24 sm:py-28 bg-white border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            Section Header with Kicker, Title & Reference Video < > Carousel Arrows
            (Frame 024 in reference video)
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs sm:text-sm font-bold font-mono tracking-widest uppercase text-[#2563EB] mb-2">
              RESOURCES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              News &amp; Insights
            </h2>
          </div>

          {/* Carousel Arrows (as in reference video Frame 024) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollLeft}
              aria-label="Previous Insights"
              className="w-12 h-12 rounded-full border border-[#CBD5E1] hover:border-[#2563EB] bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center transition-all shadow-xs hover:shadow-sm focus:outline-hidden"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next Insights"
              className="w-12 h-12 rounded-full border border-[#CBD5E1] hover:border-[#2563EB] bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center transition-all shadow-xs hover:shadow-sm focus:outline-hidden"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            Editorial Article Cards Carousel (Frame 024 in reference video)
           ========================================================================= */}
        <div
          ref={carouselRef}
          className="flex gap-7 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {sourceArticles.map((article) => {
            const tagLabel = article.tagType || (article.category === "AI Research" ? "POV" : "Article");
            return (
              <div
                key={article.id || article.slug}
                onClick={() => setActiveArticle(article)}
                className="min-w-[300px] sm:min-w-[360px] lg:min-w-[380px] rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#93C5FD] shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between shrink-0 snap-start cursor-pointer group"
              >
                <div>
                  {/* Image with Tag Pill Badge */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center filter contrast-[1.05] transition-transform duration-700 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Tag Pill Badge (POV / Article / Whitepaper as in video) */}
                    <div className="absolute bottom-3 left-4 px-3.5 py-1 rounded-md bg-[#2563EB] text-white text-[11px] font-bold uppercase tracking-wider font-mono shadow-sm">
                      {tagLabel}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors duration-200">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Link: Read More > */}
                <div className="p-6 sm:p-7 pt-0 border-t border-[#F8FAFC]">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Article Detail Modal */}
      <ArticleModal
        article={activeArticle}
        isOpen={!!activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  );
};

export default InsightsSection;
