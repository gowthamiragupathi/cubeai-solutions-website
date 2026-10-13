import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Award, Users, CheckCircle2 } from "lucide-react";

export const AboutSection = ({ settings }) => {
  const headline = settings?.about_headline || "Thinkers & Builders Architecting Enterprise AI";
  const description =
    settings?.about_description ||
    "Cube AI Solution was founded to bridge the gap between theoretical artificial intelligence and mission-critical production systems. We partner with forward-thinking enterprises to deliver transformative intelligence, enterprise scalability, and deterministic digital architecture.";

  const badges = [
    {
      title: "Enterprise AI Certified",
      year: "2026",
      desc: "For High-Availability Production Systems",
    },
    {
      title: "Zero-Trust Architecture",
      year: "SOC2",
      desc: "Deterministic Privacy & Sovereign Guardrails",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-28 bg-white border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            Split Layout (Frame 028 in reference video):
            - Left: Kicker "JOIN A TEAM OF", Headline "Thinkers", Badges, "Work With Us >"
            - Right: Collaborative Team Photography
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Narrative, Badges & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Small Kicker (Frame 028 in video) */}
            <div className="text-xs sm:text-sm font-bold font-mono tracking-widest uppercase text-[#2563EB] mb-2">
              JOIN A TEAM OF
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              Thinkers &amp; Builders
            </h2>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg text-[#334155] leading-relaxed font-normal">
              Discover what inspires and motivates our team as we engineer autonomous digital systems, high-throughput inference engines, and deterministic enterprise software.
            </p>

            <p className="mt-3 text-sm text-[#64748B] leading-relaxed">
              {description}
            </p>

            {/* Badges / Accreditations (Frame 028 in video) */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                      <span>{b.title}</span>
                      <span className="font-mono text-[10px] text-[#2563EB] bg-[#DBEAFE]/60 px-1.5 py-0.2 rounded font-semibold">
                        {b.year}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* "Work With Us >" Button (Frame 028 in video) */}
            <div className="mt-9">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 text-sm sm:text-base group"
              >
                <span>Work With Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Realistic Collaborative Team Photography (Frame 028 in video) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-2xl bg-slate-100 group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="CubeAI Engineering and Strategy Team"
                className="w-full h-[440px] sm:h-[480px] object-cover object-center group-hover:scale-104 transition-transform duration-700 filter contrast-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A]">Cross-Functional Engineering Lab</div>
                    <div className="text-xs text-[#64748B]">Multi-Agent Systems &amp; Distributed Infrastructure</div>
                  </div>
                </div>

                <span className="hidden sm:inline-flex text-[11px] font-mono text-[#2563EB] font-bold bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#DBEAFE]">
                  ACTIVE LAB
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
