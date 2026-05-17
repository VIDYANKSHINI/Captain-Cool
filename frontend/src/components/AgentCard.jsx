import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Thermometer, AlertTriangle, Mic } from 'lucide-react';

const agentConfig = {
  analyst:    { color: 'text-indigo-400', borderClass: 'border-indigo-500', bg: 'bg-indigo-500/5', icon: <LineChart className="w-4 h-4" /> },
  pitch:      { color: 'text-emerald-400', borderClass: 'border-emerald-500', bg: 'bg-emerald-500/5', icon: <Thermometer className="w-4 h-4" /> },
  devil:      { color: 'text-red-400', borderClass: 'border-red-500', bg: 'bg-red-500/5', icon: <AlertTriangle className="w-4 h-4" /> },
  commentator:{ color: 'text-amber-400', borderClass: 'border-amber-500', bg: 'bg-amber-500/5', icon: <Mic className="w-4 h-4" /> },
};

const AgentCard = ({ agent, text, role, delay = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const cfg = agentConfig[role] || { color: 'text-slate-300', borderClass: 'border-slate-600', bg: 'bg-white/5', icon: null };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-2xl border-l-4 ${cfg.borderClass} ${cfg.bg} backdrop-blur-sm overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-white/5 transition-colors"
      >
        <div className={`${cfg.color} shrink-0`}>{cfg.icon}</div>
        <span className={`font-semibold text-sm uppercase tracking-wide ${cfg.color}`}>{agent}</span>
        <div className="ml-auto">
          <span className={`text-slate-500 text-lg leading-none transition-transform inline-block ${expanded ? 'rotate-90' : ''}`}>›</span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-slate-300 text-sm leading-relaxed">
              {text.split('\n').filter(Boolean).map((line, i) => (
                <p key={i} className="mb-2 last:mb-0">{line}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AgentCard;
