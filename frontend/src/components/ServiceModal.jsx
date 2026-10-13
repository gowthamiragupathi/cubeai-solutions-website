import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  let features = [];
  try {
    features = typeof service.features_json === "string" ? JSON.parse(service.features_json) : service.features_json || [];
  } catch (e) {
    features = [];
  }

  let capabilities = [];
  try {
    capabilities = typeof service.capabilities_json === "string" ? JSON.parse(service.capabilities_json) : service.capabilities_json || [];
  } catch (e) {
    capabilities = [];
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
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header image banner */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
            <img
              src={service.image_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"}
              alt={service.title}
              className="w-full h-full object-cover filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/50 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-xs font-mono text-blue-200 uppercase tracking-widest block mb-1">
                {service.tagline || "ENTERPRISE SERVICE ARCHITECTURE"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {service.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white">
            <p className="text-[#334155] text-sm sm:text-base leading-relaxed">
              {service.description}
            </p>

            {/* Core Features */}
            {features.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] mb-3 flex items-center gap-2 font-bold">
                  <Sparkles className="w-4 h-4 text-[#2563EB]" /> Core Technical Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center gap-2.5 text-xs text-[#0F172A] font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capabilities & Tech Stack */}
            {capabilities.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#2563EB] mb-3 flex items-center gap-2 font-bold">
                  <Layers className="w-4 h-4 text-[#2563EB]" /> Specialized Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#475569] font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-5 sm:p-6 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#64748B] font-mono">
              Ready to deploy this capability in your infrastructure?
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-[#64748B] hover:text-[#0F172A]"
              >
                Close
              </button>
              <Link
                to={`/contact?service=${encodeURIComponent(service.title)}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-md shadow-blue-500/25 transition-all"
              >
                <span>Initiate Solution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceModal;
