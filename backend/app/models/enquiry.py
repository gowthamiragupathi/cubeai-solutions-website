from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base

class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    company = Column(String(255), nullable=True)
    service_interested = Column(String(255), nullable=True)
    budget = Column(String(100), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="new")  # new, contacted, in_progress, archived
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
