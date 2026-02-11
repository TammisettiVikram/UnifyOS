from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import workspaces, operations
# Do NOT call init_db() at the top level here

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workspaces.router)
app.include_router(operations.router)

@app.get("/")
def health():
    return {"status": "online"}