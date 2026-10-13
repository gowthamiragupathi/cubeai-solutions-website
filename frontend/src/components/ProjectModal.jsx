import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, AlertCircle, TrendingUp, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  let technologies = [];
  try {
    technologies = typeof project.technologies_json === "string" ? JSON.parse(project.technologies_json) : project.technologies_json || [];
  } catch (e) {
    technologies = [];
  }

  let metrics = [];
  try {
    metrics = typeof project.metrics_json === "string" ? JSON.parse(project.metrics_json) : project.metrics_json || [];
  } catch (e) {
    metrics = [];
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header image banner */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
            <img
              src={project.image_url || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"}
              alt={project.title}
              className="w-full h-full object-cover filter contrast-105 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#0F172A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-5 left-6 right-6">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xs font-mono text-white font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#2563EB]/90 shadow-xs">
                  {project.category || "CASE STUDY"}
                </span>
                {project.client && (
                  <span className="text-xs font-medium text-slate-200">
                    Client: {project.client}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white">
            <div>
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 font-mono">Executive Overview</h3>
              <p className="text-[#334155] text-sm sm:text-base leading-relaxed">
                {project.summary}
              </p>
            </div>

            {/* Metrics Callout */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE]">
                {metrics.map((m, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] block">
                      {m.value}
                    </span>
                    <span className="text-xs font-semibold text-[#2563EB] block mt-0.5 font-mono">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Problem, Solution, Outcome Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Constraint</span>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold text-xs uppercase mb-2">
                  <Layers className="w-4 h-4" />
                  <span>The Engineering</span>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-[#2563EB] font-bold text-xs uppercase mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>The Business ROI</span>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>

            {/* Tech Stack Employed */}
            {technologies.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2.5 font-mono">
                  Production Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-medium text-[#475569]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#64748B]">
              Validated enterprise deployment • Confidential details protected under client NDA
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E2E8F0] text-[#475569] text-xs font-semibold hover:bg-white"
              >
                Close
              </button>
              <Link
                to="/contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-xs font-semibold shadow-xs"
              >
                <span>Inquire About Similar Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
