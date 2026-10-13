import json
import logging
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.setting import SiteSetting
from app.models.service import Service
from app.models.project import Project
from app.models.insight import Insight
from app.models.enquiry import Enquiry
from app.utils.auth import get_password_hash
from app.config import settings

logger = logging.getLogger(__name__)

DEFAULT_SETTINGS = [
    {"key": "hero_headline", "value": "Engineering Intelligence. Building What's Next.", "category": "hero", "description": "Main hero title"},
    {"key": "hero_subheadline", "value": "We build intelligent digital experiences, AI-powered solutions and scalable software that help businesses move forward.", "category": "hero", "description": "Hero supporting text"},
    {"key": "hero_cta_primary", "value": "Explore Our Solutions", "category": "hero", "description": "Primary hero CTA text"},
    {"key": "hero_cta_secondary", "value": "Start a Project", "category": "hero", "description": "Secondary hero CTA text"},
    {"key": "stat_solutions_delivered", "value": "150+", "category": "stats", "description": "Solutions delivered counter"},
    {"key": "stat_technologies_mastered", "value": "40+", "category": "stats", "description": "Technologies mastered counter"},
    {"key": "stat_industries_served", "value": "18+", "category": "stats", "description": "Industries served counter"},
    {"key": "stat_projects_completed", "value": "320+", "category": "stats", "description": "Projects completed counter"},
    {"key": "about_headline", "value": "Architecting the Future of Enterprise AI & High-Performance Engineering", "category": "about", "description": "About section heading"},
    {"key": "about_description", "value": "Cube AI Solution was founded to bridge the gap between theoretical artificial intelligence and mission-critical production systems. We partner with forward-thinking enterprises to deliver transformative intelligence, enterprise scalability, and flawless digital architecture.", "category": "about", "description": "About description"},
    {"key": "contact_email", "value": "contact@cubeai.com", "category": "contact", "description": "General enquiry email"},
    {"key": "contact_phone", "value": "+1 (800) 555-CUBE", "category": "contact", "description": "Phone number"},
    {"key": "contact_address", "value": "Cube AI Innovation Lab, Suite 800, Silicon Corridor", "category": "contact", "description": "HQ Address"},
]

