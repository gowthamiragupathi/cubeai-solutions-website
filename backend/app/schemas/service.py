from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ServiceBase(BaseModel):
    title: str
    slug: str
    tagline: Optional[str] = None
    description: str
    icon_name: Optional[str] = "Cpu"
    image_url: Optional[str] = None
    features_json: Optional[str] = "[]"
    capabilities_json: Optional[str] = "[]"
    order_index: Optional[int] = 0
    is_active: Optional[bool] = True

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    tagline: Optional[str] = None
    description: Optional[str] = None
    icon_name: Optional[str] = None
    image_url: Optional[str] = None
    features_json: Optional[str] = None
    capabilities_json: Optional[str] = None
    order_index: Optional[int] = None
    is_active: Optional[bool] = None

class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
