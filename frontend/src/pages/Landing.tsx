import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Děkujeme za vaši zprávu! Brzy se vám ozveme.\n\nJméno: ${formData.name}\nEmail: ${formData.email}`);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50 border-b border-slate-100 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold text-slate-800 dark:text-white">LEADHUNTER</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Služby</a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">O nás</a>
              <a href="#process" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Proces</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Kontakt</a>
            </nav>

            <button
              onClick={() => navigate('/login')}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Přihlásit se
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-800 dark:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-3">
              <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>Služby</a>
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>O nás</a>
              <a href="#process" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>Proces</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>Kontakt</a>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Přihlásit se
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Advanced B2B
            <span className="block text-blue-600 dark:text-blue-400 mt-2">Telemarketing</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Hledáte zkušený inside sales nebo telemarketing tým pro etablování relevantního podílu na evropském trhu?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-flex items-center justify-center">
              Začít nyní
            </a>
            <a href="#services" className="bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-600 transition">
              Zjistit více
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-800 py-16 border-y border-slate-100 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm md:text-base">B2B Lead Generation projektů</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Let zkušeností v inside sales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">10,000+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Profilovaných accounts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">50,000+</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm md:text-base">Kvalifikovaných kontaktů</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Naše služby</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Kompletní portfolio B2B telemarketingu a lead generation služeb pro váš úspěch
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl text-blue-600 dark:text-blue-400">📞</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Telemarketing & Inside Sales</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Zkušený B2B telemarketing tým pro evropský trh</p>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Profesionální komunikace na executive úrovni
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Rychlé zapracování do nových témat
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Motivovaný tým s prokázanými výsledky
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Propojení s vašimi marketing a sales systémy
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl text-blue-600 dark:text-blue-400">💾</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Inteligentní databáze</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Přesná a aktuální databáze kontaktů</p>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Čistá databáze pro úspěšné kampaně
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Relevantní decision makeři s kontakty
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Detailní background informace
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Pokročilé filtrování pro vyšší konverzi
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl text-blue-600 dark:text-blue-400">👥</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Opt-in Generování</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Efektivní získávání kvalitních opt-inů</p>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Zainteresované strany hledající vaše služby
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Přímá zpětná vazba od potenciálních zákazníků
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                První commitment od správných prospectů
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Cílená komunikace s relevantními kontakty
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl text-blue-600 dark:text-blue-400">📈</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Lead Generation</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Inovativní proces generování kvalitních leadů</p>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Ověřený a úspěšný outbound proces
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Systémy dokonale spolupracující v reálném čase
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Ready-to-start koncept pro okamžité výsledky
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Budování důležitých vztahů pro další aktivity
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl text-blue-600 dark:text-blue-400">📧</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Inbound Follow-up</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Okamžitá interakce s inbound leady</p>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                První kontakt do 2 hodin od příchodu leadu
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Pozitivní zákaznická zkušenost
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Budování vztahů s osobním kontaktem
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Cenné informace pro váš sales tým
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl text-blue-600 dark:text-blue-400">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Event Management</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Plně obsazené akce a trade fairs</p>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Plně obsazený kalendář vašeho sales týmu
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Vysoký počet účastníků
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Kontakty s potenciálem
              </li>
              <li className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                Profesionální příprava a follow-up
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Proč reinventujeme telemarketing</h2>
            <p className="text-xl mb-8 opacity-90">
              Naším cílem je dodávat úžasné výsledky tím, že se staneme jedním s našimi zákazníky
              a vytváříme pozitivní zákaznické zkušenosti. Jednáme jako kolega, ne jako externí partner.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="text-5xl font-bold mb-2">1</div>
                <h3 className="text-xl font-semibold mb-2">Expertise</h3>
                <p className="opacity-90">Roky zkušeností v B2B telemarketingu</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="text-5xl font-bold mb-2">2</div>
                <h3 className="text-xl font-semibold mb-2">Technologie</h3>
                <p className="opacity-90">Nejmodernější nástroje a systémy</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
                <div className="text-5xl font-bold mb-2">3</div>
                <h3 className="text-xl font-semibold mb-2">Výsledky</h3>
                <p className="opacity-90">Prokázané výsledky pro naše klienty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Náš proces</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Systematický přístup k lead generation v evropském měřítku
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800">
              <div className="bg-blue-600 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Screening</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 font-bold">•</span>
                  Zvýšení povědomí o značce
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 font-bold">•</span>
                  Profilování accounts & sběr informací
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 font-bold">•</span>
                  Generování opt-inů
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 font-bold">•</span>
                  Budování vztahů s decision makery
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 font-bold">•</span>
                  Nastavení discovery calls
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2 font-bold">•</span>
                  Generování kvalifikovaného zájmu
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-8 border border-green-100 dark:border-green-800">
              <div className="bg-green-600 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Nurturing</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 font-bold">•</span>
                  Rozšiřování vztahů s decision makery
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 font-bold">•</span>
                  Pre/post calling pro inbound leads
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 font-bold">•</span>
                  Evaluace buying center
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 font-bold">•</span>
                  Fixování appointmentů
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 font-bold">•</span>
                  Lead generation & nurturing
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2 font-bold">•</span>
                  Opportunity hunting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 dark:bg-slate-950 py-20 border-y border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Připraveni začít s inteligentnějším telemarketingem?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Kontaktujte nás ještě dnes a zjistěte, jak můžeme pomoci vašemu businessu růst
          </p>
          <a href="#contact" className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Domluvit schůzku
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Kontaktujte nás</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">Máte otázky? Rádi vám pomůžeme</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Jméno *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Společnost *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">Zpráva *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Odeslat zprávu
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mr-4">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Adresa</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Theresienhoehe 28, 1st Floor<br />
                    80339 Munich, Germany
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mr-4">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Telefon</h3>
                  <p className="text-slate-600 dark:text-slate-400">+49 89 123 456 78</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 mr-4">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400">info@leadhunter.com</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 mt-8 border border-blue-100 dark:border-blue-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Hodiny</h3>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p>Pondělí - Pátek: 9:00 - 18:00</p>
                  <p>Sobota - Neděle: Zavřeno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-bold">LEADHUNTER</span>
              </div>
              <p className="text-slate-400">
                Váš partner pro B2B telemarketing a lead generation v Evropě
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Služby</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#services" className="hover:text-white transition">Telemarketing</a></li>
                <li><a href="#services" className="hover:text-white transition">Lead Generation</a></li>
                <li><a href="#services" className="hover:text-white transition">Database</a></li>
                <li><a href="#services" className="hover:text-white transition">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Společnost</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#about" className="hover:text-white transition">O nás</a></li>
                <li><a href="#" className="hover:text-white transition">Kariéra</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#contact" className="hover:text-white transition">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 LeadHunter. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
