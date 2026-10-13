import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      quoteBefore: "A strategic partner who ",
      highlight1: "executed projects on-time with high quality",
      quoteMiddle: " and brings genuine architectural innovation to the table on how we can meet our business goals and ",
      highlight2: "accelerate our AI transformation.",
      quoteAfter: "",
      authorRole: "Executive VP of Digital Systems",
      organization: "Leading Global Healthcare & Health Benefits Network",
    },
    {
      id: 2,
      quoteBefore: "The CubeAI engineering team did a phenomenal job deploying our autonomous multi-agent pipelines. ",
      highlight1: "Their in-depth knowledge of distributed clusters",
      quoteMiddle: " and real-time inference telemetry is ",
      highlight2: "exceptionally detailed and solution oriented.",
      quoteAfter: "",
      authorRole: "Chief Information Officer",
      organization: "Fortune 500 Industrial Manufacturing & Logistics Group",
    },
    {
      id: 3,
      quoteBefore: "We have ",
      highlight1: "reduced our quantitative risk verification cycles by 70%",
      quoteMiddle: " while maintaining strict regulatory compliance. The speed at which their team delivers new capabilities is ",
      highlight2: "unmatched in the enterprise sector.",
      quoteAfter: "",
      authorRole: "Global Head of Quantitative Architecture",
      organization: "Tier-1 Investment Banking & FinTech Institution",
    },
    {
      id: 4,
      quoteBefore: "CubeAI replaced our brittle manual inspection line with ",
      highlight1: "microsecond computer vision running at 120 FPS",
      quoteMiddle: ". The defect escape rate dropped to near zero, yielding ",
      highlight2: "over $42M in direct annual scrap reductions.",
      quoteAfter: "",
      authorRole: "VP of Semiconductor Operations",
      organization: "Advanced Optical & Hardware Manufacturing Corp",
    },
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 sm:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            Section Header with Kicker, Title & Reference Video < > Carousel Arrows
            (Frame 021 in reference video)
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="text-xs sm:text-sm font-bold font-mono tracking-widest uppercase text-[#2563EB] mb-2">
              TESTIMONIALS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          {/* Carousel Arrows (as in reference video Frame 021) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollLeft}
              aria-label="Previous Testimonials"
              className="w-12 h-12 rounded-full border border-[#CBD5E1] hover:border-[#2563EB] bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center transition-all shadow-xs hover:shadow-sm focus:outline-hidden"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next Testimonials"
              className="w-12 h-12 rounded-full border border-[#CBD5E1] hover:border-[#2563EB] bg-white hover:bg-[#EFF6FF] text-[#0F172A] hover:text-[#2563EB] flex items-center justify-center transition-all shadow-xs hover:shadow-sm focus:outline-hidden"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            Testimonial Cards Carousel (Frame 021 in reference video)
            Light rounded cards with top quote badge & highlighted bold text
           ========================================================================= */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative min-w-[300px] sm:min-w-[360px] lg:min-w-[380px] p-8 sm:p-9 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#93C5FD] shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between shrink-0 snap-start group"
            >
              {/* Circular Quote Mark Badge at top center */}
              <div className="w-12 h-12 -mt-13 mx-auto rounded-full bg-slate-900 border-2 border-white text-white flex items-center justify-center shadow-md group-hover:bg-[#2563EB] transition-colors duration-300">
                <Quote className="w-5 h-5 fill-current" />
              </div>

              {/* Quote Body with highlighted bold text */}
              <div className="mt-4 text-[#334155] text-sm sm:text-base leading-relaxed text-center font-normal">
                "{item.quoteBefore}
                <strong className="text-[#0F172A] font-bold">{item.highlight1}</strong>
                {item.quoteMiddle}
                <strong className="text-[#0F172A] font-bold">{item.highlight2}</strong>
                {item.quoteAfter}"
              </div>

              {/* Author & Organization */}
              <div className="mt-8 pt-6 border-t border-[#F1F5F9] text-center">
                <div className="text-sm font-bold text-[#2563EB] tracking-tight">
                  {item.authorRole}
                </div>
                <div className="text-xs text-[#64748B] mt-1 font-medium">
                  {item.organization}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
