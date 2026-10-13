import React, { useEffect, useState } from "react";
import { api } from "../api/endpoints";
import { Plus, Edit2, Trash2, CheckCircle2, X, Briefcase, RefreshCw } from "lucide-react";

export const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await api.projects.getAll();
      setProjects(data);
    } catch (err) {
      console.warn("Could not load projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject({
        ...project,
        technologies_json: typeof project.technologies_json === "string" ? project.technologies_json : JSON.stringify(project.technologies_json || []),
        metrics_json: typeof project.metrics_json === "string" ? project.metrics_json : JSON.stringify(project.metrics_json || []),
      });
    } else {
      setEditingProject({
        title: "",
        slug: "",
        client: "",
        category: "Enterprise AI",
        summary: "",
        problem: "",
        solution: "",
        outcome: "",
        technologies_json: '["Python", "FastAPI", "React"]',
        metrics_json: '[{"label": "Performance", "value": "+40%"}]',
        image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        is_featured: true,
        order_index: projects.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingProject.id) {
        const updated = await api.projects.update(editingProject.id, editingProject);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setFeedback("Project updated successfully.");
      } else {
        const created = await api.projects.create(editingProject);
        setProjects((prev) => [...prev, created]);
        setFeedback("New project created successfully.");
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Save project error:", err);
      setError(err.response?.data?.detail || "Failed to save project.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;
    try {
      await api.projects.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setFeedback("Project deleted.");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Delete project error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Case Studies & Projects CMS
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            MANAGE DEPLOYED PORTFOLIO AND ENTERPRISE OUTCOMES
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 text-xs transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100 bg-slate-50">
                <th className="p-4">Title</th>
                <th className="p-4">Client</th>
                <th className="p-4">Category</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((prj) => (
                <tr key={prj.id} className="hover:bg-slate-50/80">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block text-sm">{prj.title}</span>
                    <span className="text-slate-400 text-[10px]">/{prj.slug}</span>
                  </td>
                  <td className="p-4 text-slate-600">{prj.client || "Confidential"}</td>
                  <td className="p-4 text-blue-600 font-semibold">{prj.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      prj.is_featured ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-500"
                    }`}>
                      {prj.is_featured ? "YES" : "NO"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenModal(prj)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(prj.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0a0e17] border border-white/10 rounded-2xl w-full max-w-3xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white">
                {editingProject.id ? "Edit Case Study" : "Add Case Study"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">PROJECT TITLE</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">SLUG</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">CLIENT NAME</label>
                  <input
                    type="text"
                    value={editingProject.client || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">CATEGORY</label>
                  <input
                    type="text"
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">IMAGE URL</label>
                <input
                  type="text"
                  value={editingProject.image_url || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">EXECUTIVE SUMMARY</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">PROBLEM STATEMENT</label>
                <textarea
                  rows={2}
                  value={editingProject.problem || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">ARCHITECTURAL SOLUTION</label>
                <textarea
                  rows={2}
                  value={editingProject.solution || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">QUANTIFIABLE OUTCOME</label>
                <textarea
                  rows={2}
                  value={editingProject.outcome || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">METRICS JSON</label>
                  <input
                    type="text"
                    value={editingProject.metrics_json || "[]"}
                    onChange={(e) => setEditingProject({ ...editingProject, metrics_json: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">TECHNOLOGIES JSON</label>
                  <input
                    type="text"
                    value={editingProject.technologies_json || "[]"}
                    onChange={(e) => setEditingProject({ ...editingProject, technologies_json: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={editingProject.is_featured}
                  onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-0"
                />
                <label htmlFor="is_featured" className="text-xs font-mono text-gray-300">
                  Feature In Homepage Showcase
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
