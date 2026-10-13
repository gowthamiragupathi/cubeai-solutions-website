import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, User, Calendar } from "lucide-react";

export const ArticleModal = ({ article, onClose }) => {
  if (!article) return null;

  let tags = [];
  try {
    tags = typeof article.tags_json === "string" ? JSON.parse(article.tags_json) : article.tags_json || [];
  } catch (e) {
    tags = [];
  }

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Published";

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
          className="relative w-full max-w-3xl rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header Image */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
            <img
              src={article.cover_image || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"}
              alt={article.title}
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
              <span className="text-xs font-mono text-white font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-[#2563EB]/90 shadow-xs inline-block mb-2">
                {article.category || "RESEARCH"}
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                {article.title}
              </h2>
            </div>
          </div>

          {/* Metadata bar */}
          <div className="px-6 sm:px-8 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between text-xs font-mono text-[#475569] gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#0F172A] font-medium">
                <User className="w-3.5 h-3.5 text-[#2563EB]" /> {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#2563EB]" /> {article.read_time}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2563EB]" /> {formattedDate}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-[#334155] leading-relaxed text-sm sm:text-base bg-white">
            <p className="text-base sm:text-lg font-medium text-[#0F172A] italic border-l-4 border-[#2563EB] pl-4 bg-[#EFF6FF]/60 py-2.5 rounded-r-xl">
              {article.excerpt}
            </p>

            <div className="whitespace-pre-line space-y-4 pt-2 text-[#334155]">
              {article.content}
            </div>

            {tags.length > 0 && (
              <div className="pt-6 border-t border-[#E2E8F0] flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-[#64748B] font-semibold">TAGS:</span>
                {tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-medium text-[#475569]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer Close */}
          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-right">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white text-xs font-bold shadow-xs"
            >
              Done Reading
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ArticleModal;
