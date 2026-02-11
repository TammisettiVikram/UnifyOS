from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .config import settings
from app.models.workspace import Base

# Railway provides DATABASE_URL; we ensure it's compatible with SQLAlchemy
db_url = settings.DATABASE_URL
if db_url.startswith("postgres://"):
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
    # This creates tables on startup if they don't exist
    Base.metadata.create_all(bind=engine)