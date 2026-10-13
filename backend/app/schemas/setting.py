from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class SettingItem(BaseModel):
    key: str
    value: str
    description: Optional[str] = None
    category: Optional[str] = "general"

class SettingUpdate(BaseModel):
    settings: Dict[str, str]

class SettingResponse(SettingItem):
    id: int
    updated_at: datetime

    class Config:
        from_attributes = True
