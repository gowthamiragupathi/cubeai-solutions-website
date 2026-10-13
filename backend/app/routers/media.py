import os
import uuid
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from app.config import settings
from app.models.user import User
from app.utils.auth import get_current_active_admin

router = APIRouter(prefix="/media", tags=["Media Management"])

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".mp4"}

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    admin: User = Depends(get_current_active_admin)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File extension '{ext}' not allowed. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    filename = f"{uuid.uuid4().hex[:12]}_{file.filename.replace(' ', '_')}"
    filepath = os.path.join(settings.UPLOAD_DIR, filename)

    contents = await file.read()
    max_size_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    if len(contents) > max_size_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds limit of {settings.MAX_UPLOAD_SIZE_MB}MB"
        )
    
    with open(filepath, "wb") as buffer:
        buffer.write(contents)
    
    file_url = f"/uploads/{filename}"
    return {
        "url": file_url,
        "filename": filename,
        "original_name": file.filename,
        "size": len(contents)
    }
