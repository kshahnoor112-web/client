import { ArrowLeft, Check, Gift, Sparkles } from 'lucide-react';
import { COMBO_OPTIONS } from '../data/canteenData';

interface QuestionThreeComboProps {
  selectedCombo: string;
  onSelectCombo: (comboTitle: string) => void;
  onSubmitAll: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function QuestionThreeCombo({
  selectedCombo,
  onSelectCombo,
  onSubmitAll,
  onBack,
  isSubmitting
}: QuestionThreeComboProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      
      {/* Header Card matching Flyer #3 Green Tag */}
      <div className="bg-emerald-500 rounded-3xl p-6 sm:p-7 border-4 border-slate-900 shadow-xl text-white mb-6 relative overflow-hidden">
        
        {/* Step pill */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 rounded-full bg-white text-emerald-800 font-black text-xs uppercase tracking-wider shadow-xs">
            Final Question 3 of 3
          </span>
          <span className="text-xs font-bold text-emerald-100 flex items-center gap-1">
            <Gift className="w-3.5 h-3.5 text-yellow-300" />
            <span>Prize Eligible!</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-['Bungee',cursive] tracking-tight leading-tight">
          Which is your favorite from these 3 combos? 🍟🥤
        </h2>
        <p className="mt-1 text-xs sm:text-sm font-medium text-emerald-100 font-['Fredoka',sans-serif]">
          Pick the deal that you would love to order every day during recess/break!
        </p>

        {/* Progress Bar - Complete */}
        <div className="mt-4 w-full bg-emerald-700/60 rounded-full h-2.5 overflow-hidden border border-emerald-400">
          <div className="bg-yellow-300 h-2.5 rounded-full w-full transition-all duration-300"></div>
        </div>
      </div>

      {/* 3 Combo Cards */}
      <div className="space-y-4 mb-6">
        {COMBO_OPTIONS.map((combo) => {
          const isSelected = selectedCombo === combo.title;
          return (
            <div
              key={combo.id}
              onClick={() => onSelectCombo(combo.title)}
              className={`rounded-3xl p-4 sm:p-5 border-3 transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-slate-900 bg-amber-300 shadow-xl scale-102 ring-4 ring-amber-400/50'
                  : 'border-slate-300 bg-white hover:border-emerald-500 hover:shadow-md'
              }`}
            >
              {combo.popular && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-bl-xl shadow-xs">
                  🔥 Highly Recommended
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                
                {/* Photo */}
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-full sm:w-28 h-32 sm:h-28 rounded-2xl object-cover border-2 border-slate-900 shadow-xs shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Bungee',cursive] text-base sm:text-lg text-slate-900 leading-snug">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    {combo.tagline}
                  </p>

                  {/* Items bullet chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {combo.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Selection Checkbox */}
                <div className="shrink-0 self-end sm:self-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-slate-100'
                  }`}>
                    {isSelected && <Check className="w-5 h-5 stroke-[3]" />}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border-2 border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          onClick={onSubmitAll}
          disabled={!selectedCombo || isSubmitting}
          className="flex-1 py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-['Bungee',cursive] text-sm sm:text-base tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-red-900 transform active:scale-98 animate-pulse hover:animate-none"
        >
          <Gift className="w-5 h-5 text-yellow-300" />
          <span>{isSubmitting ? 'Registering Your Entry...' : 'Submit & Enter Lucky Draw! 🎁'}</span>
        </button>
      </div>

    </div>
  );
}
