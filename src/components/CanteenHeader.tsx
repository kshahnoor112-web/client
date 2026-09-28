import { Shield, Trophy, QrCode } from 'lucide-react';

interface CanteenHeaderProps {
  onOpenAdmin: () => void;
  onOpenQRCode: () => void;
  submissionsCount: number;
}

export function CanteenHeader({ onOpenAdmin, onOpenQRCode }: CanteenHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-amber-400 border-b-4 border-amber-500 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-red-600 border-2 border-white shadow-md flex items-center justify-center text-white text-xl transform -rotate-3 hover:rotate-0 transition-transform">
            🍔
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Bungee',cursive] text-lg sm:text-xl tracking-wide text-red-700 leading-tight">
                CANTEEN CHOMP
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                Contest 2026
              </span>
            </div>
            <p className="text-[11px] font-bold text-amber-950 flex items-center gap-1">
              <span>Good Food = Happy People</span>
              <span className="text-red-600 font-extrabold">:)</span>
            </p>
          </div>
        </div>

        {/* Right side buttons: QR Code & Admin Trigger */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-xl bg-white/80 border-2 border-amber-500 text-xs font-bold text-amber-950 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>5 Prizes Weekly</span>
          </div>

          <button
            id="btn-qr-code"
            onClick={onOpenQRCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-yellow-300 text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer border-2 border-slate-950"
            title="Get Website QR Code & Poster"
          >
            <QrCode className="w-3.5 h-3.5 text-yellow-300" />
            <span>QR Code</span>
          </button>

          <button
            id="btn-admin-login"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer border-2 border-red-800"
            title="Canteen Staff Portal"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Staff / Admin</span>
          </button>
        </div>

      </div>
    </header>
  );
}
