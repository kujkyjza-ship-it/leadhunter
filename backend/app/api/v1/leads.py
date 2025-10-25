from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import get_db
from app.models.lead import Lead
from app.models.user import User
from app.schemas.lead import LeadCreate, LeadResponse, LeadUpdate
from app.services.ai_generator import generate_cold_email
from app.api.v1.auth import get_current_user

limiter = Limiter(key_func=get_remote_address)
router = APIRouter()

@router.get("/", response_model=List[LeadResponse])
def get_leads(
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    search: str = None,
    sort_by: str = "created_at",
    sort_order: str = "desc",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Získat všechny leady aktuálního uživatele s filtrováním a vyhledáváním"""
    query = db.query(Lead).filter(Lead.user_id == current_user.id)

    # Filtrování podle statusu
    if status:
        query = query.filter(Lead.status == status)

    # Vyhledávání podle jména, emailu nebo firmy
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (Lead.full_name.ilike(search_pattern)) |
            (Lead.email.ilike(search_pattern)) |
            (Lead.company_name.ilike(search_pattern))
        )

    # Sorting
    if sort_by == "created_at":
        order_column = Lead.created_at
    elif sort_by == "full_name":
        order_column = Lead.full_name
    elif sort_by == "company_name":
        order_column = Lead.company_name
    elif sort_by == "status":
        order_column = Lead.status
    else:
        order_column = Lead.created_at

    if sort_order == "desc":
        query = query.order_by(order_column.desc())
    else:
        query = query.order_by(order_column.asc())

    leads = query.offset(skip).limit(limit).all()
    return leads

@router.post("/", response_model=LeadResponse)
def create_lead(
    lead: LeadCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Vytvořit nový lead"""
    new_lead = Lead(**lead.dict(), user_id=current_user.id, source="manual")
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    return new_lead

@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(
    lead_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Získat jeden lead"""
    lead = db.query(Lead).filter(Lead.id == lead_id, Lead.user_id == current_user.id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.put("/{lead_id}", response_model=LeadResponse)
def update_lead(
    lead_id: UUID,
    lead_update: LeadUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Aktualizovat lead"""
    lead = db.query(Lead).filter(Lead.id == lead_id, Lead.user_id == current_user.id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    for key, value in lead_update.dict(exclude_unset=True).items():
        setattr(lead, key, value)

    db.commit()
    db.refresh(lead)
    return lead
    
@router.post("/{lead_id}/generate-message")
@limiter.limit("10/minute")
def generate_message(
    request: Request,
    lead_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Generuj AI zprávu pro lead (max 10 za minutu)"""
    lead = db.query(Lead).filter(Lead.id == lead_id, Lead.user_id == current_user.id).first()
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
def delete_lead(
    lead_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Smazat lead"""
    lead = db.query(Lead).filter(Lead.id == lead_id, Lead.user_id == current_user.id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    db.delete(lead)
    db.commit()
    return {"message": "Lead deleted successfully"}