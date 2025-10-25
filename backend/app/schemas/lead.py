from pydantic import BaseModel, EmailStr, field_validator, HttpUrl
from datetime import datetime
from uuid import UUID
from typing import Optional
import re

class LeadCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    company_name: Optional[str] = None
    company_website: Optional[str] = None
    job_title: Optional[str] = None
    notes: Optional[str] = None

    @field_validator('full_name')
    @classmethod
    def validate_full_name(cls, v: str) -> str:
        if len(v.strip()) < 2:
            raise ValueError('Jméno musí mít alespoň 2 znaky')
        if len(v) > 100:
            raise ValueError('Jméno je příliš dlouhé (max 100 znaků)')
        return v.strip()

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == '':
            return None
        # Odstranit mezery a pomlčky
        phone = re.sub(r'[\s\-()]', '', v)
        # Kontrola formátu - mezinárodní nebo lokální
        if not re.match(r'^\+?[0-9]{9,15}$', phone):
            raise ValueError('Neplatný formát telefonu (očekává se 9-15 číslic, volitelně s +)')
        return v.strip()

    @field_validator('company_name', 'job_title')
    @classmethod
    def validate_text_fields(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == '':
            return None
        if len(v) > 200:
            raise ValueError('Pole je příliš dlouhé (max 200 znaků)')
        return v.strip()

    @field_validator('notes')
    @classmethod
    def validate_notes(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == '':
            return None
        if len(v) > 1000:
            raise ValueError('Poznámky jsou příliš dlouhé (max 1000 znaků)')
        return v.strip()

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

    @field_validator('status')
    @classmethod
    def validate_status(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        allowed_statuses = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost']
        if v not in allowed_statuses:
            raise ValueError(f'Neplatný status. Povolené hodnoty: {", ".join(allowed_statuses)}')
        return v

    @field_validator('phone')
    @classmethod
    def validate_phone(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == '':
            return None
        phone = re.sub(r'[\s\-()]', '', v)
        if not re.match(r'^\+?[0-9]{9,15}$', phone):
            raise ValueError('Neplatný formát telefonu (očekává se 9-15 číslic, volitelně s +)')
        return v.strip()