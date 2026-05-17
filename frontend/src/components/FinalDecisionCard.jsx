import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Percent } from 'lucide-react';

export default function FinalDecisionCard({ agent, text, confidence }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="relative mt-2 glow-border rounded-2xl"
    >
      {/* Glowing bg layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-indigo-500/5 to-emerald-500/5 rounded-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-navy-900/90 backdrop-blur-2xl rounded-2xl" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Final Decision</div>
              <h3 className="font-display font-black text-xl text-white leading-tight">{agent}</h3>
            </div>
          </div>

          {confidence && (
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Confidence</span>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <Percent className="w-3 h-3 text-emerald-400" />
                <span className="text-xl font-black font-mono text-emerald-400">{confidence}</span>
              </div>
            </div>
          )}
        </div>

        {/* Confidence Bar */}
        {confidence && (
          <div className="mb-5">
            <div className="progress-neon">
              <motion.div
                className="progress-neon-fill"
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Decision text */}
        <div className="text-slate-200 text-base md:text-lg font-medium leading-relaxed border-l-2 border-neon-blue/40 pl-4">
          {text.split('\n').filter(Boolean).map((line, i) => (
            <p key={i} className="mb-3 last:mb-0">{line}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
