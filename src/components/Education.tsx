import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Shield, 
  Zap, 
  Lock, 
  Eye, 
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';

export function Education({ onAssess }: { onAssess: () => void, key?: string }) {
  const [activeTab, setActiveTab] = useState<'basics' | 'threats' | 'demos'>('basics');

  const content = {
    basics: {
      title: "Understanding OT Security",
      desc: "Operational Technology (OT) is the hardware and software that detects or causes a change, through the direct monitoring and/or control of industrial equipment, assets, processes and events.",
      items: [
        { title: "IT vs OT", text: "IT prioritizes Confidentiality. OT prioritizes Availability and Safety." },
        { title: "Legacy Systems", text: "Many industrial machines run on protocols designed decades ago without security in mind." },
        { title: "Convergence", text: "Connecting factories to the internet increases efficiency but opens new attack vectors." }
      ]
    },
    threats: {
      title: "Common Industrial Threats",
      desc: "Industrial control systems (ICS) are targeted for sabotage, intellectual property theft, and ransomware.",
      items: [
        { title: "PLC Hijacking", text: "Attackers can modify logic on controllers to cause physical damage or production errors." },
        { title: "Network Sniffing", text: "Unencrypted industrial protocols (Modbus, S7) allow attackers to read process data." },
        { title: "Ransomware", text: "Locking engineering workstations can halt an entire production line for weeks." }
      ]
    },
    demos: {
      title: "Interactive Demos",
      desc: "See how an attack unfolds and how our solutions mitigate the risk.",
      items: [
        { title: "The Man-in-the-Middle", text: "Watch how a fake command can stop a turbine remotely." },
        { title: "The Rogue USB", text: "See how an infected drive can bypass air-gaps." },
        { title: "The Shadow OT", text: "Discover how unauthorized devices appear on your network." }
      ]
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Educational Platform</h2>
        <p className="text-gray-500 text-lg">
          Master the fundamentals of industrial cybersecurity through curated content and interactive simulations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 p-1 bg-gray-100 rounded-2xl w-fit mx-auto">
        {(['basics', 'threats', 'demos'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all capitalize",
              activeTab === tab ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">{content[activeTab].title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {content[activeTab].desc}
              </p>
            </div>
            
            <div className="space-y-4">
              {content[activeTab].items.map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-black/5 hover:border-emerald-200 transition-colors">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    {activeTab === 'basics' && <Shield className="w-5 h-5 text-emerald-600" />}
                    {activeTab === 'threats' && <Zap className="w-5 h-5 text-emerald-600" />}
                    {activeTab === 'demos' && <Play className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-video bg-[#1A1A1A] rounded-[2.5rem] overflow-hidden group shadow-2xl">
            <img 
              src={`https://picsum.photos/seed/${activeTab}/800/600`} 
              alt="Demo" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Interactive Demo</span>
                </div>
                <span className="text-white/60 text-xs">04:20</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CTA Section */}
      <section className="bg-white rounded-[2.5rem] p-12 border border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold mb-3">Ready to check your own systems?</h3>
          <p className="text-gray-500">
            Apply what you've learned. Our assessment tool will help you map these concepts to your actual factory floor operations.
          </p>
        </div>
        <button 
          onClick={onAssess}
          className="px-8 py-4 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shrink-0"
        >
          Take Assessment
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
