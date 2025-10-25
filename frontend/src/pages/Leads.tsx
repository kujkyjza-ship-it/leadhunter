import { useState, useEffect } from 'react';
import api from '../services/api';

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  job_title?: string;
  status: string;
  created_at: string;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    job_title: '',
    notes: '',
  });
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [generatedMessages, setGeneratedMessages] = useState<{[key: string]: any}>({});
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchLeads();
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter) params.append('status', statusFilter);
      params.append('sort_by', sortBy);
      params.append('sort_order', sortOrder);

      const response = await api.get(`/leads?${params.toString()}`);
      setLeads(response.data);
      setSelectedLeads(new Set()); // Vyčistit výběr při refresh
    } catch (error) {
      console.error('Chyba při načítání leadů:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: {[key: string]: {label: string, color: string}} = {
      'new': { label: 'Nový', color: 'bg-blue-100 text-blue-800' },
      'contacted': { label: 'Kontaktován', color: 'bg-yellow-100 text-yellow-800' },
      'qualified': { label: 'Kvalifikován', color: 'bg-purple-100 text-purple-800' },
      'proposal': { label: 'Nabídka', color: 'bg-indigo-100 text-indigo-800' },
      'negotiation': { label: 'Vyjednávání', color: 'bg-orange-100 text-orange-800' },
      'closed_won': { label: 'Uzavřeno - Vyhráno', color: 'bg-green-100 text-green-800' },
      'closed_lost': { label: 'Uzavřeno - Prohráno', color: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
    return { label: config.label, color: config.color };
  };

  const toggleLeadSelection = (leadId: string) => {
    const newSelection = new Set(selectedLeads);
    if (newSelection.has(leadId)) {
      newSelection.delete(leadId);
    } else {
      newSelection.add(leadId);
    }
    setSelectedLeads(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(leads.map(l => l.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLeads.size === 0) return;
    if (!confirm(`Opravdu smazat ${selectedLeads.size} leadů?`)) return;

    try {
      await api.post('/leads/bulk-delete', Array.from(selectedLeads));
      fetchLeads();
    } catch (error: any) {
      alert('Chyba při mazání: ' + (error.response?.data?.detail || 'Neznámá chyba'));
    }
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (selectedLeads.size === 0) return;

    try {
      await api.post('/leads/bulk-update-status', {
        lead_ids: Array.from(selectedLeads),
        new_status: newStatus
      });
      fetchLeads();
    } catch (error: any) {
      alert('Chyba při změně statusu: ' + (error.response?.data?.detail || 'Neznámá chyba'));
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await api.put(`/leads/${leadId}`, { status: newStatus });
      fetchLeads();
    } catch (error: any) {
      alert('Chyba při změně statusu: ' + (error.response?.data?.detail || 'Neznámá chyba'));
    }
  };

  const handleExportCSV = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter) params.append('status', statusFilter);

      const response = await api.get(`/leads/export/csv?${params.toString()}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Chyba při exportu CSV');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/leads', formData);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company_name: '',
        job_title: '',
        notes: '',
      });
      setShowForm(false);
      fetchLeads();
    } catch (error: any) {
      alert('Chyba: ' + (error.response?.data?.detail || 'Nepodařilo se přidat lead'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Opravdu smazat tento lead?')) return;

    try {
      await api.delete(`/leads/${id}`);
      fetchLeads();
    } catch (error) {
      alert('Chyba při mazání leadu');
    }
  };

  const handleGenerateMessage = async (leadId: string) => {
    setGeneratingFor(leadId);
    try {
      const response = await api.post(`/leads/${leadId}/generate-message`);
      setGeneratedMessages({ ...generatedMessages, [leadId]: response.data });
      setCurrentMessage(response.data);
      setShowMessageModal(true);
    } catch (error: any) {
      alert('Chyba při generování: ' + (error.response?.data?.detail || 'Neznámá chyba'));
    } finally {
      setGeneratingFor(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Zkopírováno do schránky!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Načítání...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-800">🎯 LeadHunter</h1>
            <div className="flex space-x-4">
              <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
                Dashboard
              </a>
              <a href="/leads" className="text-blue-600 font-semibold">
                Leady
              </a>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Odhlásit
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            📊 Vaše Leady
          </h2>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
            >
              📥 Export CSV
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              {showForm ? '✕ Zrušit' : '+ Přidat Lead'}
            </button>
          </div>
        </div>

        {selectedLeads.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-blue-800">
                  Vybráno: {selectedLeads.size} leadů
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
                >
                  Smazat vybrané
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-700">Změnit status na:</span>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleBulkStatusUpdate(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">-- Vyberte status --</option>
                  <option value="new">Nový</option>
                  <option value="contacted">Kontaktován</option>
                  <option value="qualified">Kvalifikován</option>
                  <option value="proposal">Nabídka</option>
                  <option value="negotiation">Vyjednávání</option>
                  <option value="closed_won">Uzavřeno - Vyhráno</option>
                  <option value="closed_lost">Uzavřeno - Prohráno</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vyhledávání
              </label>
              <input
                type="text"
                placeholder="Hledat podle jména, emailu nebo firmy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Všechny statusy</option>
                <option value="new">Nový</option>
                <option value="contacted">Kontaktován</option>
                <option value="qualified">Kvalifikován</option>
                <option value="proposal">Nabídka</option>
                <option value="negotiation">Vyjednávání</option>
                <option value="closed_won">Uzavřeno - Vyhráno</option>
                <option value="closed_lost">Uzavřeno - Prohráno</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Řazení
              </label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="created_at-desc">Nejnovější</option>
                <option value="created_at-asc">Nejstarší</option>
                <option value="full_name-asc">Jméno (A-Z)</option>
                <option value="full_name-desc">Jméno (Z-A)</option>
                <option value="company_name-asc">Firma (A-Z)</option>
                <option value="company_name-desc">Firma (Z-A)</option>
                <option value="status-asc">Status (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Nový Lead</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Celé jméno *
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Firma
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pracovní pozice
                </label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poznámky
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                  💾 Uložit Lead
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                Zatím nemáte žádné leady
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Přidat první lead
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedLeads.size === leads.length && leads.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jméno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Firma
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pozice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Akce
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => {
                    const statusBadge = getStatusBadge(lead.status);
                    return (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input
                          type="checkbox"
                          checked={selectedLeads.has(lead.id)}
                          onChange={() => toggleLeadSelection(lead.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.full_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {lead.phone || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {lead.company_name || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {lead.job_title || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-semibold rounded-full border-0 outline-none cursor-pointer ${statusBadge.color}`}
                        >
                          <option value="new">Nový</option>
                          <option value="contacted">Kontaktován</option>
                          <option value="qualified">Kvalifikován</option>
                          <option value="proposal">Nabídka</option>
                          <option value="negotiation">Vyjednávání</option>
                          <option value="closed_won">Uzavřeno - Vyhráno</option>
                          <option value="closed_lost">Uzavřeno - Prohráno</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleGenerateMessage(lead.id)}
                          disabled={generatingFor === lead.id}
                          className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                        >
                          {generatingFor === lead.id ? '⏳ Generuji...' : '🤖 Generuj zprávu'}
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          🗑️ Smazat
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> Celkem máte <strong>{leads.length}</strong> leadů v databázi.
          </p>
        </div>
      </main>

      {showMessageModal && currentMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  🤖 AI Vygenerovaná Zpráva
                </h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📧 Předmět:
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{currentMessage.subject}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentMessage.subject)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    📋 Kopírovat předmět
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ✉️ Tělo emailu:
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-800 whitespace-pre-wrap">{currentMessage.body}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentMessage.body)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    📋 Kopírovat tělo
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => copyToClipboard(`${currentMessage.subject}\n\n${currentMessage.body}`)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    📋 Kopírovat vše
                  </button>
                  <button
                    onClick={() => setShowMessageModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-semibold"
                  >
                    Zavřít
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}