from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.workspace import Workspace
from app.schemas.workspace import WorkspaceCreate, WorkspaceUpdate, WorkspaceResponse

router = APIRouter(prefix="/workspaces", tags=["Workspaces"])

@router.post("")
def create_workspace(workspace: WorkspaceCreate, db: Session = Depends(get_db)):
    try:
        db_workspace = Workspace(**workspace.model_dump())
        db.add(db_workspace)
        db.commit()
        db.refresh(db_workspace)
        return db_workspace
    except Exception as e:
        print(f"DATABASE ERROR: {str(e)}") # This will show up in Railway logs
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{workspace_id}", response_model=WorkspaceResponse)
def get_workspace(workspace_id: int, db: Session = Depends(get_db)):
    workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return workspace

@router.patch("/{workspace_id}", response_model=WorkspaceResponse)
def update_workspace(workspace_id: int, updates: WorkspaceUpdate, db: Session = Depends(get_db)):
    db_workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if not db_workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_workspace, key, value)
    
    db.commit()
    db.refresh(db_workspace)
    return db_workspace

@router.post("/{workspace_id}/activate")
def activate_workspace(workspace_id: int, db: Session = Depends(get_db)):
    workspace = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    
    # Requirement Step 8: Verify before activation
    if not workspace.integrations or "email" not in workspace.integrations:
        raise HTTPException(status_code=400, detail="Email integration mandatory for activation")
    
    workspace.is_active = True
    workspace.onboarding_step = 8
    db.commit()
    return {"status": "Workspace activated and live"}