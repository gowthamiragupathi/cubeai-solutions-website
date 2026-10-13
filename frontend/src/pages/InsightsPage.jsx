import React, { useEffect, useState } from "react";
import InsightsSection from "../components/InsightsSection";
import { api } from "../api/endpoints";

export const InsightsPage = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await api.insights.getAll();
        if (data && data.length > 0) setInsights(data);
      } catch (e) {
        console.warn("Using default insights");
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="pt-32 sm:pt-36 min-h-screen bg-white text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-md border border-[#DBEAFE] shadow-xs mb-3 inline-block">
          PUBLICATIONS &amp; RESEARCH
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight">
          Research Dispatches &amp; Perspectives
        </h1>
        <p className="mt-4 text-[#475569] max-w-2xl text-lg">
          Thought leadership, architectural deep dives, and applied engineering breakthroughs authored by the Cube AI research and development teams.
        </p>
      </div>

      <InsightsSection insights={insights} />
    </div>
  );
};

export default InsightsPage;
