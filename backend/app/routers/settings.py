from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, List
from app.database import get_db
from app.models.setting import SiteSetting
from app.models.user import User
from app.schemas.setting import SettingUpdate, SettingResponse
from app.utils.auth import get_current_active_admin

router = APIRouter(prefix="/settings", tags=["Settings"])

@router.get("", response_model=Dict[str, str])
def get_all_settings(db: Session = Depends(get_db)):
    settings_records = db.query(SiteSetting).all()
    return {s.key: s.value for s in settings_records}

@router.get("/detailed", response_model=List[SettingResponse])
def get_detailed_settings(db: Session = Depends(get_db)):
    return db.query(SiteSetting).all()

@router.put("", response_model=Dict[str, str])
def update_settings(
    payload: SettingUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    for key, value in payload.settings.items():
        record = db.query(SiteSetting).filter(SiteSetting.key == key).first()
        if record:
            record.value = value
        else:
            new_record = SiteSetting(key=key, value=value, category="general")
            db.add(new_record)
    db.commit()
    
    updated = db.query(SiteSetting).all()
    return {s.key: s.value for s in updated}
