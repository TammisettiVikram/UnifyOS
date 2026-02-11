import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Using absolute imports relative to the 'backend' directory
from app.core.config import settings
from app.core.database import init_db
from app.api import workspaces, operations

app = FastAPI()

# Initialize database tables on start
@app.on_event("startup")
def on_startup():
    try:
        init_db()
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database init failed: {e}")

origins = [
    "http://localhost:5173",           # Local development
    "https://unify-os.vercel.app",      # Your specific Vercel production URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             # Use the specific list instead of ["*"]
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(workspaces.router)
app.include_router(operations.router)

@app.get("/")
def root():
    return {"message": "CareOps API is live"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)