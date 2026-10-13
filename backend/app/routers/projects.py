from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.project import Project
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.utils.auth import get_current_active_admin

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectResponse])
def get_projects(category: Optional[str] = None, featured_only: bool = False, db: Session = Depends(get_db)):
    query = db.query(Project)
    if featured_only:
        query = query.filter(Project.is_featured == True)
    if category and category.lower() != "all":
        query = query.filter(Project.category.ilike(f"%{category}%"))
    return query.order_by(Project.order_index.asc()).all()

@router.get("/{slug_or_id}", response_model=ProjectResponse)
def get_project(slug_or_id: str, db: Session = Depends(get_db)):
    if slug_or_id.isdigit():
        project = db.query(Project).filter(Project.id == int(slug_or_id)).first()
    else:
        project = db.query(Project).filter(Project.slug == slug_or_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    existing = db.query(Project).filter(Project.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Project with this slug already exists")
    project = Project(**payload.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = payload.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(project, field, val)
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_active_admin)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return None
