from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models.insight import Insight
from app.models.user import User
from app.schemas.insight import InsightCreate, InsightUpdate, InsightResponse
from app.utils.auth import get_current_active_admin

router = APIRouter(prefix="/insights", tags=["Insights"])

@router.get("", response_model=List[InsightResponse])
def get_insights(published_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(Insight)
    if published_only:
        query = query.filter(Insight.is_published == True)
    return query.order_by(Insight.published_at.desc()).all()

@router.get("/{slug_or_id}", response_model=InsightResponse)
def get_insight(slug_or_id: str, db: Session = Depends(get_db)):
    if slug_or_id.isdigit():
        insight = db.query(Insight).filter(Insight.id == int(slug_or_id)).first()
    else:
        insight = db.query(Insight).filter(Insight.slug == slug_or_id).first()
    if not insight:
        raise HTTPException(status_code=404, detail="Insight article not found")
    return insight

@router.post("", response_model=InsightResponse, status_code=status.HTTP_201_CREATED)
def create_insight(
    payload: InsightCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    existing = db.query(Insight).filter(Insight.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Article with this slug already exists")
    insight = Insight(**payload.model_dump())
    db.add(insight)
    db.commit()
    db.refresh(insight)
    return insight

@router.put("/{insight_id}", response_model=InsightResponse)
def update_insight(
    insight_id: int,
    payload: InsightUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    insight = db.query(Insight).filter(Insight.id == insight_id).first()
    if not insight:
        raise HTTPException(status_code=404, detail="Article not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(insight, field, val)
    db.commit()
    db.refresh(insight)
    return insight

@router.delete("/{insight_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_insight(
    insight_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    insight = db.query(Insight).filter(Insight.id == insight_id).first()
    if not insight:
        raise HTTPException(status_code=404, detail="Article not found")
    db.delete(insight)
    db.commit()
    return None
