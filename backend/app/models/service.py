from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime
from app.database import Base

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    tagline = Column(String(255), nullable=True)
    description = Column(Text, nullable=False)
    icon_name = Column(String(100), default="Cpu")
    image_url = Column(String(500), nullable=True)
    features_json = Column(Text, nullable=True)  # JSON serialized list of feature strings
    capabilities_json = Column(Text, nullable=True)
    order_index = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
