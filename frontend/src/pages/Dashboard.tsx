export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-800">
              🎯 LeadHunter
            </h1>
            <div className="flex space-x-4">
              <a href="/dashboard" className="text-blue-600 font-semibold">
                Dashboard
              </a>
              <a href="/leads" className="text-gray-600 hover:text-gray-800">
                Leady
              </a>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Odhlásit se
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎉 Vítejte v LeadHunter!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Váš backend a frontend fungují perfektně! Aplikace je připravená k rozšíření.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2 text-lg">📊 Leady</h3>
              <p className="text-blue-700 text-4xl font-bold mb-2">0</p>
              <p className="text-blue-600 text-sm">Celkem v databázi</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2 text-lg">📧 Kampaně</h3>
              <p className="text-green-700 text-4xl font-bold mb-2">0</p>
              <p className="text-green-600 text-sm">Aktivní kampaně</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2 text-lg">🎯 Konverze</h3>
              <p className="text-purple-700 text-4xl font-bold mb-2">0%</p>
              <p className="text-purple-600 text-sm">Úspěšnost</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            ✅ Co funguje:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Backend API (FastAPI + PostgreSQL)</li>
            <li>✅ Autentizace s JWT tokeny</li>
            <li>✅ React frontend s Tailwind CSS</li>
            <li>✅ Komunikace frontend → backend</li>
            <li>✅ Lead Management systém</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            🚀 Další kroky:
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>🤖 AI generování zpráv (OpenAI API)</li>
            <li>📧 Email kampaně (SendGrid)</li>
            <li>🔍 Web scraping (získávání leadů)</li>
            <li>📊 Pokročilá analytika</li>
          </ul>
        </div>
      </main>
    </div>
  );
}