from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.business_logic import Booking, Contact, Inventory, Form
from app.services.automation import AutomationService

router = APIRouter(prefix="/ops", tags=["Operations"])

# 1. Create Booking (Triggers Automation)
@router.post("/bookings")
def create_booking(contact_id: int, workspace_id: int, service: str, db: Session = Depends(get_db)):
    new_booking = Booking(contact_id=contact_id, workspace_id=workspace_id, service_type=service)
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    
    # Trigger Automations
    AutomationService.handle_new_booking(db, new_booking.id, workspace_id)
    return new_booking

# 2. Dashboard Stats (Rule 5)
@router.get("/dashboard/{workspace_id}")
def get_dashboard_stats(workspace_id: int, db: Session = Depends(get_db)):
    return {
        "today_bookings": db.query(Booking).filter(Booking.workspace_id == workspace_id).count(),
        "pending_forms": db.query(Form).filter(Form.workspace_id == workspace_id, Form.status == "Pending").count(),
        "low_stock_alerts": [
            i.item_name for i in db.query(Inventory).filter(Inventory.workspace_id == workspace_id).all() 
            if AutomationService.check_inventory_threshold(i)
        ]
    }

# 3. Inventory Management
@router.patch("/inventory/{item_id}")
def update_inventory(item_id: int, quantity: int, db: Session = Depends(get_db)):
    item = db.query(Inventory).filter(Inventory.id == item_id).first()
    item.quantity = quantity
    db.commit()
    
    is_low = AutomationService.check_inventory_threshold(item)
    return {"status": "Updated", "low_stock_warning": is_low}