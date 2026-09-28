import { useState } from 'react';
import { 
  Shield, 
  X, 
  Download, 
  Trophy, 
  Phone, 
  Search, 
  Trash2, 
  CheckCircle, 
  Sparkles, 
  Settings, 
  MessageCircle, 
  Users,
  Utensils,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentSubmission, CanteenConfig } from '../types/canteen';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: StudentSubmission[];
  onDeleteSubmission: (id: string) => void;
  onClearAll: () => void;
  config: CanteenConfig;
  onUpdateConfig: (newConfig: CanteenConfig) => void;
}

export function AdminDashboard({
  isOpen,
  onClose,
  submissions,
  onDeleteSubmission,
  onClearAll,
  config,
  onUpdateConfig
}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [selectedWinners, setSelectedWinners] = useState<StudentSubmission[]>([]);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Settings form state
  const [editWhatsApp, setEditWhatsApp] = useState<string>(config.managerWhatsApp);
  const [editEmail, setEditEmail] = useState<string>(config.managerEmail);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState<string>('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Incorrect PIN! Default PIN is 1234');
    }
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.phone.includes(searchQuery) ||
      sub.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === 'all' || sub.studentClass === classFilter;
    return matchesSearch && matchesClass;
  });

  // Calculate vote statistics
  const foodCounts: { [key: string]: number } = {};
  submissions.forEach((s) => {
    foodCounts[s.wantedFoodItem] = (foodCounts[s.wantedFoodItem] || 0) + 1;
  });
  const topFood = Object.entries(foodCounts).sort((a, b) => b[1] - a[1])[0];

  // Pick 5 Random Lucky Winners
  const handleDrawWinners = () => {
    if (submissions.length === 0) {
      alert('No student submissions yet!');
      return;
    }
    setIsDrawing(true);
    setTimeout(() => {
      // Shuffle copy
      const shuffled = [...submissions].sort(() => 0.5 - Math.random());
      const winners = shuffled.slice(0, Math.min(5, submissions.length));
      setSelectedWinners(winners);
      setIsDrawing(false);
      setShowWinnerModal(true);

      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {
        console.warn(e);
      }
    }, 1000);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('No data to export!');
      return;
    }

    const headers = ['Token Number,Full Name,Class,Phone,Wanted Food Item,Ideal Price,Favorite Combo,Submitted At'];
    const rows = submissions.map((s) => 
      `"${s.tokenNumber}","${s.name}","${s.studentClass}","${s.phone}","${s.wantedFoodItem}","${s.idealPrice}","${s.favoriteCombo}","${s.timestamp}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Canteen_Student_Submissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...config,
      managerWhatsApp: editWhatsApp.trim(),
      managerEmail: editEmail.trim()
    });
    setSavedSettingsNotice('Settings updated successfully!');
    setTimeout(() => setSavedSettingsNotice(''), 3000);
  };

  // WhatsApp individual student
  const openWhatsAppStudent = (sub: StudentSubmission, isWinnerMsg = false) => {
    const cleanPhone = sub.phone.replace(/[^0-9]/g, '');
    let msg = '';
    if (isWinnerMsg) {
      msg = `🎉 *CONGRATULATIONS ${sub.name.toUpperCase()}!* 🏆\n` +
        `You are one of our *5 LUCKY WINNERS* in the School Canteen Draw! 🎁\n\n` +
        `🎫 Your Token: ${sub.tokenNumber}\n` +
        `🏫 Class: ${sub.studentClass}\n\n` +
        `Please show this message at the *Canteen Counter* during break time to claim your *FREE Combo Meal*! 🍔🍟🥤`;
    } else {
      msg = `Hi ${sub.name}! Your School Canteen Lucky Draw Entry (#${sub.tokenNumber}) is recorded. Good luck for Friday's draw! 🍔`;
    }
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full border-4 border-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg">
              🔒
            </div>
            <div>
              <h2 className="font-['Bungee',cursive] text-lg sm:text-xl text-yellow-300 leading-tight">
                Canteen Staff Portal
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Live Submissions, Analytics & Lucky Winner Picker
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* PIN Gate if not logged in */}
          {!isAuthenticated ? (
            <div className="max-w-sm mx-auto text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-slate-900 flex items-center justify-center text-3xl mx-auto">
                🔐
              </div>
              <h3 className="font-['Bungee',cursive] text-xl text-slate-900">
                Staff Authentication
              </h3>
              <p className="text-xs text-slate-600">
                Enter Canteen Staff PIN to view student entries and draw weekly winners. (Default PIN: <strong className="text-red-600">1234</strong>)
              </p>

              {pinError && (
                <div className="p-2.5 bg-red-100 border border-red-300 text-red-700 text-xs font-bold rounded-xl">
                  {pinError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (1234)"
                  className="w-full text-center text-xl font-bold tracking-widest px-4 py-3 rounded-2xl border-2 border-slate-300 focus:border-red-600 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-['Bungee',cursive] text-sm tracking-wider cursor-pointer shadow-md"
                >
                  Unlock Staff Dashboard
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-amber-100 border-2 border-amber-300 text-slate-900">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase text-amber-800">Total Entries</span>
                    <Users className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-3xl font-['Bungee',cursive] text-slate-900">
                    {submissions.length}
                  </div>
                  <p className="text-[11px] text-amber-900 font-semibold mt-0.5">Students Registered</p>
                </div>

                <div className="p-4 rounded-2xl bg-red-100 border-2 border-red-300 text-slate-900">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase text-red-800">#1 Wanted Food</span>
                    <Utensils className="w-4 h-4 text-red-700" />
                  </div>
                  <div className="text-lg font-['Bungee',cursive] text-red-700 truncate">
                    {topFood ? topFood[0] : 'None yet'}
                  </div>
                  <p className="text-[11px] text-red-900 font-semibold mt-0.5">
                    {topFood ? `${topFood[1]} votes (${Math.round((topFood[1] / submissions.length) * 100)}%)` : 'No votes yet'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-slate-900">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase text-emerald-800">Weekly Draw Status</span>
                    <Trophy className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="text-base font-['Bungee',cursive] text-emerald-800">
                    5 Prizes
                  </div>
                  <p className="text-[11px] text-emerald-900 font-semibold mt-0.5">
                    Ready to pick winners!
                  </p>
                </div>
              </div>

              {/* Action Buttons: Pick Winners & Export */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 rounded-2xl border-2 border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDrawWinners}
                    disabled={isDrawing || submissions.length === 0}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-['Bungee',cursive] text-xs sm:text-sm tracking-wide shadow-md flex items-center gap-2 cursor-pointer transition-all border border-amber-600 disabled:opacity-50"
                  >
                    <Trophy className="w-4 h-4 text-slate-950 animate-bounce" />
                    <span>{isDrawing ? 'Drawing...' : '🎉 Pick 5 Random Winners!'}</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    disabled={submissions.length === 0}
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Download Excel / CSV</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all student submissions? This cannot be undone.')) {
                      onClearAll();
                    }
                  }}
                  className="text-xs text-red-600 hover:text-red-800 font-bold underline cursor-pointer"
                >
                  Clear All Data
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by student name, phone or token #..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Table of Submissions */}
              <div className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="max-h-72 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-yellow-300 font-bold uppercase tracking-wider text-[10px] sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Token</th>
                        <th className="py-2.5 px-3">Student Name</th>
                        <th className="py-2.5 px-3">Class</th>
                        <th className="py-2.5 px-3">Phone</th>
                        <th className="py-2.5 px-3">Food Wanted</th>
                        <th className="py-2.5 px-3">Price</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.map((sub) => (
                          <tr key={sub.id} className="hover:bg-amber-50/60 transition-colors">
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                              {sub.tokenNumber}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">
                              {sub.name}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 font-medium">
                              {sub.studentClass}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-slate-700">
                              {sub.phone}
                            </td>
                            <td className="py-2.5 px-3 text-slate-800 font-semibold">
                              {sub.wantedFoodItem}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {sub.idealPrice}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openWhatsAppStudent(sub, false)}
                                  className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors cursor-pointer"
                                  title="WhatsApp Student"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onDeleteSubmission(sub.id)}
                                  className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors cursor-pointer"
                                  title="Delete Entry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                            No student entries found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notification Settings (WhatsApp & Email) */}
              <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200">
                <h4 className="font-['Bungee',cursive] text-sm text-slate-900 flex items-center gap-1.5 mb-3">
                  <Settings className="w-4 h-4 text-amber-600" />
                  <span>Canteen Manager Notification Contacts</span>
                </h4>

                {savedSettingsNotice && (
                  <div className="mb-3 p-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg">
                    {savedSettingsNotice}
                  </div>
                )}

                <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Manager WhatsApp Number:
                    </label>
                    <input
                      type="text"
                      value={editWhatsApp}
                      onChange={(e) => setEditWhatsApp(e.target.value)}
                      placeholder="e.g. 923001234567 (with country code)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-red-500 font-mono"
                    />
                    <span className="text-[10px] text-slate-500">Students send winning copies to this number.</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Manager Email Address:
                    </label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="canteen@school.edu"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-red-500"
                    />
                    <span className="text-[10px] text-slate-500">For daily backup digests.</span>
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="py-2 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
                    >
                      Save Notification Settings
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

        </div>

        {/* Footer info */}
        <div className="bg-slate-100 p-3 px-5 border-t border-slate-200 text-center text-xs text-slate-500 shrink-0">
          School Canteen Contest Management Portal • Metro City Campus
        </div>

      </div>

      {/* 5 Lucky Winners Modal */}
      {showWinnerModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-amber-300 rounded-3xl max-w-lg w-full p-6 border-4 border-slate-900 shadow-2xl text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-3xl mx-auto shadow-md">
              🏆
            </div>

            <h3 className="font-['Bungee',cursive] text-2xl text-slate-900">
              5 Lucky Winners Selected!
            </h3>
            <p className="text-xs font-bold text-slate-800">
              Click below to send official prize congratulations to each winner via WhatsApp!
            </p>

            <div className="space-y-2 text-left">
              {selectedWinners.map((winner, idx) => (
                <div
                  key={winner.id}
                  className="p-3 bg-white rounded-2xl border-2 border-slate-900 flex items-center justify-between shadow-xs"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded-full mr-1.5">
                      Winner #{idx + 1}
                    </span>
                    <strong className="text-sm font-extrabold text-slate-900">{winner.name}</strong>
                    <div className="text-[11px] text-slate-500">
                      {winner.studentClass} • {winner.phone} • Token: {winner.tokenNumber}
                    </div>
                  </div>

                  <button
                    onClick={() => openWhatsAppStudent(winner, true)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowWinnerModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-['Bungee',cursive] text-sm cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
