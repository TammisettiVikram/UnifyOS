from sqlalchemy import Column, Integer, String, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(Integer, primary_key=True, index=True)
    business_name = Column(String, unique=True, index=True)
    address = Column(String)
    timezone = Column(String, default="UTC")
    is_active = Column(Boolean, default=False)
    onboarding_step = Column(Integer, default=1)
    integrations = Column(JSON, default={})  # To store SMS/Email config