# LeadHunter Frontend

Moderní landing page pro B2B telemarketing a lead generation služby.

## 🚀 Technologie

- **React 18** - UI knihovna
- **TypeScript** - Type-safe JavaScript
- **Vite** - Rychlý build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Krásné ikony

## 📦 Instalace

1. Nainstalujte závislosti:
```bash
npm install
```

2. Spusťte vývojový server:
```bash
npm run dev
```

3. Otevřete prohlížeč na `http://localhost:3000`

## 🛠️ Dostupné příkazy

- `npm run dev` - Spustí vývojový server
- `npm run build` - Vytvoří produkční build
- `npm run preview` - Náhled produkčního buildu
- `npm run lint` - Spustí ESLint kontrolu

## 📁 Struktura projektu

```
leadhunter-frontend/
├── public/              # Statické soubory
├── src/
│   ├── App.tsx         # Hlavní komponenta
│   ├── main.tsx        # Entry point
│   └── index.css       # Globální styly
├── index.html          # HTML template
├── package.json        # Závislosti
├── tsconfig.json       # TypeScript konfigurace
├── tailwind.config.js  # Tailwind konfigurace
└── vite.config.ts      # Vite konfigurace
```

## 🎨 Funkce

- ✅ Responzivní design (mobile-first)
- ✅ Moderní UI s Tailwind CSS
- ✅ Smooth scroll navigace
- ✅ Kontaktní formulář
- ✅ Animace a hover efekty
- ✅ SEO optimalizované
- ✅ Rychlé načítání
- ✅ TypeScript pro type safety

## 🌟 Sekce landing page

1. **Header** - Sticky navigace s mobilním menu
2. **Hero** - Hlavní nadpis s call-to-action tlačítky
3. **Statistiky** - 4 klíčové metriky
4. **Služby** - 6 služebních karet s detaily
5. **O nás** - Mise a hodnoty firmy
6. **Proces** - 2-krokový proces (Screening & Nurturing)
7. **CTA** - Call-to-action sekce
8. **Kontakt** - Formulář a kontaktní informace
9. **Footer** - Odkazy a copyright

## 🎯 Customizace

### Změna barev

Upravte `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Vaše barvy
      }
    }
  }
}
```

### Změna obsahu

Upravte `src/App.tsx` - všechen obsah je v jednom souboru pro snadnou editaci.

## 📱 Responzivita

Stránka je plně responzivní s breakpointy:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Environment Variables

Vytvořte `.env` soubor z `.env.example`:

```bash
cp .env.example .env
```

## 📄 Licence

© 2024 LeadHunter. Všechna práva vyhrazena.

## 🤝 Podpora

Pro otázky kontaktujte: info@leadhunter.com
