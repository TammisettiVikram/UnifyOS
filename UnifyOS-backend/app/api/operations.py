from fastapi import APIRouter, Depends, HTTPException
from app.models.business_logic import Contact
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.business_logic import Booking, Contact, Inventory, Form
from app.services.automation import AutomationService

router = APIRouter(prefix="/ops", tags=["Operations"])

# 1. Create Booking (Triggers Automation)
@router.post("/public/contact/{workspace_id}")
async def public_contact_submission(workspace_id: int, data: dict, db: Session = Depends(get_db)):
    # 1. Create Contact
    new_contact = Contact(
        workspace_id=workspace_id,
        name=data.get('name'),
        email=data.get('email'),
        phone=data.get('phone'),
        status="Lead" # Rule 7: Contact is created
    )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)

    # 2. Automation: Start Conversation & Send Welcome
    # This is where you'd trigger your Integration Service (Email/SMS)
    print(f"AUTOMATION: Welcome message sent to {new_contact.email}")
    
    return {"status": "success", "message": "Form submitted successfully"}
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