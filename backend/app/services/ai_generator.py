from openai import OpenAI
from app.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_cold_email(lead_data: dict) -> dict:
    """
    Generuje personalizovaný cold email pomocí GPT-4.
    """
    
    full_name = lead_data.get('full_name', 'Vážený/á')
    company_name = lead_data.get('company_name', 'vaše firma')
    job_title = lead_data.get('job_title', 'vaší pozici')
    
    prompt = f"""Vytvoř profesionální cold email v češtině pro B2B oslovení s těmito parametry:

Informace o příjemci:
- Jméno: {full_name}
- Firma: {company_name}
- Pozice: {job_title}

Produkt: LeadHunter - AI nástroj pro automatické generování a správu B2B leadů

Požadavky:
1. Začni personalizovaným úvodem (odkaz na jejich firmu nebo pozici)
2. Jasně uveď value proposition - jak LeadHunter ušetří čas a zvýší prodeje
3. Jeden konkrétní benefit pro jejich situaci
4. Soft CTA (neagresivní výzva k akci - např. krátký call nebo demo)
5. Profesionální, ale přátelský tón
6. Délka: Max 150 slov
7. BEZ předmětu (jen tělo emailu)

Email by měl znít přirozeně, ne jako automatická zpráva."""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system", 
                    "content": "Jsi expert na B2B sales copywriting. Píšeš krátké, efektivní cold emaily v češtině, které nezní jako spam a mají vysokou response rate."
                },
                {
                    "role": "user", 
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        email_body = response.choices[0].message.content.strip()
        
        # Generuj také subject line
        subject_prompt = f"""Na základě tohoto emailu vytvoř krátký, poutavý předmět (subject line) v češtině:

Email: {email_body[:200]}...

Firma: {company_name}

Požadavky:
- Max 50 znaků
- Personalizovaný (pokud možno zmínka firmy)
- Vyvolá zvědavost
- Neznít jako spam
- Bez emoji

Vrať POUZE subject line, nic jiného."""

        subject_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": subject_prompt}],
            temperature=0.8,
            max_tokens=50
        )
        
        subject = subject_response.choices[0].message.content.strip().strip('"')
        
        return {
            "subject": subject,
            "body": email_body,
            "status": "success"
        }
        
    except Exception as e:
        return {
            "subject": "",
            "body": "",
            "status": "error",
            "error": str(e)
        }