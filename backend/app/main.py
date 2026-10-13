import os
import logging
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from app.config import settings
from app.database import engine, Base, get_db
from app.models import User, SiteSetting, Service, Project, Insight, Enquiry
from app.utils.seed_data import seed_database
from app.routers import (
    auth_router,
    settings_router,
    services_router,
    projects_router,
    insights_router,
    enquiries_router,
    media_router,
    stats_router,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cube_ai")

app = FastAPI(
    title="Cube AI Solution API",
    description="Enterprise API powering Cube AI Solution website and CMS",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for seamless development and production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists and mount static files
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Routers under /api
app.include_router(auth_router, prefix="/api")
app.include_router(settings_router, prefix="/api")
app.include_router(services_router, prefix="/api")
app.include_router(projects_router, prefix="/api")
app.include_router(insights_router, prefix="/api")
app.include_router(enquiries_router, prefix="/api")
app.include_router(media_router, prefix="/api")
app.include_router(stats_router, prefix="/api")

@app.on_event("startup")
def on_startup():
    try:
        logger.info("Initializing database schema...")
        Base.metadata.create_all(bind=engine)
        db = Session(bind=engine)
        seed_database(db)
        db.close()
        logger.info("Database schema and seeds initialized successfully.")
    except Exception as e:
        logger.error(f"Error during database startup: {e}")

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "Cube AI Solution API",
        "version": "1.0.0"
    }

@app.post("/api/seed")
def trigger_seed(db: Session = Depends(get_db)):
    seed_database(db)
    return {"message": "Database reseeded successfully"}
