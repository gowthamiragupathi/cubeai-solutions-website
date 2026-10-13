import React, { useEffect, useState } from "react";
import { api } from "../api/endpoints";
import { Plus, Edit2, Trash2, CheckCircle2, X, Cpu, Image, RefreshCw, AlertCircle } from "lucide-react";

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const data = await api.services.getAll();
      setServices(data);
    } catch (err) {
      console.warn("Could not load services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService({
        ...service,
        features_json: typeof service.features_json === "string" ? service.features_json : JSON.stringify(service.features_json || []),
        capabilities_json: typeof service.capabilities_json === "string" ? service.capabilities_json : JSON.stringify(service.capabilities_json || []),
      });
    } else {
      setEditingService({
        title: "",
        slug: "",
        tagline: "",
        description: "",
        icon_name: "Cpu",
        image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        features_json: '["Feature A", "Feature B"]',
        capabilities_json: '["Tech A", "Tech B"]',
        order_index: services.length + 1,
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingService.id) {
        const updated = await api.services.update(editingService.id, editingService);
        setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        setFeedback("Service updated successfully.");
      } else {
        const created = await api.services.create(editingService);
        setServices((prev) => [...prev, created]);
        setFeedback("New service created successfully.");
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Save service error:", err);
      setError(err.response?.data?.detail || "Failed to save service.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await api.services.delete(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setFeedback("Service deleted.");
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      console.error("Delete service error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Services & Capabilities CMS
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
            MANAGE ENTERPRISE SERVICE PORTFOLIO
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 text-xs transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100 bg-slate-50">
                <th className="p-4">Order</th>
                <th className="p-4">Title & Slug</th>
                <th className="p-4">Tagline</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-50/80">
                  <td className="p-4 text-blue-600 font-bold">#{svc.order_index}</td>
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block text-sm">{svc.title}</span>
                    <span className="text-slate-400 text-[10px]">/{svc.slug}</span>
                  </td>
                  <td className="p-4 text-slate-600 max-w-xs truncate">{svc.tagline}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      svc.is_active ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-500"
                    }`}>
                      {svc.is_active ? "ACTIVE" : "HIDDEN"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenModal(svc)}
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc.id)}
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
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0a0e17] border border-white/10 rounded-2xl w-full max-w-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white">
                {editingService.id ? "Edit Service" : "Add New Service"}
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
                  <label className="block text-xs font-mono text-gray-300 mb-1">TITLE</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">SLUG</label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">TAGLINE</label>
                <input
                  type="text"
                  value={editingService.tagline || ""}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">IMAGE URL</label>
                <input
                  type="text"
                  value={editingService.image_url || ""}
                  onChange={(e) => setEditingService({ ...editingService, image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">DESCRIPTION</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">FEATURES JSON ARRAY</label>
                  <input
                    type="text"
                    value={editingService.features_json || "[]"}
                    onChange={(e) => setEditingService({ ...editingService, features_json: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">ORDER INDEX</label>
                  <input
                    type="number"
                    value={editingService.order_index || 0}
                    onChange={(e) => setEditingService({ ...editingService, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingService.is_active}
                  onChange={(e) => setEditingService({ ...editingService, is_active: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600 focus:ring-0"
                />
                <label htmlFor="is_active" className="text-xs font-mono text-gray-300">
                  Visible On Public Website
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
