from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.workspaces import router as workspace_router
from app.api.operations import router as ops_router
from app.core.database import init_db
app = FastAPI()

@app.on_event("startup")
def startup_event():
    # Tables already exist based on your Postgres screenshot
    # This will now just verify the connection
    init_db()
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workspace_router)
app.include_router(ops_router)

@app.get("/")
async def health():
    return {"status": "ok"}