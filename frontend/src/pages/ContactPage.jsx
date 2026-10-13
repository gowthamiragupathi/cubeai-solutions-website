import React, { useEffect, useState } from "react";
import ContactSection from "../components/ContactSection";
import { api, FALLBACK_SETTINGS } from "../api/endpoints";

export const ContactPage = () => {
  const [settings, setSettings] = useState(FALLBACK_SETTINGS);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.settings.getAll();
        if (data) setSettings(data);
      } catch (e) {
        console.warn("Using default settings");
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="pt-28 sm:pt-32 min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <ContactSection settings={settings} />
    </div>
  );
};

export default ContactPage;
