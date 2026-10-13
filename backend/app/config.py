import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Cube AI Solution API"
    PROJECT_VERSION: str = "1.0.0"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./cube.db")
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "cube_ai_super_secret_jwt_key_2026_enterprise_secure_token")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    
    # Admin Seed
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "admin@cubeai.com")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "Admin@Cube2026!")
    ADMIN_NAME: str = os.getenv("ADMIN_NAME", "Cube Administrator")
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://localhost:8000"
    ]
    
    # Media
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
    MAX_UPLOAD_SIZE_MB: int = int(os.getenv("MAX_UPLOAD_SIZE_MB", "10"))

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
