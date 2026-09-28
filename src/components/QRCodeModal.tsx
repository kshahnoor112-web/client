import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Download, Copy, Check, Share2, Printer, ExternalLink, QrCode, MessageCircle } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  canteenName: string;
  managerWhatsApp: string;
}

export function QRCodeModal({ isOpen, onClose, canteenName, managerWhatsApp }: QRCodeModalProps) {
  // Determine the best public shareable URL automatically
  const getDefaultPublicUrl = () => {
    if (typeof window === 'undefined') {
      return 'https://ais-pre-47umhda5spdrm4o5o5lk3y-276274164542.asia-east1.run.app';
    }
    const origin = window.location.origin;
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return 'https://ais-pre-47umhda5spdrm4o5o5lk3y-276274164542.asia-east1.run.app';
    }
    // Convert private dev preview URL to public shared URL
    return origin.replace('ais-dev-', 'ais-pre-');
  };

  const [targetUrl, setTargetUrl] = useState<string>(getDefaultPublicUrl());
  const [copied, setCopied] = useState<boolean>(false);
  const qrCanvasWrapperRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Copy failed', err);
    }
  };

  // Download high-resolution standalone QR Code PNG
  const handleDownloadQRImage = () => {
    const canvas = qrCanvasWrapperRef.current?.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'School_Canteen_Contest_QR.png';
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate & Download full printable Canteen Poster with QR Code
  const handleDownloadPoster = () => {
    const qrCanvas = qrCanvasWrapperRef.current?.querySelector('canvas');
    if (!qrCanvas) return;

    const posterCanvas = document.createElement('canvas');
    posterCanvas.width = 900;
    posterCanvas.height = 1250;
    const ctx = posterCanvas.getContext('2d');
    if (!ctx) return;

    // Background Yellow
    ctx.fillStyle = '#FBBF24';
    ctx.fillRect(0, 0, 900, 1250);

    // Outer Border
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 20;
    ctx.strokeRect(25, 25, 850, 1200);

    // Top Red Header Banner
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(60, 70, 780, 180);
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 10;
    ctx.strokeRect(60, 70, 780, 180);

    // Header Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 46px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍔 SCHOOL CANTEEN CONTEST 🎁', 450, 145);

    ctx.fillStyle = '#FDE047';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('VOTE IN 3 QUESTIONS & WIN A FREE COMBO!', 450, 205);

    // White QR Card Box
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(150, 300, 600, 640);
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 12;
    ctx.strokeRect(150, 300, 600, 640);

    // Scan Me Badge text
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 38px sans-serif';
    ctx.fillText('📱 SCAN QR CODE TO START', 450, 375);

    // Draw QR Code in the center
    ctx.drawImage(qrCanvas, 225, 410, 450, 450);

    // URL below QR
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('Open Camera or QR Scanner on Phone', 450, 905);

    // 3 Steps Footer
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 32px sans-serif';
    ctx.fillText('1. Enter Name & Class   •   2. Answer 3 Food Qs', 450, 1020);

    ctx.fillStyle = '#DC2626';
    ctx.font = '900 36px sans-serif';
    ctx.fillText('🏆 5 LUCKY WINNERS EVERY WEEK! 🏆', 450, 1085);

    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(`${canteenName} • WhatsApp: 0344-0910083`, 450, 1155);

    const dataUrl = posterCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'School_Canteen_QR_Poster.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share link via WhatsApp
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🍔 *School Canteen Food Choice & Lucky Draw Contest!* 🎁\n\n` +
      `Bacho! Neeche diye gaye link ko open karein, 3 asaan food questions ke jawab dein aur *Free Canteen Combo* jeetne wali Lucky Draw mein shamil ho jayein!\n\n` +
      `👉 *Click Here to Open Website:*\n${targetUrl}\n\n` +
      `🏆 *5 Lucky Winners Every Week!*`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-amber-300 rounded-3xl max-w-lg w-full border-4 border-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Bar */}
        <div className="bg-red-600 text-white p-4 sm:px-6 flex items-center justify-between border-b-4 border-slate-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-yellow-300 text-slate-900 border-2 border-slate-900 flex items-center justify-center font-bold shadow-xs">
              <QrCode className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h2 className="font-['Bungee',cursive] text-lg sm:text-xl text-white leading-tight">
                Website QR Code & Link
              </h2>
              <p className="text-xs text-yellow-200 font-bold">
                Scan to open School Canteen Contest directly!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-red-700 hover:bg-red-800 text-white flex items-center justify-center cursor-pointer border-2 border-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-center">
          
          {/* Printable QR Code Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-slate-900 shadow-xl mx-auto max-w-sm relative">
            <div className="inline-block px-3 py-1 rounded-full bg-red-600 text-white font-['Bungee',cursive] text-xs tracking-wider uppercase mb-2 border-2 border-slate-900">
              🍔 Scan & Win Free Food! 🎁
            </div>

            <h3 className="font-['Bungee',cursive] text-lg sm:text-xl text-slate-900 leading-snug mb-3">
              {canteenName}
            </h3>

            {/* QR Canvas Container */}
            <div
              ref={qrCanvasWrapperRef}
              className="p-4 bg-white rounded-2xl border-4 border-amber-400 inline-block shadow-inner mx-auto"
            >
              <QRCodeCanvas
                value={targetUrl}
                size={220}
                bgColor="#FFFFFF"
                fgColor="#0F172A"
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                📱 Scan with Mobile Camera or WhatsApp
              </p>
              <p className="text-[11px] font-bold text-slate-500">
                Answer 3 Food Questions • 5 Winners Every Week!
              </p>
              <p className="text-[11px] font-bold text-emerald-700">
                Data Receiving WhatsApp: 0344-0910083
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={handleDownloadPoster}
              className="py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-['Bungee',cursive] text-xs tracking-wide border-3 border-slate-900 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Download Full Poster</span>
            </button>

            <button
              onClick={handleDownloadQRImage}
              className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-yellow-300 font-['Bungee',cursive] text-xs tracking-wide border-3 border-slate-900 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <QrCode className="w-4 h-4 shrink-0" />
              <span>Download Only QR</span>
            </button>
          </div>

          {/* Share on WhatsApp */}
          <button
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-['Bungee',cursive] text-xs sm:text-sm tracking-wide border-3 border-slate-900 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Share Website Link on WhatsApp</span>
          </button>

          {/* Direct Shareable Link Box */}
          <div className="bg-white/90 rounded-2xl p-3.5 border-2 border-slate-900 text-left space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-extrabold uppercase text-slate-800">
                🌐 Public Website Link (For QR & Sharing):
              </label>
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <span>Test Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border-2 border-slate-300 text-xs font-mono text-slate-800 bg-slate-50 focus:outline-none focus:border-red-600"
              />
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs border-2 border-slate-900 flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              💡 <strong>Tip:</strong> Agar aap ne AI Studio mein upar <strong>"Share"</strong> ya <strong>"Deploy"</strong> button dabaya hai, to yeh QR code scan karne par har mobile par foran website khol dega!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
