import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Star, 
  ShieldCheck, 
  Plus, 
  Check, 
  Info, 
  ExternalLink, 
  Tag,
  ShoppingCart,
  X,
  AlertCircle
} from 'lucide-react';
import { SOLUTIONS } from '../constants';
import { Solution } from '../types';

export function Marketplace({ addToCart, cart }: { addToCart: (s: Solution) => void, cart: Solution[], key?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const categories = ['All', 'Network', 'Endpoint', 'Monitoring', 'Access Control'];

  const filteredSolutions = SOLUTIONS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const isInCart = (id: string) => cart.some(item => item.id === id);

  return (
    <div className="space-y-8">
      {/* Step 3: Tailored Solutions Header */}
      <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-emerald-900">Step 3: Tailored Solutions</h3>
          <p className="text-emerald-700 text-sm">Based on your assessment, here are the best-fit solutions for your manufacturing environment.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Solutions Marketplace</h2>
          <p className="text-gray-500">Discover and deploy industrial-grade security tools.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full sm:w-64"
            />
          </div>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  activeCategory === cat ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSolutions.map((solution) => (
          <motion.div
            key={solution.id}
            layoutId={solution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-black/5 overflow-hidden group hover:shadow-xl transition-all flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={solution.image} 
                alt={solution.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-700">
                  {solution.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg group-hover:text-emerald-600 transition-colors">{solution.name}</h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold">{solution.rating}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium mb-4">{solution.provider}</p>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1">
                {solution.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
                <span className="text-xl font-bold text-[#1A1A1A]">${solution.price.toLocaleString()}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedSolution(solution)}
                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => addToCart(solution)}
                    disabled={isInCart(solution.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all",
                      isInCart(solution.id) 
                        ? "bg-emerald-50 text-emerald-600 cursor-default" 
                        : "bg-emerald-600 text-white hover:bg-emerald-500"
                    )}
                  >
                    {isInCart(solution.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Solution Detail Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSolution(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedSolution(null)}
                className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white z-10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="h-64 relative">
                <img 
                  src={selectedSolution.image} 
                  alt={selectedSolution.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {selectedSolution.category}
                    </span>
                    <span className="text-white/60 text-xs font-medium">{selectedSolution.provider}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">{selectedSolution.name}</h3>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Pros</h4>
                    <ul className="space-y-3">
                      {selectedSolution.pros.map((p, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                          <Check className="w-4 h-4 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Cons</h4>
                    <ul className="space-y-3">
                      {selectedSolution.cons.map((c, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-amber-700 bg-amber-50 p-2 rounded-lg">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {selectedSolution.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Risk Mitigation</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSolution.riskMitigation.map((r, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-50 text-gray-500 text-xs font-medium rounded-lg border border-black/5">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-black/5 flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">One-time License</span>
                    <span className="text-3xl font-bold">${selectedSolution.price.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(selectedSolution);
                      setSelectedSolution(null);
                    }}
                    disabled={isInCart(selectedSolution.id)}
                    className={cn(
                      "px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2",
                      isInCart(selectedSolution.id)
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-emerald-600 text-white hover:bg-emerald-500"
                    )}
                  >
                    {isInCart(selectedSolution.id) ? (
                      <>
                        <Check className="w-5 h-5" />
                        In Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
