import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Using absolute imports relative to the 'backend' directory
from app.core.config import settings
from app.core.database import init_db
from app.api import workspaces, operations

# Initialize database tables on start
init_db()

app = FastAPI(title="CareOps API")

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
def root():
    return {"message": "CareOps API is live"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)