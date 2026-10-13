import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SolutionsShowcase from "../components/SolutionsShowcase";
import ServicesSection from "../components/ServicesSection";
import ImpactStats from "../components/ImpactStats";
import AnalyticsSection from "../components/AnalyticsSection";
import ProjectsSection from "../components/ProjectsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import GlobalMapSection from "../components/GlobalMapSection";
import AboutSection from "../components/AboutSection";
import TechStackSection from "../components/TechStackSection";
import HowWeWork from "../components/HowWeWork";
import InsightsSection from "../components/InsightsSection";
import ContactSection from "../components/ContactSection";
import { api, FALLBACK_SETTINGS } from "../api/endpoints";

export const HomePage = () => {
  const [settings, setSettings] = useState(FALLBACK_SETTINGS);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, servicesData, projectsData, insightsData] = await Promise.allSettled([
          api.settings.getAll(),
          api.services.getAll(),
          api.projects.getAll(),
          api.insights.getAll(),
        ]);

        if (settingsData.status === "fulfilled" && settingsData.value) {
          setSettings(settingsData.value);
        }
        if (servicesData.status === "fulfilled" && servicesData.value?.length > 0) {
          setServices(servicesData.value);
        }
        if (projectsData.status === "fulfilled" && projectsData.value?.length > 0) {
          setProjects(projectsData.value);
        }
        if (insightsData.status === "fulfilled" && insightsData.value?.length > 0) {
          setInsights(insightsData.value);
        }
      } catch (err) {
        console.warn("Using fallback website content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash;
      const elem = document.querySelector(id);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. Hero: Full-bleed angled chevron slider (Frames 000, 030, 038) */}
      <Hero settings={settings} />

      {/* 2. Solutions Showcase: Vertical tabbed industries list + Featured card (Frame 006) */}
      <SolutionsShowcase />

      {/* 3. Future Ready Services: Tall photo cards carousel with hover expansion (Frame 011) */}
      <ServicesSection services={services} />

      {/* 4. Impact Stats: Dark navy enterprise banner with vertical dividers (Frame 016) */}
      <ImpactStats settings={settings} />

      {/* 5. Core Live Analytics & Telemetry: Preserved real data calculations and graphs */}
      <AnalyticsSection />

      {/* 6. Projects & Case Studies: Interactive filter tabs & case studies */}
      <ProjectsSection projects={projects} />

      {/* 7. Client Testimonials: Quotes with black circular badges & carousel (Frame 021) */}
      <TestimonialsSection />

      {/* 8. Global Infrastructure Map: Interactive world map with glowing pins (Frame 026) */}
      <GlobalMapSection />

      {/* 9. Thinkers & Builders: Accreditations, badges, Work With Us, collaborative team photo (Frame 028) */}
      <AboutSection settings={settings} />

      {/* 10. Technology Stack: Categorized framework & engineering tools */}
      <TechStackSection />

      {/* 11. Delivery Methodology: Battle-tested 6-stage engineering process */}
      <HowWeWork />

      {/* 12. News & Insights: Editorial cards with tag pills & Read More links (Frame 024) */}
      <InsightsSection insights={insights} />

      {/* 13. Contact & Enquiry: Working enterprise form connected to backend */}
      <ContactSection settings={settings} />
    </div>
  );
};

export default HomePage;
