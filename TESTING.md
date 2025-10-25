# LeadHunter - Návod k testování

## 🚀 Rychlý start

### Prerekvizity
- Python 3.9+
- Node.js 16+
- PostgreSQL databáze
- OpenAI API klíč

---

## 📦 Backend Setup

### 1. Přejděte do backend složky
```bash
cd backend
```

### 2. Vytvořte Python virtual environment
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Nainstalujte závislosti
```bash
pip install -r requirements.txt
```

### 4. Nastavte environment variables
Vytvořte soubor `.env` v `backend/` složce (můžete zkopírovat `.env.example`):

```bash
DATABASE_URL=postgresql://leadhunter_user:leadhunter123@localhost:5432/leadhunter
SECRET_KEY=tajny-klic-min-32-znaku-dlouhy-random-string-xyz123
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
```

**DŮLEŽITÉ:** Nahraďte `OPENAI_API_KEY` vaším skutečným API klíčem z https://platform.openai.com/api-keys

### 5. Vytvořte PostgreSQL databázi
```bash
# Přihlaste se do PostgreSQL
psql -U postgres

# Vytvořte databázi a uživatele
CREATE DATABASE leadhunter;
CREATE USER leadhunter_user WITH PASSWORD 'leadhunter123';
GRANT ALL PRIVILEGES ON DATABASE leadhunter TO leadhunter_user;
\q
```

### 6. Spusťte backend server
```bash
uvicorn app.main:app --reload --port 8000
```

Backend běží na: **http://localhost:8000**

API dokumentace: **http://localhost:8000/docs**

---

## 🎨 Frontend Setup

### 1. Otevřete nový terminál a přejděte do frontend složky
```bash
cd frontend
```

### 2. Nainstalujte závislosti
```bash
npm install
```

### 3. Zkontrolujte `.env` soubor
V `frontend/` složce by měl existovat `.env`:
```bash
VITE_API_URL=http://localhost:8000/api/v1
```

### 4. Spusťte frontend dev server
```bash
npm run dev
```

Frontend běží na: **http://localhost:5173**

---

## 🧪 Testovací scénáře

### Scénář 1: Registrace a přihlášení

1. **Otevřete** http://localhost:5173
2. **Registrace nového uživatele** (použijte API docs):
   - Jděte na http://localhost:8000/docs
   - Najděte endpoint `POST /api/v1/auth/register`
   - Klikněte "Try it out"
   - Zadejte:
     ```json
     {
       "email": "test@example.com",
       "password": "heslo123",
       "full_name": "Jan Testovací"
     }
     ```
   - Klikněte "Execute"

3. **Přihlášení** ve frontendu:
   - Email: `test@example.com`
   - Heslo: `heslo123`

### Scénář 2: Přidání leadů

1. **Klikněte** na "📊 Vaše Leady" v menu
2. **Klikněte** "+ Přidat Lead"
3. **Vyplňte formulář**:
   - Celé jméno: `Petr Novák`
   - Email: `petr.novak@firma.cz`
   - Telefon: `+420 123 456 789`
   - Firma: `TechCorp s.r.o.`
   - Pracovní pozice: `CEO`
   - Poznámky: `Potenciální velký zákazník`
4. **Klikněte** "💾 Uložit Lead"

**Přidejte ještě 2-3 leady pro testování:**
- Lead s neúplnými daty (bez telefonu, firmy)
- Lead s pozicí "Junior Developer" (nižší skóre)
- Lead s decision maker pozicí "CTO" nebo "Ředitel" (vyšší skóre)

### Scénář 3: AI Lead Scoring

1. **Klikněte** tlačítko "🎯 Přepočítat AI skóre" nahoře
2. **Počkejte** 5-10 sekund (AI analyzuje všechny leady)
3. **Zkontrolujte** barevné badges ve sloupci "AI Skóre":
   - 🟢 Zelená (80+): Vynikající lead
   - 🔵 Modrá (60-79): Dobrá kvalita
   - 🟡 Žlutá (40-59): Střední kvalita
   - 🔴 Červená (<40): Nízká kvalita

**Nebo pro jednotlivý lead:**
- U leadu bez skóre klikněte "Vypočítat"

### Scénář 4: AI Generování emailů

1. **U libovolného leadu** klikněte "🤖 Generuj zprávu"
2. **Počkejte** 3-5 sekund
3. **Zkontrolujte vygenerovaný email**:
   - Měl by obsahovat personalizaci (jméno, firma, pozice)
   - Profesionální tón v češtině
   - Předmět i tělo emailu
4. **Klikněte** "📋 Kopírovat vše" pro zkopírování do schránky

### Scénář 5: Filtrování a vyhledávání

**Vyhledávání:**
1. **Zadejte** do search boxu část jména, emailu nebo firmy
2. **Výsledky** se filtrují real-time

**Filtrování podle statusu:**
1. **Změňte status** několika leadů (pomocí dropdown ve sloupci Status)
2. **Použijte** filtr "Status" nahoře
3. **Vyberte** např. "Kontaktován"

**Řazení:**
1. **Změňte** řazení na "Jméno (A-Z)" nebo "AI Skóre"
2. **Tabulka** se okamžitě přeřadí

### Scénář 6: Bulk operace

**Bulk delete:**
1. **Zaškrtněte** checkbox u 2-3 leadů
2. **Objeví se** modrý toolbar nahoře
3. **Klikněte** "Smazat vybrané"
4. **Potvrďte** akci

