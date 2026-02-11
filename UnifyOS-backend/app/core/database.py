from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Explicitly import models to register metadata
import app.models.workspace
import app.models.business_logic

engine = create_engine(settings.DATABASE_URL.replace("postgres://", "postgresql://", 1))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    # Only creates if they don't exist
    app.models.workspace.Base.metadata.create_all(bind=engine)
    app.models.business_logic.Base.metadata.create_all(bind=engine)