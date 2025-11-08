import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Analytics } from '@vercel/analytics/react';
import { 
  Phone, 
  Database, 
  Users, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Mail,
  MapPin,
  Menu,
  X,
  Award,
  Target,
  BarChart3,
  Zap,
  Shield,
  Clock,
  ChevronRight,
  Globe,
  MessageSquare
} from 'lucide-react';

// STRIPE PAYMENT LINKS
const STRIPE_PAYMENT_LINKS = {
  starter: 'https://buy.stripe.com/test_3cI4gz9T18Ig9dw06D2Ji00',
  professional: 'https://buy.stripe.com/test_fZu3cvc192jS61k7z52Ji01'
};

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // STRIPE PAYMENT LINKS - Otevření platby
  const handlePayment = (plan: 'starter' | 'professional') => {
    window.location.href = STRIPE_PAYMENT_LINKS[plan];
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Phone className="w-12 h-12" />,
      title: "B2B Telemarketing",
      subtitle: "Profesionální komunikace na executive úrovni",
      description: "Zkušený inside sales tým pro evropský trh s prokázanými výsledky",
      features: [
        "Kvalifikace leadů na executive úrovni",
        "Rychlé zapracování do komplexních témat",
        "Multilinguální tým (DE, EN, CS, další jazyky)",
        "Integrace s CRM systémy (Salesforce, HubSpot, Pipedrive)"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: "Smart Database",
      subtitle: "Přesné targeting pro maximální ROI",
      description: "Inteligentní databáze s ověřenými kontakty decision makerů",
      features: [
        "Kvalifikované B2B kontakty",
        "Real-time validace dat",
        "GDPR compliant databáze",
        "Advanced segmentace podle ICP"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Lead Generation",
      subtitle: "Systematický proces generování leadů",
      description: "End-to-end lead generation s garantovanými výsledky",
      features: [
        "Multi-channel approach (telefon, email, LinkedIn)",
        "A/B testování messaging",
        "Transparentní reporting a analytics",
        "Pay-per-qualified-lead modely"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Meeting Setting",
      subtitle: "Plně obsazený kalendář vašeho sales týmu",
      description: "Profesionální appointment setting s high-value prospects",
      features: [
        "Kvalifikace podle BANT metodiky",
        "Příprava sales týmu před meetingem",
        "Show-rate optimalizace",
        "Follow-up automatizace"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Account-Based Marketing",
      subtitle: "Personalizovaný přístup k target accounts",
      description: "ABM strategie pro enterprise zákazníky",
      features: [
        "Research & profiling target accounts",
        "Multi-stakeholder engagement",
        "Content personalizace",
        "Sales & marketing alignment"
      ],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Sales Analytics",
      subtitle: "Data-driven rozhodování",
      description: "Detailní reporty a insights pro optimalizaci výkonu",
      features: [
        "Real-time dashboardy",
        "Prediktivní analytics",
        "Custom KPI tracking",
        "ROI kalkulace"
      ],
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const ourValues = [
    { 
      icon: <Target className="w-8 h-8" />,
      title: "Kvalita nad kvantitou", 
      description: "Zaměřujeme se na high-quality leady, které skutečně konvertují"
    },
    { 
      icon: <Shield className="w-8 h-8" />,
      title: "Transparentnost", 
      description: "Jasná komunikace, pravidelné reporty a měřitelné výsledky"
    },
    { 
      icon: <Zap className="w-8 h-8" />,
      title: "Rychlá reakce", 
      description: "Odpovídáme do 24 hodin a kampaně spouštíme do 2 týdnů"
    },
    { 
      icon: <Clock className="w-8 h-8" />,
      title: "Long-term přístup", 
      description: "Budujeme dlouhodobá partnerství, ne jen jednorázové projekty"
    }
  ];

  const whatToExpect = [
    {
      icon: <MessageSquare className="w-10 h-10" />,
      title: "Transparentní komunikace",
      description: "Pravidelné reporty, otevřená komunikace o výsledcích i výzvách. Vždy víte, na čem pracujeme a jaké jsou výsledky.",
      benefit: "Žádná černá skříňka"
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Fokus na vaše cíle",
      description: "Neprodáváme univerzální řešení. Každý projekt začíná důkladnou analýzou vašeho byznysu a specifických potřeb.",
      benefit: "Řešení šité na míru"
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Kvalitní leady, ne čísla",
      description: "Raději 10 kvalitních leadů než 100 nekvalitních kontaktů. Zaměřujeme se na decision makery, kteří odpovídají vašemu ICP.",
      benefit: "Vysoká kvalita dodávek"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      title: "Rychlý Start",
      description: "Kampagne spuštěné do 2 týdnů s garantovaným onboardingem"
    },
    {
      icon: <Target className="w-10 h-10 text-blue-600" />,
      title: "Kvalita nad Kvantitou",
      description: "Fokus na high-quality leady, které konvertují na revenue"
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
      title: "Transparentní Reporting",
      description: "Real-time access k datům a detailní ROI tracking"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Zobraz loading stav
    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton?.textContent || '';
    if (submitButton) {
      submitButton.textContent = '⏳ Odesílám...';
      submitButton.disabled = true;
    }
    
    try {
      // EMAILJS KONFIGURACE:
      const serviceID = 'service_d2okmcv';
      const templateID = 'template_gkefz5x';
      const publicKey = 'nhQSbkgTNAdOqvXZ_';
      
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone || 'Neuvedeno',
          message: formData.message,
        },
        publicKey
      );
      
      // Úspěch
      alert('✅ Děkujeme za váš zájem! Vaše zpráva byla úspěšně odeslána.\n\nNáš tým vás bude kontaktovat do 24 hodin.');
      
      // Vymaž formulář
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      
    } catch (error) {
      console.error('Chyba při odesílání:', error);
      alert('❌ Omlouváme se, něco se pokazilo.\n\nZkuste to prosím znovu nebo nám zavolejte.');
    } finally {
      // Obnov tlačítko
      if (submitButton) {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-xl">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  LeadHunterCZ
                </span>
                <p className="text-xs text-gray-500 hidden sm:block">B2B Lead Generation</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition font-medium">Služby</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition font-medium">Ceník</a>
              <a href="#why-us" className="text-gray-700 hover:text-blue-600 transition font-medium">Proč my</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition font-medium">Náš přístup</a>
              <a href="#process" className="text-gray-700 hover:text-blue-600 transition font-medium">Proces</a>
            </nav>
            
            <button 
              onClick={scrollToContact}
              className="hidden lg:flex items-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Konzultace zdarma
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-6 pb-4 flex flex-col space-y-4 animate-in slide-in-from-top">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Služby</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Ceník</a>
              <a href="#why-us" className="text-gray-700 hover:text-blue-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Proč my</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Náš přístup</a>
              <a href="#process" className="text-gray-700 hover:text-blue-600 transition font-medium" onClick={() => setMobileMenuOpen(false)}>Proces</a>
              <button 
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition font-semibold"
              >
                Konzultace zdarma
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-blue-200 mb-8 shadow-sm">
              <Award className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Profesionální B2B Lead Generation</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Škálujte váš B2B sales
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mt-2">
                s inteligentním telemarketingem
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Generujeme kvalifikované B2B leady pro evropský trh. 
              <span className="font-semibold text-gray-800"> Proven proces, měřitelné výsledky, garantovaný ROI.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Začít nyní
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#services"
                className="bg-white text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 hover:shadow-lg transition-all duration-300"
              >
                Zjistit více
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Na čem nám záleží
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hodnoty, které řídí naši práci a vztahy s klienty
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ourValues.map((value, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl group-hover:shadow-lg transition-shadow">
                    <div className="text-blue-600">
                      {value.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Proč LeadHunter
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Váš partner pro B2B growth
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kombinujeme zkušenosti, technologie a data-driven přístup pro maximální výsledky
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Naše služby
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Komplexní B2B lead generation řešení
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end služby pro každou fázi vašeho sales funnel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex bg-gradient-to-br ${service.color} p-4 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-blue-600 font-semibold mb-4">{service.subtitle}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start text-sm">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Ceník
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transparentní ceník bez skrytých poplatků
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vyberte si balíček podle vašich potřeb. Všechny ceny jsou bez DPH.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 mb-4">Pro začínající firmy</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">8.000</span>
                  <span className="text-gray-600 ml-2">Kč / měsíc</span>
                </div>
                <p className="text-sm text-gray-500">bez DPH</p>
              </div>

              <div className="mb-8">
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Leadů za měsíc:</span>
                    <span className="text-2xl font-bold text-blue-600">150</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Databáze B2B kontaktů</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Email outreach kampaně</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Základní reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Email podpora</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Měsíční report</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handlePayment('starter')}
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Začít se Starterem
              </button>
            </div>

            {/* Professional Plan - Popular */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-8 border-2 border-blue-600 relative transform scale-105 hover:scale-110 transition-all duration-300">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Nejpopulárnější
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <p className="text-blue-100 mb-4">Pro rostoucí firmy</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-white">15.000</span>
                  <span className="text-blue-100 ml-2">Kč / měsíc</span>
                </div>
                <p className="text-sm text-blue-200">bez DPH</p>
              </div>

              <div className="mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Leadů za měsíc:</span>
                    <span className="text-2xl font-bold text-white">300</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Vše ze Starteru +</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Telefonní prospecting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white">LinkedIn outreach</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white">CRM integrace (HubSpot, Pipedrive)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Dedikovaný account manager</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Týdenní reporty</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-white">Priority podpora</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handlePayment('professional')}
                className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Začít s Professional
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">Pro velké organizace</p>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-gray-900">Na míru</span>
                </div>
                <p className="text-sm text-gray-500">individuální kalkulace</p>
              </div>

              <div className="mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Leadů za měsíc:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">500+</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">Vše z Professional +</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Dedikovaný sales tým</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Custom workflow & automatizace</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">ABM strategie</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Multi-channel kampaně</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">API integrace</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">24/7 prioritní podpora</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Kontaktovat sales
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              <strong>Všechny balíčky zahrnují:</strong> GDPR compliance, kvalifikaci leadů podle BANT, transparentní reporting a žádné skryté poplatky. Smlouvy jsou bez závazku s výpovědní lhůtou 1 měsíc.
            </p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Bez skrytých poplatků</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Výpovědní lhůta 1 měsíc</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">První konzultace zdarma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Co od nás očekávat
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Náš přístup k práci
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Takhle s námi spolupráce vypadá
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whatToExpect.map((item, index) => (
              <div 
                key={index} 
                className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-blue-600">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Benefit Badge */}
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-semibold text-blue-600">{item.benefit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="text-center mt-12">
            <p className="text-white text-lg mb-4">
              Chcete vědět víc o tom, jak spolupracujeme?
            </p>
            <button
              onClick={scrollToContact}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Napište nám
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Jak to funguje
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Váš path k úspěchu
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jednoduchý a transparentní proces od první konzultace po uzavřené dealy
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-xl flex items-center justify-center">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Discovery Call</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Konzultace zdarma - analyzujeme váš business, ICP, a sales goals
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-xl flex items-center justify-center">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Strategie & Setup</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Vytvoříme custom strategy, messaging, a setup všech systémů
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-xl flex items-center justify-center">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Launch & Execution</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Spuštění kampaně s kontinuálním A/B testováním a optimalizací
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-xl flex items-center justify-center">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Lead Delivery</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Real-time delivery kvalifikovaných leadů přímo do vašeho CRM
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-xl flex items-center justify-center">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Reporting & Analytics</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Detailní reporty, dashboardy a ROI tracking pro transparentnost
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-xl flex items-center justify-center">
                      6
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Continuous Optimization</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Regular reviews, iterace a škálování based on performance data
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center border border-gray-200">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Ready to start?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Získejte první leady během 14 dnů. Zero risk, pay-per-qualified-lead model.
              </p>
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center"
              >
                Konzultace zdarma
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Připraveni škálovat váš B2B sales?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Získejte free audit vašeho současného lead generation procesu a custom growth strategy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToContact}
                className="group bg-white text-gray-900 px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Naplánovat konzultaci
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="tel:+420723170335"
                className="bg-transparent text-white border-2 border-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-flex items-center justify-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                +420 723 170 335
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Kontakt
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Pojďme společně růst
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Napište nám nebo zavolejte - odpovíme do 2 hodin
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Konzultace zdarma</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Jméno a příjmení *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Jan Novák"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="jan@firma.cz"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Společnost *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Firma s.r.o."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="+420 xxx xxx xxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Popište váš projekt *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="Popište vaše cíle, target audience, current challenges..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center text-lg"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Odeslat zprávu
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Odpovíme vám do 24 hodin • GDPR compliant
                  </p>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-5">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl flex-shrink-0">
                      <MapPin className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Kancelář</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Jalubí 495<br />
                        687 05 Jalubí, Česká republika
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 font-semibold">
                        <Globe className="w-4 h-4" />
                        <span>Česká republika</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-5">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl flex-shrink-0">
                      <Phone className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Telefon</h3>
                      <a href="tel:+420723170335" className="text-gray-600 hover:text-blue-600 transition text-lg">
                        +420 723 170 335
                      </a>
                      <p className="text-sm text-gray-500 mt-2">Po - Pá: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-5">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl flex-shrink-0">
                      <Mail className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">Email</h3>
                      <a href="mailto:kubahrna08@gmail.com" className="text-gray-600 hover:text-blue-600 transition text-lg">
                        kubahrna08@gmail.com
                      </a>
                      <p className="text-sm text-gray-500 mt-2">Odpovídáme do 2 hodin</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 rounded-2xl p-8 text-white">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Rychlá odpověď garantována</h3>
                      <p className="text-blue-100 leading-relaxed">
                        Máte urgentní projekt? Zavolejte nám nebo využijte expedited booking.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Priority Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-xl">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">LeadHunterCZ</span>
                  <p className="text-xs text-gray-400">B2B Lead Generation</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Váš partner pro B2B telemarketing, lead generation a sales development. 
                Profesionální přístup zaměřený na kvalitu a dlouhodobá partnerství.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Služby</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#services" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> B2B Telemarketing
                </a></li>
                <li><a href="#services" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Lead Generation
                </a></li>
                <li><a href="#services" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Smart Database
                </a></li>
                <li><a href="#services" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Meeting Setting
                </a></li>
                <li><a href="#services" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> ABM Strategy
                </a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Společnost</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#why-us" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> O nás
                </a></li>
                <li><a href="#pricing" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Ceník
                </a></li>
                <li><a href="#testimonials" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Náš přístup
                </a></li>
                <li><a href="#process" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Jak to funguje
                </a></li>
                <li><a href="#contact" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Kontakt
                </a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Legal & Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Privacy Policy
                </a></li>
                <li><a href="#" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Terms of Service
                </a></li>
                <li><a href="#" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> GDPR Compliance
                </a></li>
                <li><a href="#" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Cookie Policy
                </a></li>
                <li><a href="#" className="hover:text-white transition flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" /> Impressum
                </a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; 2024 LeadHunterCZ. Všechna práva vyhrazena. | Made with ❤️ in Czech Republic
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition">LinkedIn</a>
                <a href="#" className="hover:text-white transition">Twitter</a>
                <a href="#" className="hover:text-white transition">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 ${
          scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
      </button>

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
