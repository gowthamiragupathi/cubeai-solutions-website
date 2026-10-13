import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MapPin, Sparkles, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { api } from "../api/endpoints";

const enquirySchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid business email address"),
  company: z.string().optional(),
  service_interested: z.string().min(1, "Please select an area of interest"),
  budget: z.string().optional(),
  message: z.string().min(10, "Project description must be at least 10 characters"),
});

export const ContactSection = ({ settings }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      service_interested: "AI and Machine Learning",
      budget: "$50k - $150k",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await api.enquiries.submit(data);
      setSubmitSuccess(true);
      reset();

      // Trigger celebratory confetti effect in corporate blue & white
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#2563EB", "#3B82F6", "#DBEAFE", "#FFFFFF"],
        });
      } catch (e) {
        // Confetti optional
      }
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      setErrorMessage("Could not submit enquiry. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactEmail = settings?.contact_email || "contact@cubeai.com";
  const contactPhone = settings?.contact_phone || "+1 (800) 555-CUBE";
  const contactAddress = settings?.contact_address || "Cube AI Innovation Lab, Suite 800, Silicon Corridor";

  return (
    <section id="contact" className="relative py-28 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-100/50 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Value Prop */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] font-semibold text-xs mb-3 shadow-xs font-mono">
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>START A CONVERSATION</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Let's Engineer Your Competitive Advantage
              </h2>
              <p className="mt-4 text-[#475569] text-sm sm:text-base leading-relaxed">
                Connect with our systems architects. We analyze feasibility, model specifications, data governance, and rapid deployment paths within 24 hours.
              </p>
            </div>

            {/* Direct Contact Points */}
            <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-medium text-[#64748B] block">DIRECT INQUIRIES</span>
                  <a href={`mailto:${contactEmail}`} className="text-sm font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors">
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-medium text-[#64748B] block">ENTERPRISE HOTLINE</span>
                  <a href={`tel:${contactPhone}`} className="text-sm font-bold text-[#0F172A] hover:text-[#2563EB] transition-colors">
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-medium text-[#64748B] block">GLOBAL HEADQUARTERS</span>
                  <span className="text-sm font-medium text-[#0F172A]">
                    {contactAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Enterprise NDA badge */}
            <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#2563EB] shrink-0" />
              <span className="text-xs font-medium text-[#1E3A8A]">
                Mutual NDA guaranteed prior to deep architectural or proprietary data review.
              </span>
            </div>
          </div>

          {/* Right Column: High-End Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl relative"
            >
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2563EB] mx-auto flex items-center justify-center shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#0F172A]">
                      Enquiry Dispatched Successfully
                    </h3>
                    <p className="text-[#475569] text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Cube AI Solution. Your technical parameters have been routed to our enterprise engineering team. A solution architect will follow up within 24 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-xs font-mono font-bold text-[#2563EB] hover:bg-blue-100 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                      <h3 className="text-lg font-bold text-[#0F172A]">Project Scope &amp; Consultation</h3>
                      <span className="text-[11px] font-mono text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded font-semibold border border-[#DBEAFE]">CONFIDENTIAL</span>
                    </div>

                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5 font-mono">
                          Full Name *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Dr. Alexander Wright"
                          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5 font-mono">
                          Work Email *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="alexander@enterprise.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Company & Interested Service Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5 font-mono">
                          Organization / Company
                        </label>
                        <input
                          {...register("company")}
                          placeholder="Global Horizons Corp"
                          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5 font-mono">
                          Area of Interest *
                        </label>
                        <select
                          {...register("service_interested")}
                          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                        >
                          <option value="AI and Machine Learning">AI &amp; Machine Learning</option>
                          <option value="Generative AI & Autonomous Agents">Generative AI &amp; Autonomous Agents</option>
                          <option value="Computer Vision">Computer Vision &amp; Edge Inferencing</option>
                          <option value="Web Application Development">Web Application Development</option>
                          <option value="Full-Stack Engineering">Full-Stack Software Engineering</option>
                          <option value="Data Analytics & BI">Data Analytics &amp; BI</option>
                          <option value="Intelligent Automation">Intelligent Automation / RPA</option>
                          <option value="Cloud Transformation">Cloud &amp; Sovereign Migration</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5 font-mono">
                        Estimated Budget Allocation
                      </label>
                      <select
                        {...register("budget")}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                      >
                        <option value="< $50k">Exploratory / Discovery (&lt; $50k)</option>
                        <option value="$50k - $150k">$50,000 — $150,000</option>
                        <option value="$150k - $500k">$150,000 — $500,000</option>
                        <option value="$500k+">Strategic Enterprise Program ($500k+)</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5 font-mono">
                        Project Scope &amp; Architecture Requirements *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Briefly describe your objectives, data volumes, latency constraints, or system challenges..."
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-rose-600">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Routing Parameters to Solution Architect...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Technical Consultation Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
