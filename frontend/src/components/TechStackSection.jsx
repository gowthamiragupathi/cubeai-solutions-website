import React from "react";
import { motion } from "framer-motion";
import { Cpu, Server, Layout, Database, Layers } from "lucide-react";

export const TechStackSection = () => {
  const stackCategories = [
    {
      category: "Frontier AI & Neural Models",
      icon: Cpu,
      technologies: [
        { name: "PyTorch", type: "Deep Learning" },
        { name: "TensorRT", type: "Edge Acceleration" },
        { name: "Llama-3 & Mistral", type: "Open Foundation LLMs" },
        { name: "Hugging Face", type: "Model Ecosystem" },
        { name: "LangChain / LlamaIndex", type: "Agentic Orchestration" },
        { name: "Qdrant & Pinecone", type: "High-Speed Vector DB" },
      ],
    },
    {
      category: "Cloud & Distributed Systems",
      icon: Server,
      technologies: [
        { name: "FastAPI & Python 3.10+", type: "Async Core APIs" },
        { name: "PostgreSQL & SQLAlchemy 2", type: "ACID Relational Core" },
        { name: "Apache Kafka", type: "Event Streaming Mesh" },
        { name: "Docker & Kubernetes", type: "Container Orchestration" },
        { name: "Redis Clusters", type: "Microsecond In-Memory Cache" },
        { name: "AWS & Google Cloud", type: "Enterprise Sovereign Clouds" },
      ],
    },
    {
      category: "Modern Frontend & Motion UI",
      icon: Layout,
      technologies: [
        { name: "React 19 & Vite", type: "Sub-Second Interactive Core" },
        { name: "Tailwind CSS", type: "Design System Architecture" },
        { name: "Framer Motion", type: "Fluid Micro-Animations" },
        { name: "TypeScript / ESNext", type: "Strict Contract Safety" },
        { name: "HTML5 WebGL Canvas", type: "Interactive 3D Visuals" },
        { name: "TanStack Query", type: "Server State Synchronization" },
      ],
    },
    {
      category: "Enterprise Quality & Security",
      icon: Database,
      technologies: [
        { name: "Argon2 & JWT", type: "Cryptographic Authentication" },
        { name: "Alembic Migrations", type: "Zero-Downtime Schema Evolution" },
        { name: "Prometheus & Grafana", type: "Telemetry & SRE Monitoring" },
        { name: "Pydantic V2", type: "Rigorous Runtime Validation" },
        { name: "OpenTelemetry", type: "Distributed Trace Observability" },
        { name: "Zero-Trust Mesh", type: "mTLS & Fine-Grained RBAC" },
      ],
    },
  ];

  return (
    <section className="relative py-28 bg-white border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] font-semibold text-xs mb-3 shadow-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>TECHNOLOGY ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Enterprise Technology Stack
            </h2>
          </div>
          <p className="text-[#475569] max-w-md text-sm sm:text-base leading-relaxed">
            Industrial-grade frameworks engineered for fault tolerance, deterministic reproducibility, and zero-latency execution.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stackCategories.map((group, idx) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="card-interactive relative p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                {/* Glowing top line indicator on hover */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shadow-xs group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <GroupIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {group.category}
                    </h3>
                    <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                      PRODUCTION CERTIFIED
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.technologies.map((tech, tIdx) => (
                    <motion.div
                      key={tIdx}
                      whileHover={{ scale: 1.02, x: 2 }}
                      className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#93C5FD] hover:bg-[#EFF6FF]/50 transition-all shadow-2xs group/item cursor-default"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#0F172A] group-hover/item:text-[#2563EB] transition-colors">
                          {tech.name}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] font-mono text-[#2563EB] block mt-1">
                        {tech.type}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TechStackSection;
