import React, { useEffect, useState } from "react";
import { api } from "../api/endpoints";
import {
  Mail,
  CheckCircle,
  Clock,
  Archive,
  Trash2,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";

export const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const loadEnquiries = async () => {
    setIsLoading(true);
    try {
      const filter = statusFilter === "all" ? null : statusFilter;
      const data = await api.enquiries.getAll(filter);
      setEnquiries(data || []);
      if (data && data.length > 0 && !selectedEnquiry) {
        setSelectedEnquiry(data[0]);
      }
    } catch (err) {
      console.warn("Could not fetch enquiries:", err);
      // Fallback
      setEnquiries([
        {
          id: 1,
          name: "Dr. Alexander Wright",
          email: "alexander@enterprise.com",
          company: "Global Horizons Corp",
          service_interested: "AI & Machine Learning",
          budget: "$150k - $500k",
          message: "Requesting technical consultation for private multi-agent LLM fine-tuning on proprietary clinical dossiers. Latency SLA must be strictly under 50ms.",
          status: "new",
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.enquiries.updateStatus(id, newStatus);
      setFeedback(`Status updated to "${newStatus}"`);
      setTimeout(() => setFeedback(""), 3000);
      loadEnquiries();
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead submission?")) return;
    try {
      await api.enquiries.delete(id);
      setSelectedEnquiry(null);
      loadEnquiries();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight">
            Consultation Enquiries & Inbound Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-mono">
            INBOUND CLIENT PIPELINE & CRM
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadEnquiries}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 shadow-xs"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-blue-600" : ""}`} />
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", "new", "contacted", "in_progress", "archived"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all uppercase font-semibold ${
              statusFilter === st
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            {st.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Main Grid: List on Left, Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Enquiries List Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 bg-slate-50">
            <span>SHOWING {enquiries.length} SUBMISSIONS</span>
          </div>

          <div className="divide-y divide-slate-100">
            {enquiries.length > 0 ? (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-4 transition-all cursor-pointer hover:bg-slate-50/80 ${
                    selectedEnquiry?.id === enq.id ? "bg-blue-50/60 border-l-4 border-blue-600" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{enq.name}</h4>
                      <span className="text-xs text-blue-600 font-mono font-medium">{enq.email}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                      enq.status === "new"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {enq.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
                    <span>{enq.service_interested || "General"}</span>
                    {enq.budget && <span>• {enq.budget}</span>}
                  </div>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-1 italic">
                    "{enq.message}"
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 font-mono">
                No customer submissions found for filter "{statusFilter}".
              </div>
            )}
          </div>
        </div>

        {/* Selected Enquiry Detailed Viewer */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm sticky top-6">
          {selectedEnquiry ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0B1220]">Lead Details</h3>
                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Enquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 block">CLIENT NAME</span>
                <span className="text-lg font-bold text-slate-900">{selectedEnquiry.name}</span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-xs text-blue-600 font-mono font-semibold hover:underline block"
                >
                  {selectedEnquiry.email}
                </a>
              </div>

              {selectedEnquiry.company && (
                <div>
                  <span className="text-xs font-mono text-slate-500 block">ORGANIZATION</span>
                  <span className="text-sm font-medium text-slate-800">{selectedEnquiry.company}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-mono text-slate-500 block">INTEREST</span>
                  <span className="text-xs text-slate-900 font-mono font-medium">{selectedEnquiry.service_interested}</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 block">BUDGET</span>
                  <span className="text-xs text-slate-900 font-mono font-medium">{selectedEnquiry.budget || "Unspecified"}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 block mb-1.5">PROJECT OBJECTIVES</span>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Update Control */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-mono text-slate-500 block mb-2 font-semibold">UPDATE STATUS</span>
                <div className="grid grid-cols-2 gap-2">
                  {["new", "contacted", "in_progress", "archived"].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono uppercase transition-all font-semibold ${
                        selectedEnquiry.status === st
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-slate-400">
                Received: {new Date(selectedEnquiry.created_at).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs font-mono text-slate-400">
              Select an enquiry from the list to view complete technical scope and update status.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminEnquiries;
