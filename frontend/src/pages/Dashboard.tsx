import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

interface Stats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  closed_won: number;
  closed_lost: number;
  avgScore: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed_won: 0,
    closed_lost: 0,
    avgScore: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await api.get('/leads/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const leads = response.data;

      // Calculate statistics
      const statsData = {
        total: leads.length,
        new: leads.filter((l: any) => l.status === 'new').length,
        contacted: leads.filter((l: any) => l.status === 'contacted').length,
        qualified: leads.filter((l: any) => l.status === 'qualified').length,
        closed_won: leads.filter((l: any) => l.status === 'closed_won').length,
        closed_lost: leads.filter((l: any) => l.status === 'closed_lost').length,
        avgScore: leads.length > 0
          ? Math.round(leads.reduce((acc: number, l: any) => acc + (l.ai_score || 0), 0) / leads.length)
          : 0,
      };

      setStats(statsData);
      setRecentLeads(leads.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Celkový počet leadů',
      value: stats.total,
      icon: '📊',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Všechny leady v systému',
    },
    {
      title: 'Nové leady',
      value: stats.new,
      icon: '🆕',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Čekají na kontaktování',
    },
    {
      title: 'Kontaktované',
      value: stats.contacted,
      icon: '📞',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'První kontakt proběhl',
    },
    {
      title: 'Kvalifikované',
      value: stats.qualified,
      icon: '✅',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Perspektivní příležitosti',
    },
    {
      title: 'Uzavřené - vyhráno',
      value: stats.closed_won,
      icon: '🎉',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Úspěšné konverze',
    },
    {
      title: 'Průměrné AI skóre',
      value: `${stats.avgScore}%`,
      icon: '🎯',
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Kvalita leadů',
    },
  ];

  const conversionRate = stats.total > 0 ? Math.round((stats.closed_won / stats.total) * 100) : 0;

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
          Dashboard 🎯
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Přehled vašich leadů a statistik
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-slideUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${card.gradient} text-white text-sm font-semibold shadow`}>
                  {typeof card.value === 'number' ? card.value : card.value}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Rate Card */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Míra konverze</h3>
            <p className="text-purple-100">Poměr úspěšně uzavřených leadů</p>
          </div>
          <div className="text-6xl font-bold">
            {conversionRate}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 bg-white/20 rounded-full h-4 overflow-hidden backdrop-blur-sm">
          <div
            className="bg-white h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
            style={{ width: `${conversionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Poslední leady
          </h2>
          <button
            onClick={() => navigate('/leads')}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Zobrazit vše →
          </button>
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-500 dark:text-slate-400">
              Zatím nemáte žádné leady
            </p>
            <button
              onClick={() => navigate('/leads')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Přidat první lead
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate('/leads')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {lead.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      {lead.full_name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {lead.company_name || lead.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {lead.ai_score && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lead.ai_score >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      lead.ai_score >= 60 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      lead.ai_score >= 40 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {lead.ai_score}%
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    lead.status === 'qualified' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    lead.status === 'closed_won' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </Layout>
  );
}
