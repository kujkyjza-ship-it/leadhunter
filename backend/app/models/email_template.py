from sqlalchemy import Column, String, Text, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey
from datetime import datetime, timezone
import uuid
from app.database import Base

class EmailTemplate(Base):
    __tablename__ = "email_templates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    name = Column(String(200), nullable=False)  # Název šablony
    description = Column(String(500))  # Popis šablony
    prompt_template = Column(Text, nullable=False)  # Šablona promptu pro AI
    is_default = Column(Boolean, default=False)  # Je to defaultní šablona?
    is_active = Column(Boolean, default=True)  # Je šablona aktivní?

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
