from sqlalchemy import Column, String, Float, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey
from datetime import datetime
import uuid
from app.database import Base

class Lead(Base):
    __tablename__ = "leads"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    full_name = Column(String)
    email = Column(String, index=True)
    phone = Column(String)
    company_name = Column(String, index=True)
    company_website = Column(String)
    job_title = Column(String)
    
    status = Column(String, default="new")
    source = Column(String, default="manual")
    ai_score = Column(Float)
    notes = Column(String)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)