from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Use the full module path
from app.api.workspaces import router as ws_router
from app.api.operations import router as op_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ws_router)
app.include_router(op_router)

@app.get("/")
def health():
    return {"status": "ok"}