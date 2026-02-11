from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# 1. Import BOTH Bases here so they are registered
from app.models.workspace import Base as WorkspaceBase
from app.models.business_logic import Base as BusinessBase

db_url = settings.DATABASE_URL
if db_url and db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

engine = create_engine(db_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    # 2. Use the metadata from the imported models
    WorkspaceBase.metadata.create_all(bind=engine)
    BusinessBase.metadata.create_all(bind=engine)