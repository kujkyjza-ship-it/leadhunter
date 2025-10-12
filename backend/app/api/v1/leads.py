from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.database import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse, LeadUpdate
from app.services.ai_generator import generate_cold_email

router = APIRouter()

@router.get("/", response_model=List[LeadResponse])
def get_leads(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Získat všechny leady"""
    leads = db.query(Lead).offset(skip).limit(limit).all()
    return leads

@router.post("/", response_model=LeadResponse)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    """Vytvořit nový lead"""
    # TODO: Get real user_id from JWT token
    dummy_user_id = db.query(Lead).first()
    if dummy_user_id:
        user_id = dummy_user_id.user_id
    else:
        # Use first user in database
        from app.models.user import User
        first_user = db.query(User).first()
        user_id = first_user.id if first_user else None
    
    new_lead = Lead(**lead.dict(), user_id=user_id, source="manual")
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    return new_lead

@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: UUID, db: Session = Depends(get_db)):
    """Získat jeden lead"""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.put("/{lead_id}", response_model=LeadResponse)
def update_lead(lead_id: UUID, lead_update: LeadUpdate, db: Session = Depends(get_db)):
    """Aktualizovat lead"""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    for key, value in lead_update.dict(exclude_unset=True).items():
        setattr(lead, key, value)
    
    db.commit()
    db.refresh(lead)
    return lead
    
@router.post("/{lead_id}/generate-message")
def generate_message(lead_id: UUID, db: Session = Depends(get_db)):
    """Generuj AI zprávu pro lead"""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    lead_data = {
        "full_name": lead.full_name,
        "company_name": lead.company_name,
        "job_title": lead.job_title,
    }
    
    result = generate_cold_email(lead_data)
    
    if result["status"] == "error":
        raise HTTPException(status_code=500, detail=result.get("error", "AI generation failed"))
    
    return result

@router.delete("/{lead_id}")
def delete_lead(lead_id: UUID, db: Session = Depends(get_db)):
    """Smazat lead"""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    db.delete(lead)
    db.commit()
    return {"message": "Lead deleted successfully"}