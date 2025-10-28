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
      color: 'blue',
      description: 'Všechny leady v systému',
    },
    {
      title: 'Nové leady',
      value: stats.new,
      icon: '🆕',
      color: 'indigo',
      description: 'Čekají na kontaktování',
    },
    {
      title: 'Kontaktované',
      value: stats.contacted,
      icon: '📞',
      color: 'amber',
      description: 'První kontakt proběhl',
    },
    {
      title: 'Kvalifikované',
      value: stats.qualified,
      icon: '✅',
      color: 'emerald',
      description: 'Perspektivní příležitosti',
    },
    {
      title: 'Uzavřené - vyhráno',
      value: stats.closed_won,
      icon: '🎉',
      color: 'green',
      description: 'Úspěšné konverze',
    },
    {
      title: 'Průměrné AI skóre',
      value: `${stats.avgScore}%`,
      icon: '🎯',
      color: 'purple',
      description: 'Kvalita leadů',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: {[key: string]: {bg: string, text: string, icon: string}} = {
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', icon: 'bg-blue-100 dark:bg-blue-900/40' },
      indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', icon: 'bg-indigo-100 dark:bg-indigo-900/40' },
      amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', icon: 'bg-amber-100 dark:bg-amber-900/40' },
      emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', icon: 'bg-emerald-100 dark:bg-emerald-900/40' },
      green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', icon: 'bg-green-100 dark:bg-green-900/40' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', icon: 'bg-purple-100 dark:bg-purple-900/40' },
    };
    return colors[color] || colors.blue;
  };

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Přehled vašich leadů a statistik
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => {
          const colors = getColorClasses(card.color);
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100 dark:border-slate-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${colors.icon} flex items-center justify-center text-2xl`}>
                    {card.icon}
                  </div>
                  <div className={`text-3xl font-bold ${colors.text}`}>
                    {typeof card.value === 'number' ? card.value : card.value}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conversion Rate Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Míra konverze</h3>
            <p className="text-slate-600 dark:text-slate-400">Poměr úspěšně uzavřených leadů</p>
          </div>
          <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
            {conversionRate}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${conversionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Poslední leady
          </h2>
          <button
            onClick={() => navigate('/leads')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Zobrazit vše →
          </button>
        </div>

        {recentLeads.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Zatím nemáte žádné leady
            </p>
            <button
              onClick={() => navigate('/leads')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Přidat první lead
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-100 dark:border-slate-600"
                onClick={() => navigate('/leads')}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                    {lead.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">
                      {lead.full_name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {lead.company_name || lead.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {lead.ai_score && (
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      lead.ai_score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                      lead.ai_score >= 60 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                      lead.ai_score >= 40 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                    }`}>
                      {lead.ai_score}%
                    </span>
                  )}
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                    lead.status === 'contacted' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                    lead.status === 'qualified' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' :
                    lead.status === 'closed_won' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </Layout>
  );
}
