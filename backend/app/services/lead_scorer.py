from openai import OpenAI
from app.config import settings
import json

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def calculate_lead_score(lead_data: dict) -> dict:
    """
    Vypočítá AI skóre kvality leadu (0-100) na základě dostupných informací.

    Hodnotí:
    - Kompletnost dat (má email, telefon, firmu, pozici?)
    - Kvalitu firmy/pozice pro B2B
    - Potenciál konverze
    """

    full_name = lead_data.get('full_name', '')
    email = lead_data.get('email', '')
    phone = lead_data.get('phone', '')
    company_name = lead_data.get('company_name', '')
    job_title = lead_data.get('job_title', '')
    notes = lead_data.get('notes', '')

    # Pokud nejsou základní informace, vrátit nízké skóre
    if not email or not full_name:
        return {
            "score": 10,
            "reasoning": "Chybí základní kontaktní informace",
            "status": "success"
        }

    prompt = f"""Vyhodnoť kvalitu tohoto B2B leadu a přiřaď mu skóre 0-100, kde:
- 0-30: Nízká kvalita (nekompletní data, podezřelé, nebo nehodící se pro B2B)
- 31-60: Střední kvalita (základní data OK, ale chybí důležité info)
- 61-80: Dobrá kvalita (kompletní data, relevantní pozice/firma)
- 81-100: Vynikající kvalita (decision maker, velká firma, kompletní kontakt)

Informace o leadu:
- Jméno: {full_name}
- Email: {email}
- Telefon: {"Ano" if phone else "Ne"}
- Firma: {company_name if company_name else "Neuvedeno"}
- Pracovní pozice: {job_title if job_title else "Neuvedeno"}
- Poznámky: {notes[:200] if notes else "Žádné"}

Hodnoť zejména:
1. Kompletnost kontaktních údajů (email, telefon)
2. Je pozice decision-maker? (CEO, CTO, ředitel, vedoucí = vyšší skóre)
3. Je firma uvedena? (B2B vyžaduje firmu)
4. Kvalita emailu (firemní vs. osobní email)

Vrať POUZE JSON ve formátu:
{{"score": 75, "reasoning": "Krátké vysvětlení v češtině"}}"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "Jsi expert na hodnocení B2B leadů. Vracíš pouze JSON odpovědi."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=150,
            response_format={"type": "json_object"}
        )

        result = json.loads(response.choices[0].message.content)

        return {
            "score": int(result.get("score", 50)),
            "reasoning": result.get("reasoning", ""),
            "status": "success"
        }

    except Exception as e:
        # Fallback - jednoduché rule-based scoring
        score = 0

        # Základní bodování
        if email:
            score += 20
        if phone:
            score += 15
        if company_name:
            score += 20
        if job_title:
            score += 20

        # Bonus za decision maker keywords
        decision_keywords = ['ceo', 'cto', 'ředitel', 'vedoucí', 'director', 'manager', 'head']
        if job_title and any(keyword in job_title.lower() for keyword in decision_keywords):
            score += 15

        # Bonus za firemní email
        if email and company_name:
            email_domain = email.split('@')[1] if '@' in email else ''
            if company_name.lower().replace(' ', '') in email_domain.lower().replace(' ', ''):
                score += 10

        return {
            "score": min(score, 100),
            "reasoning": f"Automatické hodnocení (AI nedostupné): {score} bodů",
            "status": "success",
            "fallback": True,
            "error": str(e)
        }
