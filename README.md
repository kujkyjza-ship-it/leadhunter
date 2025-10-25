# 🎯 LeadHunter

> AI-powered B2B lead management systém s inteligentním hodnocením a automatickým generováním cold emailů

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688.svg?style=flat&logo=FastAPI)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg?style=flat&logo=React)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6.svg?style=flat&logo=TypeScript)](https://www.typescriptlang.org)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991.svg?style=flat&logo=OpenAI)](https://openai.com)

---

## 📋 Obsah

- [Funkce](#-funkce)
- [Technologie](#-technologie)
- [Rychlý start](#-rychlý-start)
- [Dokumentace](#-dokumentace)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Vývoj](#-vývoj)

---

## ✨ Funkce

### 🤖 AI Funkce
- **Lead Scoring (0-100)**: GPT-4o-mini automaticky hodnotí kvalitu leadů
- **Cold Email generování**: Personalizované B2B emaily v češtině
- **Email Templates**: Vlastní šablony pro různé kampaně
- **Inteligentní analýza**: Hodnocení decision makerů, kompletnosti dat

### 📊 Lead Management
- **CRUD operace**: Vytváření, čtení, úpravy, mazání leadů
- **Pokročilé filtrování**: Podle statusu, jména, emailu, firmy
- **Real-time vyhledávání**: Okamžité výsledky při psaní
- **Řazení**: Podle data, jména, firmy, statusu, AI skóre

### 🔄 Bulk Operace
- **Hromadné mazání**: Smazání více leadů najednou
- **Hromadná změna statusu**: Přesun leadů mezi fázemi
- **Select All**: Rychlý výběr všech leadů
- **CSV Export**: Export filtrovaných dat do Excelu

### 🎨 Status Workflow
7 barevně odlišených fází prodejního procesu:
- 🔵 **Nový** → 🟡 **Kontaktován** → 🟣 **Kvalifikován** → 🟦 **Nabídka** → 🟠 **Vyjednávání** → 🟢 **Uzavřeno (Win)** / 🔴 **Uzavřeno (Loss)**

### 🔒 Bezpečnost
- **JWT autentizace**: Bezpečné přihlášení a session management
- **Rate limiting**: Ochrana proti spam a DDoS útokům
- **Validace vstupů**: Kompletní validace na backendu i frontendu
- **User isolation**: Každý uživatel vidí jen své leady

---

## 🛠 Technologie

### Backend
- **FastAPI** - Moderní Python web framework
- **SQLAlchemy** - ORM pro PostgreSQL
- **Pydantic** - Data validace
- **OpenAI API** - GPT-4o-mini pro AI funkce
- **SlowAPI** - Rate limiting
- **python-jose** - JWT tokeny
- **bcrypt** - Hashování hesel

### Frontend
- **React 18** - UI knihovna
- **TypeScript** - Type-safe JavaScript
- **Vite** - Rychlý build tool
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP klient
- **React Router** - Routing

### Databáze
- **PostgreSQL** - Relační databáze
- **Alembic** - Database migrace (připraveno)

---

## 🚀 Rychlý start

### Prerekvizity
```bash
# Vyžadováno
- Python 3.9+
- Node.js 16+
- PostgreSQL 12+
- OpenAI API klíč
```

### Instalace

**1. Klonujte repozitář**
```bash
git clone https://github.com/vas-uzivatel/leadhunter.git
cd leadhunter
```

**2. Backend setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Vytvořte .env soubor (viz .env.example)
cp .env.example .env
# Upravte .env s vašimi credentials
```

**3. Databáze setup**
```bash
# Vytvořte PostgreSQL databázi
createdb leadhunter
# Nebo přes psql:
# CREATE DATABASE leadhunter;
```

**4. Frontend setup**
```bash
cd ../frontend
npm install

# Vytvořte .env soubor (viz .env.example)
cp .env.example .env
```

**5. Spuštění**
```bash
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

🎉 **Aplikace běží na:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 📚 Dokumentace

- **[TESTING.md](./TESTING.md)** - Kompletní testovací scénáře a troubleshooting
- **[API Docs](http://localhost:8000/docs)** - Interaktivní Swagger dokumentace (po spuštění)

---

## 🔌 API Endpoints

### Autentizace
```
POST   /api/v1/auth/register       # Registrace nového uživatele
POST   /api/v1/auth/login          # Přihlášení (vrací JWT token)
```

### Leads
```
GET    /api/v1/leads                        # Seznam leadů (s filtry)
POST   /api/v1/leads                        # Vytvoření leadu
GET    /api/v1/leads/{id}                   # Detail leadu
PUT    /api/v1/leads/{id}                   # Aktualizace leadu
DELETE /api/v1/leads/{id}                   # Smazání leadu
GET    /api/v1/leads/export/csv             # Export do CSV
POST   /api/v1/leads/bulk-delete            # Hromadné mazání
POST   /api/v1/leads/bulk-update-status     # Hromadná změna statusu
```

### AI Funkce
```
POST   /api/v1/leads/{id}/generate-message  # Generování cold emailu (10/min)
POST   /api/v1/leads/{id}/calculate-score   # Výpočet AI skóre (20/min)
POST   /api/v1/leads/recalculate-all-scores # Přepočet všech skóre (3/hour)
```

### Email Templates
```
GET    /api/v1/templates              # Seznam šablon
POST   /api/v1/templates              # Vytvoření šablony
GET    /api/v1/templates/{id}         # Detail šablony
PUT    /api/v1/templates/{id}         # Aktualizace šablony
DELETE /api/v1/templates/{id}         # Smazání šablony
```

**Query parametry pro GET /api/v1/leads:**
- `status` - Filtr podle statusu
- `search` - Vyhledávání v jméně/emailu/firmě
- `sort_by` - Řazení (created_at, full_name, company_name, status)
- `sort_order` - Směr řazení (asc, desc)
- `skip` - Offset pro paginaci
- `limit` - Limit počtu výsledků

---

## 📸 Screenshots

### Dashboard s AI skóre
```
┌─────────────────────────────────────────────┐
│ 📊 Vaše Leady                   [+ Přidat] │
├─────────────────────────────────────────────┤
│ 🔍 Hledat: [_________]  Status: [Všechny▾] │
├──┬────────┬──────┬────────┬──────┬─────────┤
│☑│Jméno   │Email │Firma   │Status│AI Skóre │
├──┼────────┼──────┼────────┼──────┼─────────┤
│☐│Jan N.  │jan@  │Tech s. │🟢 Win│ 🟢 85   │
│☐│Petra K.│petra@│Start..│🟡 Kont│ 🔵 72   │
│☐│Martin V│mart..│Small..│🔴 Loss│ 🔴 35   │
└──┴────────┴──────┴────────┴──────┴─────────┘
```

---

## 🏗 Vývoj

### Struktura projektu
```
leadhunter/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # API endpoints
│   │   ├── models/          # Database modely
│   │   ├── schemas/         # Pydantic schémata
│   │   ├── services/        # Business logika (AI, scoring)
│   │   ├── config.py        # Konfigurace
│   │   ├── database.py      # DB connection
│   │   └── main.py          # FastAPI app
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/           # React stránky
│   │   ├── services/        # API klient
│   │   ├── App.tsx          # Hlavní komponenta
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── .env.example
├── README.md
└── TESTING.md
```

### Vývoj nových funkcí

**Backend:**
1. Vytvořte nový model v `app/models/`
2. Přidejte schéma v `app/schemas/`
3. Vytvořte endpoint v `app/api/v1/`
4. Registrujte router v `app/main.py`

**Frontend:**
1. Přidejte API volání do `services/api.ts`
2. Vytvořte/upravte komponentu v `pages/`
3. Testujte v prohlížeči

### Database migrace
```bash
# Připraveno pro Alembic
alembic revision --autogenerate -m "Add new table"
alembic upgrade head
```

---

## 🔐 Environment Variables

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/leadhunter
SECRET_KEY=your-secret-key-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
OPENAI_API_KEY=sk-proj-your-key-here
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8000/api/v1
```

---

## ⚡ Performance

- **Rate Limiting:**
  - Email generování: 10 requestů/minutu
  - Lead scoring: 20 requestů/minutu
  - Bulk scoring: 3 requesty/hodinu

- **Caching:** Připraveno pro Redis (zatím neimplementováno)

- **Database Indexy:**
  - Lead.email (index)
  - Lead.company_name (index)
  - Lead.user_id (foreign key)

---

## 🐛 Známé problémy

- [ ] Frontend template manager zatím není implementován (pouze backend API)
- [ ] Chybí pagination pro velké množství leadů (>1000)
- [ ] Dark mode není implementován

---

## 🗺 Roadmap

- [ ] Frontend UI pro email templates
- [ ] Pagination a infinite scroll
- [ ] Email tracking (otevření, kliknutí)
- [ ] Export do více formátů (Excel, JSON)
- [ ] Dashboard s grafy a statistikami
- [ ] Webhook integrace (Zapier, Make)
- [ ] Multi-language support
- [ ] Mobile aplikace

---

## 📄 Licence

MIT License - viz [LICENSE](LICENSE) soubor

---

## 🤝 Přispívání

1. Fork projektu
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit změny (`git commit -m 'Add AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

---

## 📞 Podpora

- 📧 Email: support@leadhunter.app
- 🐛 Issues: [GitHub Issues](https://github.com/vas-uzivatel/leadhunter/issues)
- 📖 Docs: [Documentation](./TESTING.md)

---

## 🙏 Poděkování

- [FastAPI](https://fastapi.tiangolo.com/) - Úžasný Python framework
- [OpenAI](https://openai.com/) - AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

**Vytvořeno s ❤️ pomocí Claude Code**

🤖 *Tento projekt byl vyvinut s pomocí AI asistenta Claude od Anthropic*
