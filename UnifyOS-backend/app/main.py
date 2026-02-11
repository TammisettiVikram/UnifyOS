from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.api import workspaces
from app.api import workspaces, operations

init_db()

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(workspaces.router)
app.include_router(workspaces.router)
app.include_router(operations.router)

@app.get("/")
def health_check():
    return {"status": "CareOps API is fully operational"}