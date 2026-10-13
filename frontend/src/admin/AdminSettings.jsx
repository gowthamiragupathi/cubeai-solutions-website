import React, { useEffect, useState } from "react";
import { api } from "../api/endpoints";
import { Save, RefreshCw, CheckCircle2, AlertCircle, Sliders, Sparkles } from "lucide-react";

export const AdminSettings = () => {
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await api.settings.getAll();
      setSettings(data || {});
    } catch (err) {
      setError("Failed to fetch settings from API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback("");
    setError("");

    try {
      await api.settings.update(settings);
      setFeedback("Settings successfully updated and synchronized with live website!");
      setTimeout(() => setFeedback(""), 4000);
    } catch (err) {
      setError("Failed to save settings. Please verify backend connectivity.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
        <span>Loading System Configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
            Site Copy & Global Brand Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
            PERSISTENT CMS CONFIGURATION
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm text-xs transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>Publish Changes</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Hero Section Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0B1220] border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Homepage Hero Section Configuration</span>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
              HERO MAIN HEADLINE
            </label>
            <input
              type="text"
              value={settings.hero_headline || ""}
              onChange={(e) => handleChange("hero_headline", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
              HERO SUBHEADLINE / SUPPORTING TEXT
            </label>
            <textarea
              rows={3}
              value={settings.hero_subheadline || ""}
              onChange={(e) => handleChange("hero_subheadline", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                PRIMARY CTA LABEL
              </label>
              <input
                type="text"
                value={settings.hero_cta_primary || ""}
                onChange={(e) => handleChange("hero_cta_primary", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                SECONDARY CTA LABEL
              </label>
              <input
                type="text"
                value={settings.hero_cta_secondary || ""}
                onChange={(e) => handleChange("hero_cta_secondary", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* Company Impact Statistics Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0B1220] border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Impact Statistics Metrics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                SOLUTIONS DELIVERED
              </label>
              <input
                type="text"
                value={settings.stat_solutions_delivered || ""}
                onChange={(e) => handleChange("stat_solutions_delivered", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                TECHNOLOGIES MASTERED
              </label>
              <input
                type="text"
                value={settings.stat_technologies_mastered || ""}
                onChange={(e) => handleChange("stat_technologies_mastered", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                INDUSTRIES SERVED
              </label>
              <input
                type="text"
                value={settings.stat_industries_served || ""}
                onChange={(e) => handleChange("stat_industries_served", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                PROJECTS COMPLETED
              </label>
              <input
                type="text"
                value={settings.stat_projects_completed || ""}
                onChange={(e) => handleChange("stat_projects_completed", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* Company About Section Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0B1220] border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Company Narrative & Storytelling</span>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
              ABOUT HEADLINE
            </label>
            <input
              type="text"
              value={settings.about_headline || ""}
              onChange={(e) => handleChange("about_headline", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
              ABOUT INTRODUCTORY NARRATIVE
            </label>
            <textarea
              rows={4}
              value={settings.about_description || ""}
              onChange={(e) => handleChange("about_description", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0B1220] border-b border-slate-100 pb-3">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Public Contact & Enterprise Hotline</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                PRIMARY CONTACT EMAIL
              </label>
              <input
                type="email"
                value={settings.contact_email || ""}
                onChange={(e) => handleChange("contact_email", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                ENTERPRISE PHONE
              </label>
              <input
                type="text"
                value={settings.contact_phone || ""}
                onChange={(e) => handleChange("contact_phone", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
              GLOBAL OFFICE ADDRESS
            </label>
            <input
              type="text"
              value={settings.contact_address || ""}
              onChange={(e) => handleChange("contact_address", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all text-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish To Live Site</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;
