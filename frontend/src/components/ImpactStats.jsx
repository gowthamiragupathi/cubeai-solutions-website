import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Cpu, Globe2, Briefcase, TrendingUp } from "lucide-react";

// Micro count-up animation component
const AnimatedNumber = ({ target, suffix = "", prefix = "" }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(target) || 0;
    const duration = 1800;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(start + (end - start) * ease);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setVal(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [target]);

  const formatted =
    typeof target === "string" && target.includes(".")
      ? val.toFixed(1)
      : Math.floor(val).toLocaleString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export const ImpactStats = ({ settings }) => {
  const stats = [
    {
      numeric: 63.6,
      prefix: "$",
      suffix: "M+",
      label: "Cost Reductions Engineered",
      subtext: "Quantifiable enterprise ROI and automated operational savings",
    },
    {
      numeric: 4820,
      prefix: "",
      suffix: "+",
      label: "Peak AI Throughput",
      subtext: "Requests per second processed across distributed edge nodes",
    },
    {
      numeric: 99.99,
      prefix: "",
      suffix: "%",
      label: "Enterprise Availability",
      subtext: "Deterministic SLA uptime with zero-loss failover guarantee",
    },
    {
      numeric: 128,
      prefix: "",
      suffix: "+",
      label: "Production Nodes Monitored",
      subtext: "Live sovereign clusters actively streaming telemetry",
    },
  ];

  return (
    <section className="relative py-20 sm:py-24 bg-gradient-to-r from-[#0A1128] via-[#0F172A] to-[#1E3A8A] text-white border-y border-blue-900/40 overflow-hidden shadow-2xl">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Title as in Reference Video (Frame 016) */}
        <div className="text-center mb-14 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            Delivering measurable value for our enterprise partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-blue-200/80 max-w-2xl mx-auto font-normal"
          >
            Deterministic architectures engineered for high-stakes uptime, audited safety, and tangible computational ROI.
          </motion.p>
        </div>

        {/* =========================================================================
            Large Stats Separated by Thin Vertical Dividers (Frame 016 in video)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="py-8 sm:py-0 px-4 sm:px-8 text-center flex flex-col items-center justify-center group"
            >
              {/* Large Metric Value with Vibrant Blue Highlight */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#60A5FA] group-hover:text-[#93C5FD] transition-colors duration-300 font-sans">
                <AnimatedNumber
                  target={item.numeric}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </div>

              {/* Metric Label */}
              <h3 className="mt-4 text-base sm:text-lg font-bold text-white tracking-tight">
                {item.label}
              </h3>

              {/* Subtext */}
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs">
                {item.subtext}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImpactStats;
