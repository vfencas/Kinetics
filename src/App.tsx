import React, { useState } from 'react';
import { 
  Shield, 
  BookOpen, 
  ShoppingCart, 
  BarChart3, 
  Menu, 
  X, 
  ChevronRight,
  Factory,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

import { Assessment } from './components/Assessment';
import { Education } from './components/Education';
import { Marketplace } from './components/Marketplace';
import { Solution } from './types';

type View = 'home' | 'education' | 'assessment' | 'marketplace' | 'cart';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [cart, setCart] = useState<Solution[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (solution: Solution) => {
    setCart(prev => [...prev, solution]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const navItems = [
    { id: 'home', label: 'Overview', icon: Shield },
    { id: 'education', label: 'Learn', icon: BookOpen },
    { id: 'assessment', label: 'Assess', icon: BarChart3 },
    { id: 'marketplace', label: 'Solutions', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F4] text-[#1A1A1A] font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setCurrentView('home')}
            >
              <div className="bg-[#1A1A1A] p-1.5 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Kinetic Cybersecurity</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as View)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-emerald-600",
                    currentView === item.id ? "text-emerald-600" : "text-gray-500"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => setCurrentView('cart')}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setCurrentView('cart')} className="relative p-2">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-black/5 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id as View);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full p-3 rounded-xl text-left font-medium",
                      currentView === item.id ? "bg-emerald-50 text-emerald-600" : "text-gray-600"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'home' && <Home key="home" onStart={() => setCurrentView('education')} />}
          {currentView === 'education' && <Education key="education" onAssess={() => setCurrentView('assessment')} />}
          {currentView === 'assessment' && <Assessment key="assessment" onShop={() => setCurrentView('marketplace')} />}
          {currentView === 'marketplace' && <Marketplace key="marketplace" addToCart={addToCart} cart={cart} />}
          {currentView === 'cart' && (
            <Cart 
              key="cart" 
              items={cart} 
              onRemove={removeFromCart} 
              onContinue={() => setCurrentView('marketplace')} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-lg">Kinetic Cybersecurity</span>
          </div>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Empowering manufacturing businesses with the knowledge and tools to secure their operational technology.
          </p>
          <div className="mt-8 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2026 Kinetic Cybersecurity. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600">Terms of Service</a>
              <a href="#" className="hover:text-gray-600">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Home View ---

function Home({ onStart }: { onStart: () => void, key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="relative rounded-[2rem] overflow-hidden bg-[#1A1A1A] text-white p-8 md:p-16">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Lock className="w-3 h-3" />
            Secure Your Factory Floor
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
            Bridging the Gap Between <span className="text-emerald-500">IT & OT</span> Security.
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Protecting your business starts with a clear roadmap. We guide you from identifying vulnerabilities to deploying tailored solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onStart()}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 group"
            >
              Start Assessment
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-l from-[#1A1A1A] to-transparent z-10" />
          <img 
            src="https://picsum.photos/seed/factory/800/600" 
            alt="Factory" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* What is OT Section */}
      <section className="py-12 border-y border-black/5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">What is <span className="text-emerald-600">OT</span>?</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Operational Technology (OT) is the hardware and software that detects or causes a change, through the direct monitoring and/or control of industrial equipment, assets, processes, and events.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gray-50 border border-black/5 space-y-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold">Physical Control</h3>
                <p className="text-sm text-gray-500">Managing PLCs, HMIs, and SCADA systems that run your production lines.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-black/5 space-y-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold">Real-time Impact</h3>
                <p className="text-sm text-gray-500">Directly affecting physical processes where safety and uptime are the top priorities.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold">Why it matters for Manufacturing</h3>
              <p className="text-gray-400 leading-relaxed">
                In the world of IT, data is king. In the world of OT, <strong>Production is king</strong>. A single minute of downtime can cost thousands, and a security breach can lead to physical damage or safety hazards.
              </p>
              <ul className="space-y-4">
                {[
                  "Protection against ransomware targeting production lines",
                  "Ensuring worker safety through secure control systems",
                  "Maintaining 99.9% uptime for legacy industrial assets",
                  "Compliance with emerging NIS2 and IEC 62443 standards"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Our Three-Step Security Journey</h2>
          <p className="text-gray-500">We make OT security simple, transparent, and effective for manufacturing businesses.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-emerald-100 -translate-y-1/2 z-0" />
          
          {[
            {
              step: "01",
              icon: BarChart3,
              title: "Assessment",
              desc: "First, we identify your vulnerabilities. Our tool analyzes your network, legacy systems, and policies to understand your current risk profile."
            },
            {
              step: "02",
              icon: AlertTriangle,
              title: "Impact Analysis",
              desc: "After the assessment, we show you the potential impact of an attack. Understand the real-world consequences of your identified risks."
            },
            {
              step: "03",
              icon: ShoppingCart,
              title: "Tailored Solutions",
              desc: "Finally, we recommend the best-fit solutions. Compare alternatives with clear pros, cons, and transparent pricing to purchase on the spot."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="relative z-10 bg-white p-8 rounded-3xl border border-black/5 hover:shadow-xl transition-all flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 relative">
                <item.icon className="w-8 h-8 text-emerald-600" />
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <button 
            onClick={() => onStart()}
            className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3 group"
          >
            Start Your Free Assessment
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-emerald-50 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Why OT Security Matters?</h2>
          <p className="text-gray-600 mb-6">
            In 2025, over 60% of manufacturing businesses experienced a cyber-related downtime. Legacy systems are often the weakest link. We help you identify these gaps before they become outages.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Real-time Monitoring
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Legacy Protection
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Compliance Ready
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Expert Support
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-lg border border-emerald-100">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-sm uppercase tracking-wider text-amber-700">Risk Alert</span>
          </div>
          <div className="space-y-4">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[85%]" />
            </div>
            <p className="text-xs text-gray-500">
              85% of industrial controllers are currently exposed to known vulnerabilities.
            </p>
            <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors">
              Read Case Study
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// --- Cart View ---

function Cart({ items, onRemove, onContinue }: { items: Solution[], onRemove: (id: string) => void, onContinue: () => void, key?: string }) {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Browse our marketplace to find the right security solutions for your business.</p>
        <button 
          onClick={onContinue}
          className="px-8 py-3 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
        >
          Explore Marketplace
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8">Your Selected Solutions</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl border border-black/5 flex gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.provider}</p>
                  </div>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-emerald-600 font-bold">${item.price.toLocaleString()}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600 uppercase font-bold tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-black/5 h-fit sticky top-24">
          <h3 className="font-bold text-xl mb-6">Order Summary</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Implementation Fee</span>
              <span>$0.00</span>
            </div>
            <div className="pt-4 border-t border-black/5 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-emerald-600">${total.toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all mb-4">
            Complete Purchase
          </button>
          <button 
            onClick={onContinue}
            className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </motion.div>
  );
}
