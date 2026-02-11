from sqlalchemy.orm import Session
from app.models.business_logic import Form

class AutomationService:
    @staticmethod
    def handle_new_booking(db: Session, booking_id: int, workspace_id: int):
        # 1. Logic to send Confirmation (Simulated)
        print(f"AUTOMATION: Sending booking confirmation for ID {booking_id}")
        
        # 2. Logic to automatically generate required Forms (Rule 5)
        new_form = Form(
            workspace_id=workspace_id,
            booking_id=booking_id,
            title="Intake Form & Agreement",
            status="Pending"
        )
        db.add(new_form)
        db.commit()
        print(f"AUTOMATION: Form sent automatically for booking {booking_id}")

    @staticmethod
    def check_inventory_threshold(item):
        if item.quantity <= item.threshold:
            # Logic for Dashboard Alert (Rule 10)
            return True
        return False