DEFAULT_SERVICES = [
    {
        "title": "AI & Machine Learning",
        "slug": "ai-machine-learning",
        "tagline": "Predictive Models & Deep Learning Architecture",
        "description": "Custom neural networks, predictive algorithms, computer vision, and NLP models engineered for enterprise workflows and mission-critical accuracy.",
        "icon_name": "Brain",
        "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        "features_json": json.dumps(["Custom Deep Learning Models", "Edge AI & Real-Time Inferencing", "Predictive Analytics & Forecasting", "Computer Vision Systems"]),
        "capabilities_json": json.dumps(["PyTorch & TensorFlow", "ONNX Optimization", "GPU Cluster Orchestration", "MLOps & Automated Drift Detection"]),
        "order_index": 1,
    },
    {
        "title": "Generative AI & Autonomous Agents",
        "slug": "generative-ai-agents",
        "tagline": "Multi-Agent Architectures & RAG Intelligence",
        "description": "Bespoke LLM fine-tuning, private retrieval-augmented generation (RAG) pipelines, and collaborative autonomous agent swarms that automate complex cognitive processes.",
        "icon_name": "Sparkles",
        "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "features_json": json.dumps(["Autonomous Multi-Agent Swarms", "Enterprise Private RAG Pipelines", "Domain-Specific LLM Fine-Tuning", "Cognitive Workflow Automation"]),
        "capabilities_json": json.dumps(["LangChain & LlamaIndex", "Vector DBs (Pinecone, Qdrant)", "Local Open-Source LLMs", "Guardrails & Safety Alignment"]),
        "order_index": 2,
    },
    {
        "title": "Web Application Development",
        "slug": "web-application-development",
        "tagline": "Ultra-Fast, Cinematic Digital Interfaces",
        "description": "Modern React, Next.js, and Vite web applications designed with uncompromising visual elegance, fluid motion graphics, and sub-second performance.",
        "icon_name": "Globe",
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "features_json": json.dumps(["Interactive 3D & Framer Motion", "Server-Driven Dynamic UI", "Enterprise Design Systems", "Progressive Web Applications"]),
        "capabilities_json": json.dumps(["React 19 & Next.js", "Tailwind CSS & shadcn", "WebGL & Three.js Canvas", "Sub-second Web Vitals"]),
        "order_index": 3,
    },
    {
        "title": "Full-Stack Software Engineering",
        "slug": "full-stack-engineering",
        "tagline": "Resilient Microservices & Reactive Systems",
        "description": "End-to-end software engineering leveraging distributed microservices, event-driven backends, and fault-tolerant cloud backbones that scale effortlessly.",
        "icon_name": "Code2",
        "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        "features_json": json.dumps(["High-Throughput Distributed APIs", "Microservices & Event Mesh", "CQRS & Event Sourcing", "Zero-Downtime CI/CD Pipelines"]),
        "capabilities_json": json.dumps(["FastAPI, Go & Node.js", "PostgreSQL & Redis Clusters", "Kafka & RabbitMQ", "Docker & Kubernetes"]),
        "order_index": 4,
    },
    {
        "title": "Data Analytics & Business Intelligence",
        "slug": "data-analytics-bi",
        "tagline": "Real-Time Telemetry & Actionable Dashboards",
        "description": "Transforming fragmented enterprise data lakes into unified, real-time analytics engines with interactive executive dashboards and automated KPI forecasting.",
        "icon_name": "BarChart3",
        "image_url": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
        "features_json": json.dumps(["Real-Time Streaming Telemetry", "Automated Executive Dashboards", "Modern Data Warehousing", "Anomaly Detection Pipelines"]),
        "capabilities_json": json.dumps(["Snowflake & BigQuery", "dbt Data Modeling", "Apache Spark Processing", "Self-Healing ETL Pipelines"]),
        "order_index": 5,
    },
    {
        "title": "Intelligent Automation",
        "slug": "intelligent-automation",
        "tagline": "RPA & Autonomous Industrial Workflows",
        "description": "Eliminating manual bottlenecks with AI-driven Robotic Process Automation, document comprehension, automated triage, and intelligent system orchestration.",
        "icon_name": "Cpu",
        "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        "features_json": json.dumps(["Intelligent Document Processing", "Autonomous Exception Handling", "Legacy System API Bridging", "24/7 Cognitive Task Execution"]),
        "capabilities_json": json.dumps(["OCR & Vision Transformers", "Workflow State Machines", "Audit Logging & Compliance", "Human-in-the-Loop Safeguards"]),
        "order_index": 6,
    },
    {
        "title": "Cloud & Digital Transformation",
        "slug": "cloud-digital-transformation",
        "tagline": "Multi-Cloud Modernization & Sovereign Infrastructure",
        "description": "Migrating mission-critical legacy applications to secure cloud-native architectures with automated scaling, zero-trust security, and sovereign compliance.",
        "icon_name": "Cloud",
        "image_url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        "features_json": json.dumps(["Multi-Cloud Infrastructure (AWS/GCP/Azure)", "Kubernetes GitOps Architecture", "Zero-Trust Identity & Compliance", "Cloud Cost Optimization"]),
        "capabilities_json": json.dumps(["Terraform & OpenTofu", "Istio Service Mesh", "SOC2 & ISO 27001 Controls", "Disaster Recovery Automation"]),
        "order_index": 7,
    }
]

