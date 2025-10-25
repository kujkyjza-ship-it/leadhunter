from pydantic import BaseModel, field_validator
from datetime import datetime
from uuid import UUID
from typing import Optional

class EmailTemplateCreate(BaseModel):
    name: str
    description: Optional[str] = None
    prompt_template: str
    is_default: bool = False

    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        if len(v.strip()) < 3:
            raise ValueError('Název šablony musí mít alespoň 3 znaky')
        if len(v) > 200:
            raise ValueError('Název je příliš dlouhý (max 200 znaků)')
        return v.strip()

    @field_validator('prompt_template')
    @classmethod
    def validate_prompt(cls, v: str) -> str:
        if len(v.strip()) < 20:
            raise ValueError('Šablona promptu musí mít alespoň 20 znaků')
        if len(v) > 5000:
            raise ValueError('Šablona je příliš dlouhá (max 5000 znaků)')
        return v.strip()

class EmailTemplateResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str]
    prompt_template: str
    is_default: bool
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class EmailTemplateUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    prompt_template: Optional[str] = None
    is_default: Optional[bool] = None
    is_active: Optional[bool] = None
