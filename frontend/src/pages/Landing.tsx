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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-2xl font-bold text-gray-800">LEADHUNTER</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition">Služby</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition">O nás</a>
              <a href="#process" className="text-gray-600 hover:text-blue-600 transition">Proces</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">Kontakt</a>
            </nav>

            <button
              onClick={() => navigate('/login')}
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Přihlásit se
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-3">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>Služby</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>O nás</a>
              <a href="#process" className="text-gray-600 hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>Proces</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>Kontakt</a>
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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Advanced B2B
            <span className="block text-blue-600 mt-2">Telemarketing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Hledáte zkušený inside sales nebo telemarketing tým pro etablování relevantního podílu na evropském trhu?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-flex items-center justify-center">
              Začít nyní
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="#services" className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
              Zjistit více
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 text-sm md:text-base">B2B Lead Generation projektů</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600 text-sm md:text-base">Let zkušeností v inside sales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600 text-sm md:text-base">Profilovaných accounts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600 text-sm md:text-base">Kvalifikovaných kontaktů</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Naše služby</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kompletní portfolio B2B telemarketingu a lead generation služeb pro váš úspěch
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              ),
              title: 'Telemarketing & Inside Sales',
              description: 'Zkušený B2B telemarketing tým pro evropský trh',
              features: [
                'Profesionální komunikace na executive úrovni',
                'Rychlé zapracování do nových témat',
                'Motivovaný tým s prokázanými výsledky',
                'Propojení s vašimi marketing a sales systémy'
              ]
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              ),
              title: 'Inteligentní databáze',
              description: 'Přesná a aktuální databáze kontaktů',
              features: [
                'Čistá databáze pro úspěšné kampaně',
                'Relevantní decision makeři s kontakty',
                'Detailní background informace',
                'Pokročilé filtrování pro vyšší konverzi'
              ]
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              ),
              title: 'Opt-in Generování',
              description: 'Efektivní získávání kvalitních opt-inů',
              features: [
                'Zainteresované strany hledající vaše služby',
                'Přímá zpětná vazba od potenciálních zákazníků',
                'První commitment od správných prospectů',
                'Cílená komunikace s relevantními kontakty'
              ]
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              ),
              title: 'Lead Generation',
              description: 'Inovativní proces generování kvalitních leadů',
              features: [
                'Ověřený a úspěšný outbound proces',
                'Systémy dokonale spolupracující v reálném čase',
                'Ready-to-start koncept pro okamžité výsledky',
                'Budování důležitých vztahů pro další aktivity'
              ]
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              ),
              title: 'Inbound Follow-up',
              description: 'Okamžitá interakce s inbound leady',
              features: [
                'První kontakt do 2 hodin od příchodu leadu',
                'Pozitivní zákaznická zkušenost',
                'Budování vztahů s osobním kontaktem',
                'Cenné informace pro váš sales tým'
              ]
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ),
              title: 'Event Management',
              description: 'Plně obsazené akce a trade fairs',
              features: [
                'Plně obsazený kalendář vašeho sales týmu',
                'Vysoký počet účastníků',
                'Kontakty s potenciálem',
                'Profesionální příprava a follow-up'
              ]
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <svg className="w-12 h-12 text-blue-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {service.icon}
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Proč reinventujeme telemarketing</h2>
            <p className="text-xl mb-8 opacity-90">
              Naším cílem je dodávat úžasné výsledky tím, že se staneme jedním s našimi zákazníky
              a vytváříme pozitivní zákaznické zkušenosti. Jednáme jako kolega, ne jako externí partner.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-5xl font-bold mb-2">1</div>
                <h3 className="text-xl font-semibold mb-2">Expertise</h3>
                <p className="opacity-90">Roky zkušeností v B2B telemarketingu</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-5xl font-bold mb-2">2</div>
                <h3 className="text-xl font-semibold mb-2">Technologie</h3>
                <p className="opacity-90">Nejmodernější nástroje a systémy</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Náš proces</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Systematický přístup k lead generation v evropském měřítku
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <div className="bg-blue-600 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Screening</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Zvýšení povědomí o značce',
                  'Profilování accounts & sběr informací',
                  'Generování opt-inů',
                  'Budování vztahů s decision makery',
                  'Nastavení discovery calls',
                  'Generování kvalifikovaného zájmu'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
              <div className="bg-green-600 text-white rounded-lg w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nurturing</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Rozšiřování vztahů s decision makery',
                  'Pre/post calling pro inbound leads',
                  'Evaluace buying center',
                  'Fixování appointmentů',
                  'Lead generation & nurturing',
                  'Opportunity hunting'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Připraveni začít s inteligentnějším telemarketingem?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Kontaktujte nás ještě dnes a zjistěte, jak můžeme pomoci vašemu businessu růst
          </p>
          <a href="#contact" className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Domluvit schůzku
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kontaktujte nás</h2>
            <p className="text-xl text-gray-600">Máte otázky? Rádi vám pomůžeme</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Jméno *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Společnost *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Zpráva *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Odeslat zprávu
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Adresa</h3>
                  <p className="text-gray-600">
                    Theresienhoehe 28, 1st Floor<br />
                    80339 Munich, Germany
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                  <p className="text-gray-600">+49 89 123 456 78</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@leadhunter.com</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mt-8">
                <h3 className="font-bold text-gray-900 mb-3">Hodiny</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Pondělí - Pátek: 9:00 - 18:00</p>
                  <p>Sobota - Neděle: Zavřeno</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xl font-bold">LEADHUNTER</span>
              </div>
              <p className="text-gray-400">
                Váš partner pro B2B telemarketing a lead generation v Evropě
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Služby</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition">Telemarketing</a></li>
                <li><a href="#services" className="hover:text-white transition">Lead Generation</a></li>
                <li><a href="#services" className="hover:text-white transition">Database</a></li>
                <li><a href="#services" className="hover:text-white transition">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Společnost</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition">O nás</a></li>
                <li><a href="#" className="hover:text-white transition">Kariéra</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#contact" className="hover:text-white transition">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LeadHunter. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
