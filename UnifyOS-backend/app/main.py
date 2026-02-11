from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.workspaces import router as workspace_router
from app.api.operations import router as ops_router

app = FastAPI(title="CareOps API")

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
def health():
    return {"status": "ok"}