**Bulk status update:**
1. **Zaškrtněte** několik leadů
2. **V toolbaru** vyberte nový status z dropdown menu
3. **Všechny vybrané** leady se aktualizují

**Select All:**
1. **Klikněte** checkbox v hlavičce tabulky
2. **Všechny leady** se vyberou najednou

### Scénář 7: CSV Export

1. **Nastavte filtry** (volitelně) - např. pouze status "new"
2. **Klikněte** "📥 Export CSV"
3. **Stáhne se soubor** `leads_2025-10-25.csv`
4. **Otevřete v Excelu/Google Sheets** a zkontrolujte data

### Scénář 8: Status workflow

**Test celého workflow:**
1. **Vytvoř nový lead** → Status: "Nový" (modrý)
2. **Změň na** "Kontaktován" (žlutý)
3. **Změň na** "Kvalifikován" (fialový)
4. **Změň na** "Nabídka" (indigo)
5. **Změň na** "Vyjednávání" (oranžový)
6. **Konečný status:**
   - "Uzavřeno - Vyhráno" (zelený) ✅
   - nebo "Uzavřeno - Prohráno" (červený) ❌

---

## 🐛 Troubleshooting

### Backend nenaběhne

**Chyba: "Could not validate credentials"**
- Zkontrolujte, že máte správný `SECRET_KEY` v `.env`
- Musí být minimálně 32 znaků

**Chyba: "OPENAI_API_KEY must be set"**
- Přidejte váš OpenAI API klíč do `.env`
- Klíč musí začínat `sk-`

**Chyba: "Could not connect to database"**
- Zkontrolujte, že PostgreSQL běží
- Ověřte `DATABASE_URL` v `.env`
- Zkuste: `psql -U leadhunter_user -d leadhunter`

### Frontend nenaběhne

**Chyba: "npm ERR! missing script: dev"**
- Ujistěte se, že jste v `frontend/` složce
- Zkuste: `rm -rf node_modules && npm install`

**Chyba: "Network Error" při API volání**
- Zkontrolujte, že backend běží na portu 8000
- Ověřte `VITE_API_URL` v `frontend/.env`

### AI funkce nefungují

**"AI generation failed"**
- Zkontrolujte OpenAI API klíč
- Ověřte, že máte kredity na OpenAI účtu
- Zkontrolujte rate limity:
  - Email generování: max 10/minutu
  - Lead scoring: max 20/minutu
  - Bulk scoring: max 3/hodinu

---

## 📊 Testování API přímo

Použijte **Swagger UI**: http://localhost:8000/docs

Nebo **curl příkazy**:

```bash
# Registrace
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"heslo123","full_name":"Test User"}'

# Přihlášení
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"heslo123"}'

# Získat leady (s tokenem)
curl -X GET http://localhost:8000/api/v1/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ✅ Checklist pro kompletní test

- [ ] Backend běží bez errorů
- [ ] Frontend běží a zobrazuje login
- [ ] Registrace nového uživatele funguje
- [ ] Přihlášení funguje
- [ ] Můžu přidat nový lead
- [ ] AI generování emailu funguje
- [ ] AI lead scoring funguje
- [ ] Vyhledávání leadů funguje
- [ ] Filtrování podle statusu funguje
- [ ] Řazení leadů funguje
- [ ] Změna statusu funguje (barevné rozlišení)
- [ ] Bulk delete funguje
- [ ] Bulk status update funguje
- [ ] CSV export funguje
- [ ] Select all checkbox funguje

---

## 🎯 Pokročilé testování

### Test rate limitingu

```bash
# Pošlete 11 requestů na AI generování za minutu
# 11. request by měl vrátit 429 Too Many Requests
for i in {1..11}; do
  curl -X POST http://localhost:8000/api/v1/leads/LEAD_ID/generate-message \
    -H "Authorization: Bearer TOKEN"
  sleep 1
done
```

### Test validací

**Pokus o vytvoření leadu s neplatným emailem:**
```json
{
  "full_name": "Test",
  "email": "invalid-email",
  "phone": "+420123456789"
}
```
→ Měl by vrátit chybu validace

**Pokus o vytvoření leadu s příliš krátkým jménem:**
```json
{
  "full_name": "A",
  "email": "test@test.com"
}
```
→ Měl by vrátit "Jméno musí mít alespoň 2 znaky"

---

## 💡 Tipy pro testování

1. **Otevřete DevTools** (F12) pro sledování network requestů
2. **Zkontrolujte backend logy** v terminálu kde běží uvicorn
3. **Použijte různé browsery** pro test kompatibility
4. **Testujte na různých velikostech obrazovky** (responsive design)
5. **Vyzkoušejte edge cases** (prázdné formuláře, speciální znaky, atd.)

---

## 📝 Očekávané výsledky

Po dokončení testování byste měli vidět:
- ✅ Funkční registrace a přihlášení
- ✅ Přidávání, editaci, mazání leadů
- ✅ AI skóre 0-100 u každého leadu
- ✅ Barevně odlišené statusy a skóre
- ✅ Fungující vyhledávání a filtry
- ✅ CSV export s aktuálními daty
- ✅ Bulk operace nad vybranými leady
- ✅ AI generované emaily v češtině

Pokud narazíte na problém, dejte mi vědět! 🚀
