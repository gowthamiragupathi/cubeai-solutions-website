import React, { useEffect, useState } from "react";
import { api } from "../api/endpoints";
import { Plus, Edit2, Trash2, CheckCircle2, X, FileText, RefreshCw } from "lucide-react";

export const AdminInsights = () => {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const data = await api.insights.getAll();
      setInsights(data);
    } catch (err) {
      console.warn("Could not load insights:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const handleOpenModal = (article = null) => {
    if (article) {
      setEditingArticle({ ...article });
    } else {
      setEditingArticle({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "AI Research",
        read_time: "5 min read",
        author: "Cube AI Research Team",
        cover_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        tags_json: '["AI", "Architecture"]',
        is_published: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingArticle.id) {
        const updated = await api.insights.update(editingArticle.id, editingArticle);
        setInsights((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        setFeedback("Article updated successfully.");
      } else {
        const created = await api.insights.create(editingArticle);
        setInsights((prev) => [...prev, created]);
        setFeedback("New article published successfully.");
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Save article error:", err);
      setError(err.response?.data?.detail || "Failed to save article.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await api.insights.delete(id);
      setInsights((prev) => prev.filter((a) => a.id !== id));
      setFeedback("Article deleted.");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Delete article error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Insights & Engineering Publications
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            PUBLISH RESEARCH, ARCHITECTURAL GUIDES AND ARTICLES
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 text-xs transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100 bg-slate-50">
                <th className="p-4">Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {insights.map((art) => (
                <tr key={art.id} className="hover:bg-slate-50/80">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block text-sm">{art.title}</span>
                    <span className="text-slate-400 text-[10px]">/{art.slug}</span>
                  </td>
                  <td className="p-4 text-slate-600">{art.author}</td>
                  <td className="p-4 text-blue-600 font-semibold">{art.category}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      art.is_published ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-500"
                    }`}>
                      {art.is_published ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenModal(art)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
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
      {isModalOpen && editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0a0e17] border border-white/10 rounded-2xl w-full max-w-3xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white">
                {editingArticle.id ? "Edit Article" : "Write Article"}
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
                  <label className="block text-xs font-mono text-gray-300 mb-1">ARTICLE TITLE</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">SLUG</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">AUTHOR</label>
                  <input
                    type="text"
                    value={editingArticle.author || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">CATEGORY</label>
                  <input
                    type="text"
                    value={editingArticle.category || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">READ TIME</label>
                  <input
                    type="text"
                    value={editingArticle.read_time || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, read_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">COVER IMAGE URL</label>
                <input
                  type="text"
                  value={editingArticle.cover_image || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, cover_image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">EXCERPT / ABSTRACT</label>
                <textarea
                  rows={2}
                  required
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">FULL ARTICLE CONTENT</label>
                <textarea
                  rows={6}
                  required
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={editingArticle.is_published}
                  onChange={(e) => setEditingArticle({ ...editingArticle, is_published: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-0"
                />
                <label htmlFor="is_published" className="text-xs font-mono text-gray-300">
                  Published Live On Website
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInsights;
