import { useEffect, useState } from 'react';
import { Gift, Trophy, CheckCircle2, RotateCcw, Share2, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentSubmission } from '../types/canteen';

interface SuccessScreenProps {
  submission: StudentSubmission;
  managerWhatsApp: string;
  onLogoutAndReset: () => void;
}

export function SuccessScreen({ submission, managerWhatsApp, onLogoutAndReset }: SuccessScreenProps) {
  const [countdown, setCountdown] = useState<number>(15);

  // Trigger celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch (e) {
      console.warn('Confetti animation error:', e);
    }
  }, []);

  // Countdown auto logout
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onLogoutAndReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLogoutAndReset]);

  // Construct formatted WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `🍔 *School Canteen Lucky Draw Entry!* 🎉\n` +
    `-----------------------------\n` +
    `🎫 *Token No:* ${submission.tokenNumber}\n` +
    `👤 *Student Name:* ${submission.name}\n` +
    `🏫 *Class:* ${submission.studentClass}\n` +
    `📞 *Phone:* ${submission.phone}\n` +
    `🍽️ *Wanted Food:* ${submission.wantedFoodItem}\n` +
    `🏷️ *Ideal Price:* ${submission.idealPrice}\n` +
    `🥤 *Favorite Combo:* ${submission.favoriteCombo}\n` +
    `⏰ *Submitted:* ${submission.timestamp}\n` +
    `-----------------------------\n` +
    `_Good Food = Happy People :)_`
  );

  const cleanWhatsAppNumber = (managerWhatsApp || '923440910083').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${whatsappMessage}`;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-center">
      
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-500 border-4 border-slate-900 shadow-xl flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
        🎉
      </div>

      <h1 className="text-3xl sm:text-4xl font-['Bungee',cursive] text-slate-900 leading-tight">
        Thank You, <br />
        <span className="text-red-600">{submission.name}!</span> 🥳
      </h1>
      
      <p className="mt-2 text-sm sm:text-base font-bold text-slate-700">
        Your 3 canteen food choices have been officially registered!
      </p>

      {/* Lucky Draw Ticket Card */}
      <div className="my-6 bg-amber-300 rounded-3xl p-6 sm:p-7 border-4 border-slate-900 shadow-2xl relative overflow-hidden text-left">
        
        {/* Decorative Ticket Perforations on sides */}
        <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-amber-50 border-4 border-slate-900 -translate-y-1/2"></div>
        <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-amber-50 border-4 border-slate-900 -translate-y-1/2"></div>

        <div className="flex items-start justify-between border-b-2 border-dashed border-amber-500 pb-4 mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white">
              Official Lucky Draw Pass
            </span>
            <h3 className="font-['Bungee',cursive] text-xl sm:text-2xl text-slate-900 mt-1">
              {submission.tokenNumber}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center text-2xl shadow-xs">
            🎁
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs mb-4">
          <div>
            <span className="text-amber-900 font-bold block text-[10px] uppercase">Student Name:</span>
            <strong className="text-slate-900 text-sm font-extrabold">{submission.name}</strong>
          </div>
          <div>
            <span className="text-amber-900 font-bold block text-[10px] uppercase">Class & Section:</span>
            <strong className="text-slate-900 text-sm font-extrabold">{submission.studentClass}</strong>
          </div>
          <div>
            <span className="text-amber-900 font-bold block text-[10px] uppercase">Food Choice:</span>
            <span className="text-slate-800 font-semibold">{submission.wantedFoodItem}</span>
          </div>
          <div>
            <span className="text-amber-900 font-bold block text-[10px] uppercase">Voted Price:</span>
            <span className="text-slate-800 font-semibold">{submission.idealPrice}</span>
          </div>
        </div>

        <div className="p-3 bg-white/90 rounded-2xl border-2 border-slate-900 text-xs font-bold text-slate-800 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
          <span>5 lucky winners will be selected this Friday at the Canteen Counter!</span>
        </div>

      </div>

      {/* WhatsApp Dispatch Action */}
      <div className="mb-6 space-y-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-['Bungee',cursive] text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 border-3 border-emerald-800 transition-all cursor-pointer transform hover:scale-101"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span>Send Entry to WhatsApp (0344-0910083)</span>
        </a>
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Official Canteen WhatsApp: 0344-0910083 • Click above to send your entry!</span>
        </div>
      </div>

      {/* Logout / Next Student Button */}
      <div className="pt-2 border-t-2 border-slate-200">
        <button
          onClick={onLogoutAndReset}
          className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-['Bungee',cursive] text-base tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-98"
        >
          <RotateCcw className="w-5 h-5 text-amber-400" />
          <span>Done / Next Student (Reset)</span>
        </button>

        <p className="mt-2 text-xs font-semibold text-slate-500">
          Auto-resetting for next student in <span className="text-red-600 font-extrabold">{countdown}s</span>...
        </p>
      </div>

    </div>
  );
}
