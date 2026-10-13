from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    service_interested: Optional[str] = None
    budget: Optional[str] = None
    message: str

class EnquiryUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class EnquiryResponse(BaseModel):
    id: int
    name: str
    email: str
    company: Optional[str] = None
    service_interested: Optional[str] = None
    budget: Optional[str] = None
    message: str
    status: str
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