DEFAULT_PROJECTS = [
    {
        "title": "Autonomous Supply Chain Optimization Engine",
        "slug": "autonomous-supply-chain",
        "client": "Apex Global Logistics",
        "category": "Enterprise AI & Predictive Logistics",
        "summary": "Real-time AI telemetry platform processing millions of sensor events across 4 continents to dynamically reroute cargo and minimize fuel expenditure.",
        "problem": "Global freight disruption caused severe forecasting latency, leading to millions in demurrage charges and suboptimal route decisions.",
        "solution": "Cube AI engineered an event-driven multi-agent simulation engine coupled with real-time AIS marine data and predictive machine learning models.",
        "outcome": "Reduced route delivery deviations by 34%, saved over $18.2M in annual fuel allocations, and decreased response latency from 6 hours to 45 seconds.",
        "technologies_json": json.dumps(["PyTorch", "FastAPI", "Apache Kafka", "PostgreSQL", "React", "Docker"]),
        "metrics_json": json.dumps([{"label": "Route Efficiency", "value": "+34%"}, {"label": "Annual Cost Savings", "value": "$18.2M"}, {"label": "Decision Latency", "value": "45s"}]),
        "image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        "is_featured": True,
        "order_index": 1,
    },
    {
        "title": "Enterprise Generative AI Knowledge Matrix",
        "slug": "enterprise-genai-matrix",
        "client": "Vanguard Biotech & Pharma",
        "category": "Generative AI & Private RAG",
        "summary": "Self-hosted, air-gapped generative knowledge system enabling clinical researchers to interrogate 20+ years of proprietary trial dossiers in milliseconds.",
        "problem": "Pharma research scientists spent up to 14 hours weekly manually searching thousands of unstructured FDA filings and internal laboratory logs.",
        "solution": "Built a sovereign retrieval-augmented generation mesh with strict citation integrity, vector indexing of 4M+ documents, and sub-50ms latency.",
        "outcome": "Accelerated compound feasibility screening by 65% with 99.8% factual citation precision verified by lead toxicologists.",
        "technologies_json": json.dumps(["Llama-3 Fine-Tune", "Qdrant Vector DB", "Python", "React", "Tailwind CSS"]),
        "metrics_json": json.dumps([{"label": "Research Speedup", "value": "65%"}, {"label": "Indexed Dossiers", "value": "4.2M+"}, {"label": "Citation Accuracy", "value": "99.8%"}]),
        "image_url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
        "is_featured": True,
        "order_index": 2,
    },
    {
        "title": "Precision Computer Vision Quality Sentinel",
        "slug": "precision-cv-sentinel",
        "client": "Helios Semiconductor & Hardware",
        "category": "Computer Vision & Edge AI",
        "summary": "High-speed optical inspection system utilizing micro-second inference on production wafer assembly lines to detect microscopic silicon defects.",
        "problem": "Manual QA sampling only inspected 3% of production batches, letting sub-micron surface fractures slip into final chip packaging.",
        "solution": "Deployed custom YOLO-based edge inference nodes mounted onto robotic pick-and-place lines running at 120 FPS.",
        "outcome": "Yield defect escape rate dropped from 4.1% to 0.003%, saving an estimated $42M annually in silicon scrap.",
        "technologies_json": json.dumps(["TensorRT", "OpenCV", "FastAPI", "WebSockets", "Three.js"]),
        "metrics_json": json.dumps([{"label": "Inspection Speed", "value": "120 FPS"}, {"label": "Defect Escape Rate", "value": "0.003%"}, {"label": "Scrap Reductions", "value": "$42M"}]),
        "image_url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        "is_featured": True,
        "order_index": 3,
    },
    {
        "title": "Next-Gen Multi-Agent Financial Risk Sentinel",
        "slug": "multi-agent-financial-sentinel",
        "client": "Quantum Capital Partners",
        "category": "Autonomous Agents & FinTech",
        "summary": "Collaborative autonomous swarm modeling cross-asset contagion, liquidity stress tests, and automated regulatory reporting in real time.",
        "problem": "Risk calculations were executed as end-of-day batch jobs, leaving traders blind to rapid intra-day liquidity shocks across crypto and fixed income.",
        "solution": "Designed a decentralized agent architecture running stochastic Monte Carlo simulations continuously on distributed GPU workers.",
        "outcome": "Enabled continuous real-time Value-at-Risk (VaR) telemetry and protected over $3.4B in asset value during black swan volatility events.",
        "technologies_json": json.dumps(["Rust", "FastAPI", "PostgreSQL", "Redis", "Next.js", "Chart.js"]),
        "metrics_json": json.dumps([{"label": "Protected Capital", "value": "$3.4B"}, {"label": "Telemetry Interval", "value": "Real-time"}, {"label": "Scenario Tests/sec", "value": "100k+"}]),
        "image_url": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
        "is_featured": True,
        "order_index": 4,
    }
]

