import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles, Plus } from 'lucide-react';
import { FOOD_OPTIONS } from '../data/canteenData';
import { FoodOption } from '../types/canteen';

interface QuestionOneFoodProps {
  studentName: string;
  selectedFood: string;
  onSelectFood: (foodName: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionOneFood({
  studentName,
  selectedFood,
  onSelectFood,
  onNext,
  onBack
}: QuestionOneFoodProps) {
  const [customInput, setCustomInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const handlePickPredefined = (food: FoodOption) => {
    setIsCustomMode(false);
    onSelectFood(food.name);
  };

  const handleCustomSubmit = () => {
    if (customInput.trim()) {
      onSelectFood(customInput.trim());
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      
      {/* Question Header Card */}
      <div className="bg-pink-500 rounded-3xl p-6 sm:p-7 border-4 border-slate-900 shadow-xl text-white mb-6 relative overflow-hidden">
        
        {/* Step pill */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 rounded-full bg-white text-pink-700 font-black text-xs uppercase tracking-wider shadow-xs">
            Question 1 of 3
          </span>
          <span className="text-xs font-bold text-pink-100">
            Hey, {studentName}! 👋
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-['Bungee',cursive] tracking-tight leading-tight">
          Which food item do you want on our canteen menu? 🍔
        </h2>
        <p className="mt-1 text-xs sm:text-sm font-medium text-pink-100 font-['Fredoka',sans-serif]">
          Tap your favorite food item below!
        </p>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-pink-700/60 rounded-full h-2.5 overflow-hidden border border-pink-400">
          <div className="bg-yellow-300 h-2.5 rounded-full w-1/3 transition-all duration-300"></div>
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {FOOD_OPTIONS.map((food) => {
          const isSelected = selectedFood === food.name;
          return (
            <div
              key={food.id}
              onClick={() => handlePickPredefined(food)}
              className={`rounded-2xl p-4 border-3 transition-all cursor-pointer flex items-center gap-3.5 relative overflow-hidden group ${
                isSelected
                  ? 'border-slate-900 bg-amber-300 shadow-lg scale-102 ring-4 ring-amber-400/50'
                  : 'border-slate-300 bg-white hover:border-pink-500 hover:shadow-md'
              }`}
            >
              {/* Food Image */}
              <div className="relative shrink-0">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-slate-900 shadow-xs group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1.5 -right-1.5 text-xl">
                  {food.emoji}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                {food.badge && (
                  <span className="inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white mb-1 shadow-2xs">
                    {food.badge}
                  </span>
                )}
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                  {food.name}
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 mt-0.5 font-medium">
                  {food.description}
                </p>
              </div>

              {/* Selected radio check */}
              <div className="shrink-0">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-slate-100'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Or Custom Suggestion Option */}
      <div className="bg-white rounded-2xl p-4 border-2 border-slate-300 mb-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700">
          <span>✨</span>
          <span>Don't see what you want? Suggest your own food item:</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type any other snack, e.g. Hot Samosa Chaat / Donuts / Frappe"
            className="flex-1 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-pink-500"
          />
          <button
            type="button"
            onClick={handleCustomSubmit}
            disabled={!customInput.trim()}
            className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <span>Choose</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
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
          disabled={!selectedFood}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-['Bungee',cursive] text-sm tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-red-800"
        >
          <span>Next: Question 2 (Price)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
