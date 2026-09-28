/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  StudentRegistration, 
  StudentSubmission, 
  CanteenConfig 
} from './types/canteen';
import { CANTEEN_DEFAULT_CONFIG } from './data/canteenData';
import { CanteenHeader } from './components/CanteenHeader';
import { RegistrationForm } from './components/RegistrationForm';
import { QuestionOneFood } from './components/QuestionOneFood';
import { QuestionTwoPrice } from './components/QuestionTwoPrice';
import { QuestionThreeCombo } from './components/QuestionThreeCombo';
import { SuccessScreen } from './components/SuccessScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { QRCodeModal } from './components/QRCodeModal';

export default function App() {
  const [step, setStep] = useState<number>(0);
  const [student, setStudent] = useState<StudentRegistration>({
    name: '',
    studentClass: 'Class 9 (Matric)',
    phone: ''
  });
  const [selectedFood, setSelectedFood] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');
  const [selectedCombo, setSelectedCombo] = useState<string>('');
  const [currentSubmission, setCurrentSubmission] = useState<StudentSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);

  // Configuration
  const [config, setConfig] = useState<CanteenConfig>(() => {
    try {
      const saved = localStorage.getItem('canteen_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.managerWhatsApp === '923001234567' ||
          parsed.managerWhatsApp === '923355824277' ||
          parsed.managerWhatsApp === '03355824277'
        ) {
          parsed.managerWhatsApp = '923440910083';
        }
        return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return CANTEEN_DEFAULT_CONFIG;
  });

  // Submissions list
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('canteen_submissions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    // Pre-populate with initial entries so dashboard is lively
    return [
      {
        id: 'sub-1',
        tokenNumber: '#CANT-4091',
        name: 'Hamza Tariq',
        studentClass: 'Class 10 (Matric)',
        phone: '03014567890',
        wantedFoodItem: 'Crispy Zinger Burger',
        idealPrice: 'Rs. 200 – 250',
        favoriteCombo: 'Combo #1: The Classic Zinger Deal',
        timestamp: 'Sep 23, 2026, 11:15 AM'
      },
      {
        id: 'sub-2',
        tokenNumber: '#CANT-4092',
        name: 'Ayesha Noor',
        studentClass: 'Class 9 (O-Levels)',
        phone: '03219876543',
        wantedFoodItem: 'Loaded Cheesy Fries',
        idealPrice: 'Rs. 150 – 200',
        favoriteCombo: 'Combo #3: Shawarma & Loaded Fries Deal',
        timestamp: 'Sep 23, 2026, 11:22 AM'
      },
      {
        id: 'sub-3',
        tokenNumber: '#CANT-4093',
        name: 'Zayan Khan',
        studentClass: 'Class 8-B',
        phone: '03335551234',
        wantedFoodItem: 'Cheesy Pizza Slice',
        idealPrice: 'Rs. 200 – 250',
        favoriteCombo: 'Combo #2: Pizza & Garlic Crunch Deal',
        timestamp: 'Sep 23, 2026, 11:30 AM'
      }
    ];
  });

  // Persist submissions
  useEffect(() => {
    try {
      localStorage.setItem('canteen_submissions', JSON.stringify(submissions));
    } catch (e) {
      console.warn(e);
    }
  }, [submissions]);

  // Persist config
  useEffect(() => {
    try {
      localStorage.setItem('canteen_config', JSON.stringify(config));
    } catch (e) {
      console.warn(e);
    }
  }, [config]);

  // Step 0: Handle Start Challenge
  const handleStartChallenge = (data: StudentRegistration) => {
    setStudent(data);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3 -> 4: Submit all answers
  const handleSubmitAll = () => {
    setIsSubmitting(true);

    const tokenRandom = Math.floor(1000 + Math.random() * 9000);
    const newSubmission: StudentSubmission = {
      id: `sub-${Date.now()}`,
      tokenNumber: `#CANT-${tokenRandom}`,
      name: student.name,
      studentClass: student.studentClass,
      phone: student.phone,
      wantedFoodItem: selectedFood || 'Crispy Zinger Burger',
      idealPrice: selectedPrice || 'Rs. 200 – 250',
      favoriteCombo: selectedCombo || 'Combo #1: The Classic Zinger Deal',
      timestamp: new Date().toLocaleString([], { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setTimeout(() => {
      setSubmissions(prev => [newSubmission, ...prev]);
      setCurrentSubmission(newSubmission);
      setIsSubmitting(false);
      setStep(4); // Success screen (no test score/results shown!)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // Step 4: Logout / Reset for next student
  const handleLogoutAndReset = () => {
    setStep(0);
    setStudent({
      name: '',
      studentClass: 'Class 9 (Matric)',
      phone: ''
    });
    setSelectedFood('');
    setSelectedPrice('');
    setSelectedCombo('');
    setCurrentSubmission(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const handleClearAll = () => {
    setSubmissions([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-slate-900 font-['Fredoka',sans-serif]">
      
      {/* Canteen Top Navigation Header */}
      <CanteenHeader
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenQRCode={() => setQrModalOpen(true)}
        submissionsCount={submissions.length}
      />

      {/* Main Interactive Flow */}
      <main className="flex-1 py-4">
        {step === 0 && (
          <RegistrationForm
            onStartChallenge={handleStartChallenge}
            onOpenQRCode={() => setQrModalOpen(true)}
          />
        )}

        {step === 1 && (
          <QuestionOneFood
            studentName={student.name}
            selectedFood={selectedFood}
            onSelectFood={(f) => setSelectedFood(f)}
            onNext={() => {
              if (selectedFood) {
                setStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onBack={() => setStep(0)}
          />
        )}

        {step === 2 && (
          <QuestionTwoPrice
            selectedFood={selectedFood}
            selectedPrice={selectedPrice}
            onSelectPrice={(p) => setSelectedPrice(p)}
            onNext={() => {
              if (selectedPrice) {
                setStep(3);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <QuestionThreeCombo
            selectedCombo={selectedCombo}
            onSelectCombo={(c) => setSelectedCombo(c)}
            onSubmitAll={handleSubmitAll}
            onBack={() => setStep(2)}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 4 && currentSubmission && (
          <SuccessScreen
            submission={currentSubmission}
            managerWhatsApp={config.managerWhatsApp}
            onLogoutAndReset={handleLogoutAndReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-amber-200 bg-amber-100/50">
        <p className="font-bold text-slate-700">
          🍔 School Canteen Lucky Draw Contest • 5 Lucky Winners Every Week! 🎁
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5">
          Scan QR Code • Vote in 3 Questions • Get Free Food Combo
        </p>
      </footer>

      {/* Canteen Staff / Admin Portal Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        submissions={submissions}
        onDeleteSubmission={handleDeleteSubmission}
        onClearAll={handleClearAll}
        config={config}
        onUpdateConfig={(newConf) => setConfig(newConf)}
      />

      {/* QR Code & Poster Modal */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        canteenName={config.canteenName}
        managerWhatsApp={config.managerWhatsApp}
      />

    </div>
  );
}
