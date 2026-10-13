from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    client = Column(String(255), nullable=True)
    category = Column(String(100), default="Enterprise AI")
    summary = Column(Text, nullable=False)
    problem = Column(Text, nullable=True)
    solution = Column(Text, nullable=True)
    outcome = Column(Text, nullable=True)
    technologies_json = Column(Text, nullable=True)  # JSON serialized list of tech tags
    metrics_json = Column(Text, nullable=True)       # JSON serialized list of impact key-values
    image_url = Column(String(500), nullable=True)
    is_featured = Column(Boolean, default=True)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
