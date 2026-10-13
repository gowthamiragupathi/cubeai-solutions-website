import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, ArrowUpRight, ChevronRight } from "lucide-react";
import ProjectModal from "./ProjectModal";

export const ProjectsSection = ({ projects = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const categories = [
    "All",
    "Enterprise AI",
    "Generative AI",
    "Computer Vision",
    "Autonomous Agents",
  ];

  // Default fallback projects if none loaded from API
  const defaultProjects = [
    {
      id: 1,
      title: "Autonomous Supply Chain Optimization Engine",
      slug: "autonomous-supply-chain",
      client: "Apex Global Logistics",
      category: "Enterprise AI",
      summary: "Real-time AI telemetry platform processing millions of sensor events across 4 continents to dynamically reroute cargo and minimize fuel expenditure.",
      problem: "Global freight disruption caused severe forecasting latency, leading to millions in demurrage charges and suboptimal route decisions.",
      solution: "Cube AI engineered an event-driven multi-agent simulation engine coupled with real-time AIS marine data and predictive machine learning models.",
      outcome: "Reduced route delivery deviations by 34%, saved over $18.2M in annual fuel allocations, and decreased response latency from 6 hours to 45 seconds.",
      technologies_json: '["PyTorch", "FastAPI", "Apache Kafka", "PostgreSQL", "React", "Docker"]',
      metrics_json: '[{"label": "Route Efficiency", "value": "+34%"}, {"label": "Annual Cost Savings", "value": "$18.2M"}, {"label": "Decision Latency", "value": "45s"}]',
      image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      is_featured: true,
    },
    {
      id: 2,
      title: "Enterprise Generative AI Knowledge Matrix",
      slug: "enterprise-genai-matrix",
      client: "Vanguard Biotech & Pharma",
      category: "Generative AI",
      summary: "Self-hosted, air-gapped generative knowledge system enabling clinical researchers to interrogate 20+ years of proprietary trial dossiers in milliseconds.",
      problem: "Pharma research scientists spent up to 14 hours weekly manually searching thousands of unstructured FDA filings and internal laboratory logs.",
      solution: "Built a sovereign retrieval-augmented generation mesh with strict citation integrity, vector indexing of 4M+ documents, and sub-50ms latency.",
      outcome: "Accelerated compound feasibility screening by 65% with 99.8% factual citation precision verified by lead toxicologists.",
      technologies_json: '["Llama-3 Fine-Tune", "Qdrant Vector DB", "Python", "React", "Tailwind CSS"]',
      metrics_json: '[{"label": "Research Speedup", "value": "65%"}, {"label": "Indexed Dossiers", "value": "4.2M+"}, {"label": "Citation Accuracy", "value": "99.8%"}]',
      image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
      is_featured: true,
    },
    {
      id: 3,
      title: "Precision Computer Vision Quality Sentinel",
      slug: "precision-cv-sentinel",
      client: "Helios Semiconductor & Hardware",
      category: "Computer Vision",
      summary: "High-speed optical inspection system utilizing micro-second inference on production wafer assembly lines to detect microscopic silicon defects.",
      problem: "Manual QA sampling only inspected 3% of production batches, letting sub-micron surface fractures slip into final chip packaging.",
      solution: "Deployed custom YOLO-based edge inference nodes mounted onto robotic pick-and-place lines running at 120 FPS.",
      outcome: "Yield defect escape rate dropped from 4.1% to 0.003%, saving an estimated $42M annually in silicon scrap.",
      technologies_json: '["TensorRT", "OpenCV", "FastAPI", "WebSockets", "Three.js"]',
      metrics_json: '[{"label": "Inspection Speed", "value": "120 FPS"}, {"label": "Defect Escape Rate", "value": "0.003%"}, {"label": "Scrap Reductions", "value": "$42M"}]',
      image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      is_featured: true,
    },
    {
      id: 4,
      title: "Next-Gen Multi-Agent Financial Risk Sentinel",
      slug: "multi-agent-financial-sentinel",
      client: "Quantum Capital Partners",
      category: "Autonomous Agents",
      summary: "Collaborative autonomous swarm modeling cross-asset contagion, liquidity stress tests, and automated regulatory reporting in real time.",
      problem: "Risk calculations were executed as end-of-day batch jobs, leaving traders blind to rapid intra-day liquidity shocks across crypto and fixed income.",
      solution: "Designed a decentralized agent architecture running stochastic Monte Carlo simulations continuously on distributed GPU workers.",
      outcome: "Enabled continuous real-time Value-at-Risk (VaR) telemetry and protected over $3.4B in asset value during black swan volatility events.",
      technologies_json: '["Rust", "FastAPI", "PostgreSQL", "Redis", "Next.js", "Chart.js"]',
      metrics_json: '[{"label": "Protected Capital", "value": "$3.4B"}, {"label": "Telemetry Interval", "value": "Real-time"}, {"label": "Scenario Tests/sec", "value": "100k+"}]',
      image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      is_featured: true,
    },
  ];

  const sourceProjects = projects && projects.length > 0 ? projects : defaultProjects;

  const filteredProjects = selectedCategory === "All"
    ? sourceProjects
    : sourceProjects.filter((p) => p.category?.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <section id="projects" className="relative py-28 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] font-semibold text-xs mb-3 shadow-xs font-mono">
              <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>PROVEN TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Enterprise Deployments &amp; Case Studies
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#475569] max-w-md text-sm sm:text-base leading-relaxed"
          >
            Tangible business transformation delivered across tier-1 logistics, healthcare, semiconductor, and fintech leaders.
          </motion.p>
        </div>

        {/* Category Filters with layoutId Spring Transition */}
        <div className="flex flex-wrap gap-2.5 mb-12 p-1.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs max-w-fit">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors focus:outline-none"
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#2563EB] rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${isSelected ? "text-white" : "text-[#475569] hover:text-[#0F172A]"}`}>
                  {cat}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid with Stagger & AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              let metrics = [];
              try {
                metrics = typeof project.metrics_json === "string" ? JSON.parse(project.metrics_json) : project.metrics_json || [];
              } catch (e) {
                metrics = [];
              }

              let technologies = [];
              try {
                technologies = typeof project.technologies_json === "string" ? JSON.parse(project.technologies_json) : project.technologies_json || [];
              } catch (e) {
                technologies = [];
              }

              return (
                <motion.div
                  layout
                  key={project.id || project.slug}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => setActiveProject(project)}
                  className="card-interactive group relative rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#93C5FD] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* Image Banner */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <img
                      src={project.image_url || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-108 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />

                    {/* Client Badge */}
                    {project.client && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] shadow-xs">
                        Client: {project.client}
                      </div>
                    )}

                    {/* Category Pill */}
                    <span className="absolute top-4 right-4 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-md border border-[#DBEAFE] shadow-xs">
                      {project.category || "ENTERPRISE"}
                    </span>
                  </div>

                  {/* Content Body */}
                  <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-[#475569] line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Metrics Callout with Stagger Highlight */}
                      {metrics.length > 0 && (
                        <div className="mt-6 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE]">
                          {metrics.slice(0, 3).map((m, i) => (
                            <div key={i}>
                              <span className="text-lg sm:text-xl font-extrabold text-[#0F172A] block font-sans">
                                {m.value}
                              </span>
                              <span className="text-[11px] text-[#2563EB] font-mono font-semibold block truncate">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tech stack pills & footer button */}
                    <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                        {technologies.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-lg bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]">
                            {t}
                          </span>
                        ))}
                        {technologies.length > 3 && (
                          <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-lg bg-[#F8FAFC] text-[#64748B]">
                            +{technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center text-[#2563EB] transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Blue Highlight Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Case Studies CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] hover:border-[#BFDBFE] hover:bg-[#EFF6FF]/60 shadow-xs transition-all group"
          >
            <span>Explore All Enterprise Case Studies</span>
            <ChevronRight className="w-4 h-4 text-[#2563EB] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
