from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.enquiry import Enquiry
from app.models.user import User
from app.schemas.enquiry import EnquiryCreate, EnquiryUpdate, EnquiryResponse
from app.utils.auth import get_current_active_admin

router = APIRouter(prefix="/enquiries", tags=["Enquiries"])

@router.post("", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
def submit_enquiry(payload: EnquiryCreate, db: Session = Depends(get_db)):
    enquiry = Enquiry(**payload.model_dump())
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)
    return enquiry

@router.get("", response_model=List[EnquiryResponse])
def get_enquiries(
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    query = db.query(Enquiry)
    if status_filter and status_filter.lower() != "all":
        query = query.filter(Enquiry.status == status_filter)
    return query.order_by(Enquiry.created_at.desc()).all()

@router.patch("/{enquiry_id}", response_model=EnquiryResponse)
def update_enquiry_status(
    enquiry_id: int,
    payload: EnquiryUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    if payload.status is not None:
        enquiry.status = payload.status
    if payload.notes is not None:
        enquiry.notes = payload.notes
    
    db.commit()
    db.refresh(enquiry)
    return enquiry

@router.delete("/{enquiry_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_enquiry(
    enquiry_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    db.delete(enquiry)
    db.commit()
    return None
