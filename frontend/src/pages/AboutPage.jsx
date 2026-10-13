import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Cpu, Code2, Users2, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <div className="pt-32 sm:pt-36 pb-24 min-h-screen bg-white text-[#0F172A]">
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] font-semibold text-xs mb-4 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>ORIGIN &amp; MISSION</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Pioneering The Applied AI Frontier
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#475569] leading-relaxed">
            Cube AI Solution bridges the gap between laboratory artificial intelligence and mission-critical enterprise production software.
          </p>
        </div>
      </div>

      {/* Narrative Section with Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-[#475569] leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              The Architecture Behind Our Engineering
            </h2>
            <p>
              In an era saturated with generic chatbots and superficial wrappers, Cube AI Solution engineers deterministic, scalable, and sovereign computational systems.
            </p>
            <p>
              Our team consists of veterans across distributed high-frequency systems, deep learning research, robotics, and cloud-native Kubernetes orchestration.
            </p>
            <p>
              We believe artificial intelligence must be observable, testable, and strictly aligned with enterprise business ROI.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl relative bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Cube AI Engineering Team"
                className="w-full h-96 object-cover filter contrast-105 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] font-mono text-xs flex justify-between items-center text-[#0F172A] shadow-sm">
                <span>CUBE AI ENGINEERING LABS</span>
                <span className="text-[#2563EB] font-bold">SILICON VALLEY &amp; GLOBAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#E2E8F0]">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-10 text-center">
          Our Guiding Engineering Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-white shadow-xs transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-6 shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">Deterministic Precision</h3>
            <p className="mt-3 text-sm text-[#475569] leading-relaxed">
              We eliminate stochastic drift with rigorous verification contracts, proposition indexing, and deterministic guardrail layers.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-white shadow-xs transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-6 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">Data Sovereignty</h3>
            <p className="mt-3 text-sm text-[#475569] leading-relaxed">
              Your proprietary intelligence never leaks. We deploy private models inside air-gapped virtual private clouds and sovereign hardware.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-white shadow-xs transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-6 shadow-xs">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">Engineering Velocity</h3>
            <p className="mt-3 text-sm text-[#475569] leading-relaxed">
              Fast iterations backed by continuous regression testing, automated MLOps pipelines, and sub-second Web Vitals.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] shadow-md shadow-blue-500/25 transition-all group"
          >
            <span>Partner With Cube AI Solution</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
