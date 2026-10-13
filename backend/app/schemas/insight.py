from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InsightBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    category: Optional[str] = "Engineering"
    read_time: Optional[str] = "5 min read"
    author: Optional[str] = "Cube AI Research Team"
    cover_image: Optional[str] = None
    tags_json: Optional[str] = "[]"
    is_published: Optional[bool] = True

class InsightCreate(InsightBase):
    pass

class InsightUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    read_time: Optional[str] = None
    author: Optional[str] = None
    cover_image: Optional[str] = None
    tags_json: Optional[str] = None
    is_published: Optional[bool] = None

class InsightResponse(InsightBase):
    id: int
    published_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
