import { useState } from 'react';
import { Trophy, Gift, ArrowRight, User, GraduationCap, Phone, Heart, QrCode } from 'lucide-react';
import { StudentRegistration } from '../types/canteen';
import { CLASSES_LIST } from '../data/canteenData';

interface RegistrationFormProps {
  onStartChallenge: (data: StudentRegistration) => void;
  onOpenQRCode: () => void;
}

export function RegistrationForm({ onStartChallenge, onOpenQRCode }: RegistrationFormProps) {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('Class 9 (Matric)');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name!');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setError('Please enter a valid WhatsApp or phone number so we can contact you if you win!');
      return;
    }
    setError('');
    onStartChallenge({
      name: name.trim(),
      studentClass,
      phone: phone.trim()
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      
      {/* Top Banner Card matching Flyer Aesthetic */}
      <div className="relative bg-amber-400 rounded-3xl p-6 sm:p-8 border-4 border-amber-500 shadow-xl overflow-hidden text-center mb-6">
        
        {/* Floating fun badges */}
        <div className="absolute top-2 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full transform -rotate-6 shadow-sm">
          Good Food = Happy People :)
        </div>
        <div className="absolute top-2 right-3 bg-white text-red-600 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full transform rotate-6 border border-red-500 shadow-sm flex items-center gap-1">
          <Heart className="w-2.5 h-2.5 fill-red-600" />
          <span>Your Taste Matters!</span>
        </div>

        {/* Big Yellow / Red Title */}
        <div className="mt-4 sm:mt-2">
          <span className="text-3xl sm:text-4xl">👨‍🍳</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Bungee',cursive] text-slate-900 tracking-tight leading-[1.05] drop-shadow-xs">
            You Decide Our <br />
            <span className="text-red-600 underline decoration-wavy decoration-yellow-200">
              Next Food Item!
            </span>
          </h1>
        </div>

        {/* Blue Ribbon for Subhead */}
        <div className="mt-4 inline-block bg-blue-900 text-white px-5 py-2 rounded-2xl shadow-md border-2 border-blue-950 transform -rotate-1">
          <p className="text-xs sm:text-sm font-extrabold tracking-wide font-['Fredoka',sans-serif]">
            Just <span className="text-yellow-300 text-base">3 Quick Questions</span>. Share Your Choice.
          </p>
        </div>

        {/* 3 Step Icons row matching the flyer */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
          <div className="bg-pink-100 rounded-2xl p-2.5 sm:p-3 border-2 border-pink-300 flex flex-col items-center">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center mb-1">
              1
            </span>
            <span className="text-2xl mb-1">🍔</span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
              Which food item do you want?
            </span>
          </div>

          <div className="bg-amber-100 rounded-2xl p-2.5 sm:p-3 border-2 border-amber-300 flex flex-col items-center">
            <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center mb-1">
              2
            </span>
            <span className="text-2xl mb-1">🏷️</span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
              What is your ideal price?
            </span>
          </div>

          <div className="bg-emerald-100 rounded-2xl p-2.5 sm:p-3 border-2 border-emerald-300 flex flex-col items-center">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-1">
              3
            </span>
            <span className="text-2xl mb-1">🍟🥤</span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
              Favorite from 3 combos?
            </span>
          </div>
        </div>

        {/* Red Ribbon Prize Banner + QR Code Trigger */}
        <button
          type="button"
          onClick={onOpenQRCode}
          className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-2xl shadow-lg border-2 border-red-800 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
        >
          <Gift className="w-5 h-5 text-yellow-300 animate-bounce" />
          <span className="font-['Bungee',cursive] text-sm sm:text-base tracking-wide text-yellow-300">
            Scan & Win a Prize! (Get QR Code)
          </span>
          <QrCode className="w-5 h-5 text-white ml-1" />
        </button>

        {/* Footer info from flyer */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-amber-950">
          <Trophy className="w-4 h-4 text-amber-700 shrink-0" />
          <span>5 Winners Every Week will get a Small Combo Prize! 🏆</span>
        </div>

      </div>

      {/* Student Entry Registration Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-slate-900 shadow-xl relative">
        
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b-2 border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-lg">
            📝
          </div>
          <div>
            <h2 className="text-xl font-['Bungee',cursive] text-slate-900 leading-tight">
              Student Registration
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Enter your details to register for the Lucky Draw!
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-400 text-red-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Student Name */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>Full Name (Apna Poora Naam) *</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ali Ahmed / Fatima Khan"
              className="w-full text-sm font-semibold rounded-2xl border-2 border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Student Class */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
              <span>Class & Section *</span>
            </label>
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full text-sm font-semibold rounded-2xl border-2 border-slate-300 px-4 py-3 text-slate-900 bg-slate-50 focus:bg-white focus:border-red-600 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all cursor-pointer"
            >
              {CLASSES_LIST.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* WhatsApp / Phone Number */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp / Phone No. (For Prize Notification) *</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0300 1234567 or parent's phone"
              className="w-full text-sm font-semibold rounded-2xl border-2 border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 transition-all bg-slate-50 focus:bg-white"
            />
            <p className="mt-1 text-[11px] text-slate-500 font-medium">
              💡 We will WhatsApp/Call this number if you win the free combo!
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-['Bungee',cursive] text-base tracking-wider shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer border-2 border-red-800"
            >
              <span>Start 3 Questions</span>
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
