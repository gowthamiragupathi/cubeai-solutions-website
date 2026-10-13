import React, { useEffect, useState } from "react";
import ProjectsSection from "../components/ProjectsSection";
import { api } from "../api/endpoints";

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.projects.getAll();
        if (data && data.length > 0) setProjects(data);
      } catch (e) {
        console.warn("Using default projects");
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="pt-32 sm:pt-36 min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-md border border-[#DBEAFE] shadow-xs mb-3 inline-block">
          PROVEN PORTFOLIO
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight">
          Enterprise Case Studies &amp; Deployments
        </h1>
        <p className="mt-4 text-[#475569] max-w-2xl text-lg">
          Detailed accounts of complex systems engineered and deployed for leading enterprises across global logistics, biotechnology, semiconductors, and fintech.
        </p>
      </div>

      <ProjectsSection projects={projects} />
    </div>
  );
};

export default ProjectsPage;
