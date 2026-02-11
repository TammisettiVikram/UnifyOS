from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any

class WorkspaceBase(BaseModel):
    business_name: str
    address: str
    timezone: str = "UTC"
    contact_email: EmailStr

class WorkspaceCreate(WorkspaceBase):
    pass

class WorkspaceUpdate(BaseModel):
    is_active: Optional[bool] = None
    onboarding_step: Optional[int] = None
    integrations: Optional[Dict[str, Any]] = None

class WorkspaceResponse(WorkspaceBase):
    id: int
    is_active: bool
    onboarding_step: int
    integrations: Dict[str, Any]

    class Config:
        from_attributes = True