DEFAULT_INSIGHTS = [
    {
        "title": "Architecting Autonomous Multi-Agent Systems in Production Environments",
        "slug": "architecting-multi-agent-systems",
        "excerpt": "A deep dive into orchestration loops, state machines, consensus protocols, and safety guardrails when deploying multi-agent swarms at enterprise scale.",
        "content": """Autonomous AI agent swarms represent a paradigm shift from deterministic software to goal-oriented orchestration. However, moving agentic workflows from toy prototypes to mission-critical enterprise environments introduces severe challenges in state convergence, runaway cost loops, and stochastic drift.

### Core Architectural Pillars
1. **Decoupled Memory & Reflex Layers**: Agents require segregated short-term scratchpad context and long-term vector semantic embeddings.
2. **Deterministic Guardrails**: LLMs propose actions; deterministic validators verify safety boundaries before execution.
3. **Structured Tool Schemas**: Strict Pydantic contracts ensure that agent actions produce verifiable, reproducible side effects.

By enforcing these constraints, Cube AI clients achieve up to 99.9% task reliability with autonomous swarms.""",
        "category": "AI Research",
        "read_time": "6 min read",
        "author": "Dr. Sarah Chen, Chief AI Scientist",
        "cover_image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        "tags_json": json.dumps(["Multi-Agent", "Autonomous AI", "Enterprise Architecture"]),
        "is_published": True,
    },
    {
        "title": "Zero-Loss RAG: Overcoming Context Hallucination in Clinical & Legal Domains",
        "slug": "zero-loss-rag-precision",
        "excerpt": "How hybrid sparse-dense retrieval, reranking transformers, and proposition-level indexing eliminate hallucinations in regulated industries.",
        "content": """Traditional naïve RAG relies solely on standard cosine similarity over dense vector embeddings. While adequate for casual chat, this approach catastrophically fails when precision, numerical details, or regulatory clauses are at stake.

### The Hybrid Pipeline
In our proprietary enterprise implementations, Cube AI fuses:
- BM25 sparse keyword indices with modern ColBERT dense late-interaction representations.
- Cross-encoder rerankers to surface exact paragraph matches.
- Automated citation attribution engines that cross-check every single generated token against the source corpus.

The outcome is mathematical provability in generative response generation.""",
        "category": "Engineering",
        "read_time": "5 min read",
        "author": "Marcus Vance, Lead Systems Architect",
        "cover_image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        "tags_json": json.dumps(["RAG", "Vector Search", "LLM Precision"]),
        "is_published": True,
    },
    {
        "title": "The Next Decade of Industrial Automation: Edge Vision Meets Foundation Models",
        "slug": "next-decade-industrial-automation",
        "excerpt": "Why combining localized sub-millisecond edge vision with multi-modal foundation models is redefining smart manufacturing lines worldwide.",
        "content": """Industrial automation is shifting from rigid robotic arms running static PLC logic to adaptive physical intelligence. By mounting low-power edge accelerators on assembly floors and streaming aggregated telemetry to central foundation models, factories achieve real-time self-healing workflows.

When a manufacturing anomaly is flagged, the vision transformer isolates the anomaly in micro-seconds, while the higher-level foundation model generates diagnostic repair runbooks for floor engineers within seconds.

This symbiotic architecture creates unprecedented factory uptime and zero-waste throughput.""",
        "category": "Industrial Tech",
        "read_time": "7 min read",
        "author": "Elena Rostova, VP of Industrial Solutions",
        "cover_image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        "tags_json": json.dumps(["Industrial AI", "Computer Vision", "Smart Manufacturing"]),
        "is_published": True,
    }
]

def seed_database(db: Session):
    # 1. Admin User
    admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
    if not admin:
        logger.info(f"Creating default admin user: {settings.ADMIN_EMAIL}")
        admin = User(
            email=settings.ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
            full_name=settings.ADMIN_NAME,
            role="admin",
            is_active=True,
            is_superuser=True
        )
        db.add(admin)
        db.commit()

    # 2. Site Settings
    for item in DEFAULT_SETTINGS:
        existing = db.query(SiteSetting).filter(SiteSetting.key == item["key"]).first()
        if not existing:
            setting_obj = SiteSetting(**item)
            db.add(setting_obj)
    db.commit()

    # 3. Services
    for svc in DEFAULT_SERVICES:
        existing = db.query(Service).filter(Service.slug == svc["slug"]).first()
        if not existing:
            svc_obj = Service(**svc)
            db.add(svc_obj)
    db.commit()

    # 4. Projects
    for prj in DEFAULT_PROJECTS:
        existing = db.query(Project).filter(Project.slug == prj["slug"]).first()
        if not existing:
            prj_obj = Project(**prj)
            db.add(prj_obj)
    db.commit()

    # 5. Insights
    for ins in DEFAULT_INSIGHTS:
        existing = db.query(Insight).filter(Insight.slug == ins["slug"]).first()
        if not existing:
            ins_obj = Insight(**ins)
            db.add(ins_obj)
    db.commit()

    logger.info("Database seeding completed successfully.")
