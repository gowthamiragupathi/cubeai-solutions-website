import logging
from app.database import engine, Base, SessionLocal
from app.models import User, SiteSetting, Service, Project, Insight, Enquiry
from app.utils.seed_data import seed_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init():
    logger.info("Creating all database tables...")
    Base.metadata.create_all(bind=engine)
    logger.info("Seeding initial data...")
    db = SessionLocal()
    try:
        seed_database(db)
        logger.info("Database initialized and seeded successfully!")
    finally:
        db.close()

if __name__ == "__main__":
    init()
