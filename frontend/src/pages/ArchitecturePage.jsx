import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const flow = [
  { icon: '👤', label: 'User Input', desc: 'Match state via form or live URL', color: 'border-slate-600' },
  { icon: '☁️', label: 'Open-Meteo API', desc: 'Real weather data for dew factor', color: 'border-neon-blue' },
  { icon: '📊', label: 'Stats Agent', desc: 'Historical matchups & analytics', color: 'border-indigo-500' },
  { icon: '🌿', label: 'Pitch Agent', desc: 'Venue conditions & swing/spin', color: 'border-emerald-500' },
  { icon: '⚡', label: "Devil's Advocate", desc: 'Risk challenge & counter-arguments', color: 'border-red-500' },
  { icon: '🏆', label: 'Captain Strategist', desc: 'Final decision + confidence score', color: 'border-neon-blue' },
  { icon: '🎙️', label: 'Commentator', desc: 'IPL-style fan-friendly summary', color: 'border-amber-500' },
];

const techStack = [
  { label: 'AI Model', value: 'Gemini 2.5 Flash', color: 'text-neon-blue' },
  { label: 'Weather API', value: 'Open-Meteo (Real-time)', color: 'text-emerald-400' },
  { label: 'Backend', value: 'Node.js + Express', color: 'text-slate-300' },
  { label: 'Frontend', value: 'React + Vite + Tailwind', color: 'text-slate-300' },
  { label: 'Animations', value: 'Framer Motion', color: 'text-purple-400' },
  { label: 'Agent Pattern', value: 'Sequential Orchestration', color: 'text-ipl-orange' },
];

export default function ArchitecturePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-stadium pt-24 px-4 pb-16">
      <div className="max-w-screen-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-14">
            <div className="section-header justify-center mb-3">
              <span className="text-neon-blue">Architecture</span>
            </div>
            <h1 className="font-display font-black text-5xl text-white mb-4">
              How <span className="text-neon-blue">It Works</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">A full end-to-end walk through of the multi-agent orchestration pipeline</p>
          </div>

          {/* Flow Diagram */}
          <div className="glass-card p-8 mb-8">
            <div className="section-header mb-8">Agent Orchestration Flow</div>
            <div className="flex flex-col gap-4">
              {flow.map((step, i) => (
                <div key={step.label}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className={`flex items-start gap-4 p-4 rounded-xl border ${step.color} bg-navy-900/50`}
                  >
                    <div className="text-2xl shrink-0">{step.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-white text-sm">{step.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{step.desc}</div>
                    </div>
                    <div className="text-slate-600 text-xs font-mono self-center">Step {i + 1}</div>
                  </motion.div>
                  {i < flow.length - 1 && (
                    <div className="flex items-center justify-center py-1">
                      <div className="w-0.5 h-4 bg-gradient-to-b from-neon-blue/50 to-neon-blue/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="glass-card p-8 mb-8">
            <div className="section-header mb-6">Tech Stack</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {techStack.map(({ label, value, color }) => (
                <div key={label} className="bg-navy-900/60 rounded-xl p-4 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                  <div className={`font-bold text-sm ${color}`}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
              className="btn-primary inline-flex items-center gap-2 px-10 py-4 w-auto"
            >
              Try It Now <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
