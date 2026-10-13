from app.routers.auth import router as auth_router
from app.routers.settings import router as settings_router
from app.routers.services import router as services_router
from app.routers.projects import router as projects_router
from app.routers.insights import router as insights_router
from app.routers.enquiries import router as enquiries_router
from app.routers.media import router as media_router
from app.routers.stats import router as stats_router

__all__ = [
    "auth_router",
    "settings_router",
    "services_router",
    "projects_router",
    "insights_router",
    "enquiries_router",
    "media_router",
    "stats_router"
]
