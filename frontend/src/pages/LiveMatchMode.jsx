import { motion } from 'framer-motion';
import { Radio, Zap } from 'lucide-react';

export default function LiveMatchMode() {
  return (
    <div className="min-h-screen bg-stadium pt-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="badge-live w-fit mx-auto mb-6">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" /> Live Feed
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mb-4">
            Live <span className="text-neon-blue">Match Mode</span>
          </h1>
          <p className="text-slate-400 text-lg mb-12">
            Paste a Cricbuzz or ESPN Cricinfo URL and get real-time AI tactical analysis for the current match situation.
          </p>

          <div className="glass-card p-6 text-left mb-6">
            <div className="section-header mb-4"><Radio className="w-3 h-3" /> Import Live Match</div>
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="https://www.cricbuzz.com/live-cricket-scorecard/..."
                className="premium-input flex-1"
              />
              <button className="btn-ipl flex items-center gap-2 whitespace-nowrap">
                <Zap className="w-4 h-4" /> Analyze
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-3">Supported: Cricbuzz, ESPN Cricinfo, BCCI</p>
          </div>

          {/* Live scores ticker */}
          <div className="glass-card p-4 overflow-hidden">
            <div className="section-header mb-3">Today's Matches</div>
            <div className="space-y-3">
              {[
                { t1: 'CSK', s1: '185/4 (20)', t2: 'MI', s2: 'Chasing', status: 'IN PLAY' },
                { t1: 'RCB', s1: '223/3 (20)', t2: 'KKR', s2: '156/8 (18.4)', status: 'RESULT' },
                { t1: 'DC', s1: 'Yet to bat', t2: 'SRH', s2: 'Yet to bat', status: 'UPCOMING' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-navy-900/60 border border-white/5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-bold text-white">{m.t1}</span>
                      <span className="text-slate-500 font-mono text-xs">{m.s1}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm mt-1">
                      <span className="text-slate-400">{m.t2}</span>
                      <span className="text-slate-500 font-mono text-xs">{m.s2}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    m.status === 'IN PLAY' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    m.status === 'RESULT' ? 'bg-slate-800 text-slate-400' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>{m.status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
