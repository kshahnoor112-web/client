import { ArrowRight, ArrowLeft, Tag, Check, Sparkles } from 'lucide-react';
import { PRICE_OPTIONS } from '../data/canteenData';

interface QuestionTwoPriceProps {
  selectedFood: string;
  selectedPrice: string;
  onSelectPrice: (priceLabel: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionTwoPrice({
  selectedFood,
  selectedPrice,
  onSelectPrice,
  onNext,
  onBack
}: QuestionTwoPriceProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      
      {/* Header Card matching Flyer #2 Yellow Tag */}
      <div className="bg-amber-400 rounded-3xl p-6 sm:p-7 border-4 border-slate-900 shadow-xl text-slate-900 mb-6 relative overflow-hidden">
        
        {/* Step pill */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 rounded-full bg-slate-900 text-yellow-300 font-black text-xs uppercase tracking-wider shadow-xs">
            Question 2 of 3
          </span>
          <span className="text-xs font-bold text-amber-950 px-2.5 py-0.5 rounded-full bg-amber-200">
            Choice: {selectedFood}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-['Bungee',cursive] tracking-tight leading-tight">
          What is your ideal student price? 🏷️
        </h2>
        <p className="mt-1 text-xs sm:text-sm font-medium text-amber-950 font-['Fredoka',sans-serif]">
          How much should this canteen item cost for your pocket money?
        </p>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-amber-600/40 rounded-full h-2.5 overflow-hidden border border-amber-500">
          <div className="bg-red-600 h-2.5 rounded-full w-2/3 transition-all duration-300"></div>
        </div>
      </div>

      {/* Price Option Cards */}
      <div className="space-y-3 mb-6">
        {PRICE_OPTIONS.map((opt) => {
          const isSelected = selectedPrice === opt.label;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectPrice(opt.label)}
              className={`rounded-2xl p-4 sm:p-5 border-3 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isSelected
                  ? 'border-slate-900 bg-yellow-300 shadow-lg scale-102 ring-4 ring-yellow-400/50'
                  : 'border-slate-300 bg-white hover:border-amber-500 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-slate-900 flex items-center justify-center text-xl shrink-0 shadow-xs">
                  🏷️
                </div>
                <div>
                  <h3 className="font-['Bungee',cursive] text-lg sm:text-xl text-slate-900 leading-tight">
                    {opt.label}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">
                    {opt.sublabel}
                  </p>
                </div>
              </div>

              {/* Radio Indicator */}
              <div className="shrink-0">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-slate-100'
                }`}>
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tip Banner */}
      <div className="bg-white rounded-2xl p-4 border-2 border-slate-300 mb-6 text-xs text-slate-600 font-medium flex items-center gap-2 shadow-2xs">
        <span className="text-lg">💡</span>
        <span>Canteen administration will set the official canteen price based on the most voted range!</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border-2 border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onNext}
          disabled={!selectedPrice}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-['Bungee',cursive] text-sm tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-red-800"
        >
          <span>Next: Question 3 (Combos)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
