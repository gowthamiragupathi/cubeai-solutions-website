import apiClient from "./client";

// Fallback demo data in case backend server is initializing
export const FALLBACK_SETTINGS = {
  hero_headline: "Engineering Intelligence. Building What's Next.",
  hero_subheadline: "We build intelligent digital experiences, AI-powered solutions and scalable software that help businesses move forward.",
  hero_cta_primary: "Explore Our Solutions",
  hero_cta_secondary: "Start a Project",
  stat_solutions_delivered: "150+",
  stat_technologies_mastered: "40+",
  stat_industries_served: "18+",
  stat_projects_completed: "320+",
  about_headline: "Architecting the Future of Enterprise AI & High-Performance Engineering",
  about_description: "Cube AI Solution was founded to bridge the gap between theoretical artificial intelligence and mission-critical production systems. We partner with forward-thinking enterprises to deliver transformative intelligence, enterprise scalability, and flawless digital architecture.",
  contact_email: "contact@cubeai.com",
  contact_phone: "+1 (800) 555-CUBE",
  contact_address: "Cube AI Innovation Lab, Suite 800, Silicon Corridor"
};

export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const response = await apiClient.post("/auth/login", { email, password });
      return response.data;
    },
    me: async () => {
      const response = await apiClient.get("/auth/me");
      return response.data;
    },
  },

  // Settings
  settings: {
    getAll: async () => {
      try {
        const response = await apiClient.get("/settings");
        return response.data;
      } catch (err) {
        return FALLBACK_SETTINGS;
      }
    },
    update: async (settingsMap) => {
      const response = await apiClient.put("/settings", { settings: settingsMap });
      return response.data;
    },
  },

  // Services
  services: {
    getAll: async () => {
      try {
        const response = await apiClient.get("/services");
        return response.data;
      } catch (err) {
        return [];
      }
    },
    getOne: async (slugOrId) => {
      const response = await apiClient.get(`/services/${slugOrId}`);
      return response.data;
    },
    create: async (data) => {
      const response = await apiClient.post("/services", data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.put(`/services/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/services/${id}`);
      return response.data;
    },
  },

  // Projects
  projects: {
    getAll: async (category) => {
      try {
        const params = category && category !== "All" ? { category } : {};
        const response = await apiClient.get("/projects", { params });
        return response.data;
      } catch (err) {
        return [];
      }
    },
    getOne: async (slugOrId) => {
      const response = await apiClient.get(`/projects/${slugOrId}`);
      return response.data;
    },
    create: async (data) => {
      const response = await apiClient.post("/projects", data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.put(`/projects/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/projects/${id}`);
      return response.data;
    },
  },

  // Insights
  insights: {
    getAll: async () => {
      try {
        const response = await apiClient.get("/insights");
        return response.data;
      } catch (err) {
        return [];
      }
    },
    getOne: async (slugOrId) => {
      const response = await apiClient.get(`/insights/${slugOrId}`);
      return response.data;
    },
    create: async (data) => {
      const response = await apiClient.post("/insights", data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.put(`/insights/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/insights/${id}`);
      return response.data;
    },
  },

  // Enquiries
  enquiries: {
    submit: async (data) => {
      const response = await apiClient.post("/enquiries", data);
      return response.data;
    },
    getAll: async (statusFilter) => {
      const params = statusFilter ? { status_filter: statusFilter } : {};
      const response = await apiClient.get("/enquiries", { params });
      return response.data;
    },
    updateStatus: async (id, status, notes) => {
      const response = await apiClient.patch(`/enquiries/${id}`, { status, notes });
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/enquiries/${id}`);
      return response.data;
    },
  },

  // Media
  media: {
    upload: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiClient.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  },

  // Dashboard Stats & Real-Time Telemetry
  stats: {
    getDashboard: async () => {
      const response = await apiClient.get("/stats/dashboard");
      return response.data;
    },
    getTelemetry: async () => {
      try {
        const response = await apiClient.get("/stats/telemetry");
        return response.data;
      } catch (err) {
        return null;
      }
    },
  },
};

