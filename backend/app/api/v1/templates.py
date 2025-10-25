from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.database import get_db
from app.models.email_template import EmailTemplate
from app.models.user import User
from app.schemas.email_template import EmailTemplateCreate, EmailTemplateResponse, EmailTemplateUpdate
from app.api.v1.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[EmailTemplateResponse])
def get_templates(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Získat všechny email šablony uživatele"""
    templates = db.query(EmailTemplate).filter(
        EmailTemplate.user_id == current_user.id,
        EmailTemplate.is_active == True
    ).all()
    return templates

@router.post("/", response_model=EmailTemplateResponse)
def create_template(
    template: EmailTemplateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Vytvořit novou email šablonu"""
    # Pokud je označena jako default, zrušit default u ostatních
    if template.is_default:
        db.query(EmailTemplate).filter(
            EmailTemplate.user_id == current_user.id
        ).update({"is_default": False})

    new_template = EmailTemplate(
        **template.dict(),
        user_id=current_user.id
    )
    db.add(new_template)
    db.commit()
    db.refresh(new_template)
    return new_template

@router.get("/{template_id}", response_model=EmailTemplateResponse)
def get_template(
    template_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Získat konkrétní šablonu"""
    template = db.query(EmailTemplate).filter(
        EmailTemplate.id == template_id,
        EmailTemplate.user_id == current_user.id
    ).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.put("/{template_id}", response_model=EmailTemplateResponse)
def update_template(
    template_id: UUID,
    template_update: EmailTemplateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Aktualizovat šablonu"""
    template = db.query(EmailTemplate).filter(
        EmailTemplate.id == template_id,
        EmailTemplate.user_id == current_user.id
    ).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    # Pokud se nastavuje jako default, zrušit default u ostatních
    if template_update.is_default:
        db.query(EmailTemplate).filter(
            EmailTemplate.user_id == current_user.id,
            EmailTemplate.id != template_id
        ).update({"is_default": False})

    for key, value in template_update.dict(exclude_unset=True).items():
        setattr(template, key, value)

    db.commit()
    db.refresh(template)
    return template

@router.delete("/{template_id}")
def delete_template(
    template_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Smazat šablonu (soft delete)"""
    template = db.query(EmailTemplate).filter(
        EmailTemplate.id == template_id,
        EmailTemplate.user_id == current_user.id
    ).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    template.is_active = False
    db.commit()
    return {"message": "Template deleted successfully"}
