from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    slug: str
    client: Optional[str] = None
    category: Optional[str] = "Enterprise AI"
    summary: str
    problem: Optional[str] = None
    solution: Optional[str] = None
    outcome: Optional[str] = None
    technologies_json: Optional[str] = "[]"
    metrics_json: Optional[str] = "[]"
    image_url: Optional[str] = None
    is_featured: Optional[bool] = True
    order_index: Optional[int] = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    client: Optional[str] = None
    category: Optional[str] = None
    summary: Optional[str] = None
    problem: Optional[str] = None
    solution: Optional[str] = None
    outcome: Optional[str] = None
    technologies_json: Optional[str] = None
    metrics_json: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = None
    order_index: Optional[int] = None

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
