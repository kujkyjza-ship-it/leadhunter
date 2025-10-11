from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID
from typing import Optional

class LeadCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    company_name: Optional[str] = None
    company_website: Optional[str] = None
    job_title: Optional[str] = None
    notes: Optional[str] = None

class LeadResponse(BaseModel):
    id: UUID
    full_name: str
    email: str
    phone: Optional[str]
    company_name: Optional[str]
    job_title: Optional[str]
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class LeadUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company_name: Optional[str] = None
    job_title: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None