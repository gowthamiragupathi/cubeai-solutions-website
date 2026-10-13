import React from "react";
import { motion } from "framer-motion";
import { Search, Compass, Palette, Code, CheckCheck, Rocket, GitCommit } from "lucide-react";

export const HowWeWork = () => {
  const steps = [
    {
      number: "01",
      title: "Discover",
      desc: "Deep diagnostic audits of enterprise workflows, data topologies, API bottlenecks, and organizational objectives.",
      icon: Search,
    },
    {
      number: "02",
      title: "Strategize",
      desc: "Formulating technical blueprints, model selection, latency budgets, hardware topology, and ROI validation frameworks.",
      icon: Compass,
    },
    {
      number: "03",
      title: "Design",
      desc: "Architecting zero-latency UX systems, state machines, API contracts, and deterministic safety guardrails.",
      icon: Palette,
    },
    {
      number: "04",
      title: "Develop",
      desc: "High-velocity agile engineering sprints utilizing robust typing, automated CI/CD checks, and modular microservices.",
      icon: Code,
    },
    {
      number: "05",
      title: "Test",
      desc: "Adversarial stress testing, red-teaming LLMs against hallucinations, penetration testing, and load-simulation at scale.",
      icon: CheckCheck,
    },
    {
      number: "06",
      title: "Deploy & Improve",
      desc: "Blue-green zero-downtime cutover, 24/7 telemetry monitoring, drift detection loops, and autonomous self-healing.",
      icon: Rocket,
    },
  ];

  return (
    <section className="relative py-28 bg-gradient-to-b from-[#EFF6FF] via-[#F0F7FF] to-[#EFF6FF] border-b border-[#DBEAFE] overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-64 bg-blue-200/25 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#DBEAFE] text-[#2563EB] font-semibold text-xs mb-3 shadow-xs font-mono">
              <GitCommit className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>DELIVERY METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              How We Engineer Solutions
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#475569] max-w-md text-sm sm:text-base leading-relaxed"
          >
            A battle-tested six-stage engineering lifecycle designed to eliminate friction, de-risk deployments, and accelerate time-to-value.
          </motion.p>
        </div>

        {/* 6-Stage Grid with Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="card-interactive group relative p-8 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#93C5FD] shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-3.5 py-1.5 rounded-xl shadow-xs">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#2563EB] font-semibold">
                  <span>Stage {step.number} Protocol</span>
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]/40 group-hover:bg-[#2563EB] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;
