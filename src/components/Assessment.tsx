import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  ChevronRight, 
  ChevronLeft, 
  ShieldAlert, 
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { ASSESSMENT_QUESTIONS } from '../constants';
import { AssessmentResult } from '../types';

export function Assessment({ onShop }: { onShop: () => void, key?: string }) {
  const [step, setStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleAnswer = (score: number) => {
    const questionId = ASSESSMENT_QUESTIONS[currentQuestionIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    
    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const calculateResults = (): AssessmentResult[] => {
    const categories = Array.from(new Set(ASSESSMENT_QUESTIONS.map(q => q.category)));
    return categories.map(cat => {
      const catQuestions = ASSESSMENT_QUESTIONS.filter(q => q.category === cat);
      const score = catQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      const maxScore = catQuestions.length * 10;
      
      const vulnerabilities = [];
      if (score < maxScore * 0.5) {
        vulnerabilities.push(`Critical lack of ${cat.toLowerCase()} controls.`);
      }

      return { category: cat, score, maxScore, vulnerabilities };
    });
  };

  const results = calculateResults();
  const chartData = results.map(r => ({
    subject: r.category,
    A: (r.score / r.maxScore) * 100,
    fullMark: 100,
  }));

  const overallScore = Math.round(
    (results.reduce((acc, r) => acc + r.score, 0) / 
    results.reduce((acc, r) => acc + r.maxScore, 0)) * 100
  );

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-black/5 text-center"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <BarChart3 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-4xl font-bold mb-6">OT Risk Assessment Tool</h2>
            <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
              Identify your manufacturing vulnerabilities in 3 minutes. Our assessment covers Inventory & Scale, Legacy OS Debt, and Network Architecture.
            </p>
            <button
              onClick={() => setStep('questions')}
              className="px-10 py-5 bg-[#1A1A1A] text-white rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 mx-auto"
            >
              Start Assessment
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/5"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Question {currentQuestionIndex + 1} of {ASSESSMENT_QUESTIONS.length}
              </span>
              <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500" 
                  style={{ width: `${((currentQuestionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-10 leading-tight">
              {ASSESSMENT_QUESTIONS[currentQuestionIndex].text}
            </h3>

            {ASSESSMENT_QUESTIONS[currentQuestionIndex].riskInfo && (
              <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 italic">
                  <span className="font-bold not-italic">Risk:</span> {ASSESSMENT_QUESTIONS[currentQuestionIndex].riskInfo}
                </p>
              </div>
            )}

            <div className="grid gap-4">
              {ASSESSMENT_QUESTIONS[currentQuestionIndex].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.score)}
                  className="group flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left"
                >
                  <span className="font-medium text-gray-700 group-hover:text-emerald-700">{option.text}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-emerald-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>

            {currentQuestionIndex > 0 && (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="mt-8 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Question
              </button>
            )}
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Step 2: Impact Analysis Header */}
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900">Step 2: Impact Analysis</h3>
                <p className="text-amber-700 text-sm">We've analyzed your vulnerabilities. Here is the potential impact on your business operations.</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/5">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                    Assessment Complete
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Your Security Score</h2>
                  <div className="flex items-baseline gap-2 mb-6 justify-center md:justify-start">
                    <span className={cn(
                      "text-7xl font-bold",
                      overallScore > 70 ? "text-emerald-600" : overallScore > 40 ? "text-amber-500" : "text-red-500"
                    )}>
                      {overallScore}
                    </span>
                    <span className="text-2xl text-gray-400 font-medium">/ 100</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed">
                    {overallScore > 70 
                      ? "Great job! Your OT environment has solid foundations, but there's always room for optimization." 
                      : overallScore > 40 
                        ? "Moderate risk detected. Several critical areas require immediate attention to prevent operational downtime."
                        : "High risk environment. Your systems are highly vulnerable to common industrial cyber threats."}
                  </p>
                </div>
                
                <div className="w-full md:w-[350px] h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-black/5">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  Key Vulnerabilities
                </h3>
                <div className="space-y-4">
                  {results.filter(r => r.score < r.maxScore * 0.7).map((res, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-red-50 border border-red-100">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-red-900 text-sm">{res.category} Weakness</p>
                        <p className="text-red-700 text-xs mt-1">Score: {Math.round((res.score/res.maxScore)*100)}% - Immediate action recommended.</p>
                      </div>
                    </div>
                  ))}
                  {results.every(r => r.score >= r.maxScore * 0.7) && (
                    <div className="flex gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-emerald-700 text-sm font-medium">No critical vulnerabilities found in the assessed categories.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#1A1A1A] rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Recommended Actions</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <p className="text-sm text-gray-300">Implement Network Segmentation to isolate critical PLCs from the corporate network.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <p className="text-sm text-gray-300">Deploy Zero Trust remote access for all external vendor maintenance sessions.</p>
                  </div>
                  <button 
                    onClick={onShop}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
                  >
                    View Matching Solutions
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
