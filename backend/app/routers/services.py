from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.service import Service
from app.models.user import User
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from app.utils.auth import get_current_active_admin

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("", response_model=List[ServiceResponse])
def get_services(active_only: bool = False, db: Session = Depends(get_db)):
    query = db.query(Service)
    if active_only:
        query = query.filter(Service.is_active == True)
    return query.order_index(Service.order_index.asc()).all() if hasattr(query, 'order_index') else query.order_by(Service.order_index.asc()).all()

@router.get("/{slug_or_id}", response_model=ServiceResponse)
def get_service(slug_or_id: str, db: Session = Depends(get_db)):
    if slug_or_id.isdigit():
        service = db.query(Service).filter(Service.id == int(slug_or_id)).first()
    else:
        service = db.query(Service).filter(Service.slug == slug_or_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(
    payload: ServiceCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    existing = db.query(Service).filter(Service.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Service with this slug already exists")
    service = Service(**payload.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(
    service_id: int,
    payload: ServiceUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(service, field, val)
    db.commit()
    db.refresh(service)
    return service

@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(service)
    db.commit()
    return None
