from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, JSON, Float
from sqlalchemy.orm import relationship
from app.core.database import Base
import datetime

class Contact(Base):
    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))
    name = Column(String)
    email = Column(String)
    phone = Column(String, nullable=True)
    status = Column(String, default="Lead") # Lead, Booked, Active

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    contact_id = Column(Integer, ForeignKey("contacts.id"))
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))
    start_time = DateTime(timezone=True)
    service_type = Column(String)
    status = Column(String, default="Confirmed") # Confirmed, Completed, No-Show

class Inventory(Base):
    __tablename__ = "inventory"
    id = Column(Integer, primary_key=True, index=True)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))
    item_name = Column(String)
    quantity = Column(Integer)
    threshold = Column(Integer)
    
class Form(Base):
    __tablename__ = "forms"
    id = Column(Integer, primary_key=True, index=True)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))
    title = Column(String)
    status = Column(String, default="Pending") # Pending, Completed
    booking_id = Column(Integer, ForeignKey("bookings.id"))