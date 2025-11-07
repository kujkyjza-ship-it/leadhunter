# LeadHunter - Profesionální B2B Lead Generation Website

## 🚀 Co je nového

Tato verze obsahuje kompletní profesionální redesign s následujícími vylepšeními:

### ✨ Design & UX
- **Moderní gradient design** s animovanými efekty
- **Vylepšená barevná paleta** - modrá/cyan gradients pro profesionální look
- **Smooth animace** a transitions pro lepší user experience
- **Responzivní design** optimalizovaný pro všechna zařízení
- **Fixed header** s backdrop blur efektem při scrollu
- **Interaktivní hover efekty** na kartách a tlačítkách

### 📊 Nový obsah
- **Rozšířené služby** - 6 detailních service cards s features a statistikami
- **Testimonials sekce** - reference od spokojených klientů
- **Why Choose Us sekce** - důvody proč si vybrat LeadHunter
- **Trust badges** - ISO, GDPR, certifikace
- **Vylepšené statistiky** s ikonami a popisky
- **Profesionální footer** s rozšířenými informacemi

### 🎯 Business hodnota
- **Důvěryhodnost** - certifikace, testimonials, case studies
- **Call-to-actions** - optimalizované CTA na každé sekci
- **Lead capture** - vylepšený kontaktní formulář
- **Social proof** - real numbers a customer stories

### 🛠️ Technické vylepšení
- **TypeScript** - type-safe code
- **React Hooks** - useState, useEffect pro interaktivitu
- **Tailwind CSS** - utility-first styling
- **Lucide Icons** - konzistentní ikonografie
- **Custom animations** - CSS keyframes pro smooth efekty
- **Accessibility** - focus states, semantic HTML

## 📦 Instalace

### Požadavky
- Node.js 18+ 
- npm nebo yarn

### Kroky instalace

1. **Nainstalujte dependencies:**
```bash
npm install
```

2. **Spusťte development server:**
```bash
npm run dev
```

3. **Otevřete v browseru:**
```
http://localhost:5173
```

## 🔧 Build pro production

```bash
npm run build
```

Build vytvoří optimalizované soubory v `dist/` složce.

## 📁 Struktura projektu

```
leadhunter-frontend/
├── src/
│   ├── App.tsx          # Hlavní komponenta s novým designem
│   ├── index.css        # Styly a animace
│   └── main.tsx         # Entry point
├── public/              # Statické soubory
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind konfigurace
├── tsconfig.json        # TypeScript konfigurace
└── vite.config.ts       # Vite konfigurace
```

## 🎨 Klíčové komponenty

### Services Section
6 detailních service cards s:
- Gradient ikonami
- Features lístky
- Performance statistikami
- Hover animacemi

### Testimonials
3 zákaznické reference s:
- Hodnocením (5 stars)
- Citáty
- Pozicemi a firmami
- Avatar iniciálami

### Stats Section
4 klíčové metriky s:
- Velkými čísly
- Ikonami
- Popisky
- Hover efekty

### Contact Form
Profesionální formulář s:
- 5 poli (jméno, email, firma, telefon, zpráva)
- Validací
- Responzivním layoutem
- Kontaktními informacemi

## 🎯 Customizace

### Změna barev
V `src/index.css` upravte CSS variables:
```css
--primary: 220 90% 56%;
--secondary: 190 90% 50%;
```

### Změna obsahu
V `src/App.tsx` upravte data arrays:
- `services` - služby
- `stats` - statistiky
- `testimonials` - reference
- `trustBadges` - certifikace

### Přidání nových sekcí
Komponenty jsou modulární - můžete snadno přidat další sekce jako:
- FAQ
- Blog posts
- Case studies
- Team members
- Pricing plans

## 📱 Responzivita

Design je plně responzivní:
- **Mobile** (< 768px) - jednosloupec layout
- **Tablet** (768px - 1024px) - dvousloupcový layout
- **Desktop** (> 1024px) - vícesloupcový layout

## ♿ Accessibility

- Semantic HTML tags
- ARIA labels kde potřeba
- Keyboard navigation
- Focus states
- Alt texty na ikonách

## 🚀 Další kroky

### Doporučená vylepšení:
1. **Backend integrace** - připojte contact form k API/email service
2. **Analytics** - přidejte Google Analytics nebo Plausible
3. **SEO** - meta tags, structured data, sitemap
4. **Performance** - lazy loading, image optimization
5. **A/B testing** - testujte různé verze CTA
6. **Multi-language** - přidejte EN/DE verze

### Možná rozšíření:
- Blog/News sekce
- Customer portal
- Live chat integration
- Video testimonials
- Interactive ROI calculator
- Resources/Downloads sekce

## 📞 Kontakt a podpora

Pro otázky ohledně implementace:
- Email: info@leadhunter.com
- Telefon: +49 89 123 456 78

## 📄 Licence

© 2024 LeadHunter. All rights reserved.
