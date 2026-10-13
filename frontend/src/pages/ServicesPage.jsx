import React, { useEffect, useState } from "react";
import ServicesSection from "../components/ServicesSection";
import { api } from "../api/endpoints";

export const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.services.getAll();
        if (data && data.length > 0) setServices(data);
      } catch (e) {
        console.warn("Using default services");
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="pt-32 sm:pt-36 min-h-screen bg-white text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-md border border-[#DBEAFE] shadow-xs mb-3 inline-block">
          ENTERPRISE ARCHITECTURE
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight">
          Comprehensive Services &amp; Systems
        </h1>
        <p className="mt-4 text-[#475569] max-w-2xl text-lg">
          Explore our end-to-end capabilities spanning autonomous generative agents, edge vision, microservices engineering, and enterprise cloud modernization.
        </p>
      </div>

      <ServicesSection services={services} />
    </div>
  );
};

export default ServicesPage;
