import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Droplets, ThermometerSun, Radio, Wind, Play, AlertCircle } from 'lucide-react';
import MatchInputForm from '../components/MatchInputForm';
import AgentCard from '../components/AgentCard';
import FinalDecisionCard from '../components/FinalDecisionCard';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [debateData, setDebateData] = useState(null);
  const [error, setError] = useState('');

  const runDebate = async (formData) => {
    setIsLoading(true);
    setError('');
    setDebateData(null);
    try {
      const response = await axios.post('http://localhost:5000/api/debate', formData);
      setDebateData(response.data);
    } catch (err) {
      console.error(err);
      setError('Unable to connect to Strategy Core. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stadium pt-16">
      <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-64px)] gap-6">
        
        {/* Page Header */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-display font-black text-3xl text-white">Strategy <span className="text-neon-blue">Room</span></h1>
            <p className="text-sm text-slate-400 mt-1">Configure the match state and let 5 Gemini agents debate the best move</p>
          </div>
          <span className="badge-online hidden sm:flex">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> 5-Agent Mesh Online
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          
          {/* ── LEFT: Match Input ─────────────────────────────────────────── */}
          <div className="lg:w-[400px] flex flex-col gap-4 overflow-y-auto shrink-0">
            
            <div className="glass-card p-6 card-accent-blue">
              <div className="section-header mb-5">Match Parameters</div>
              <MatchInputForm onSubmit={runDebate} isLoading={isLoading} />
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {debateData?.weather && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 card-accent-orange relative overflow-hidden"
                >
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-ipl-orange/5 rounded-full blur-xl" />
                  <div className="section-header mb-4">
                    <Wind className="w-3 h-3" /> Venue Telemetry
                    {!debateData.weather.isRealData && (
                      <span className="ml-auto text-[10px] text-amber-500 font-normal">(Fallback data)</span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-3 relative z-10">
                    <div className="bg-navy-900/60 rounded-xl p-3 text-center border border-white/5">
                      <ThermometerSun className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
                      <div className="text-[10px] text-slate-500 mb-0.5">Temp</div>
                      <div className="font-bold text-sm text-white">{debateData.weather.temperature}</div>
                    </div>
                    <div className="bg-navy-900/60 rounded-xl p-3 text-center border border-white/5">
                      <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
                      <div className="text-[10px] text-slate-500 mb-0.5">Humidity</div>
                      <div className="font-bold text-sm text-white">{debateData.weather.humidity}</div>
                    </div>
                    <div className={`rounded-xl p-3 text-center border ${
                      debateData.weather.dewWarning === 'High'
                        ? 'bg-red-500/10 border-red-500/20'
                        : 'bg-emerald-500/10 border-emerald-500/20'
                    }`}>
                      <CloudRain className={`w-5 h-5 mx-auto mb-1.5 ${debateData.weather.dewWarning === 'High' ? 'text-red-400' : 'text-emerald-400'}`} />
                      <div className="text-[10px] text-slate-500 mb-0.5">Dew</div>
                      <div className={`font-bold text-sm ${debateData.weather.dewWarning === 'High' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {debateData.weather.dewWarning}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Debate Feed ────────────────────────────────────────── */}
          <div className="flex-1 glass-card flex flex-col overflow-hidden min-h-0">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-neon-blue" />
                <h2 className="font-bold text-white">Orchestration Feed</h2>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-navy-900/60 px-2 py-1 rounded-lg">GEMINI MULTI-AGENT</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-neon-blue/20 rounded-full" />
                    <div className="absolute inset-0 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium mb-1">Running 5-Agent Debate...</p>
                    <p className="text-xs text-slate-500">Stats → Pitch → Devil's Advocate → Captain → Commentator</p>
                  </div>
                  {/* Agent progress indicators */}
                  <div className="flex gap-3 items-center">
                    {['Stats', 'Pitch', 'Devil', 'Captain', 'Commentary'].map((a, i) => (
                      <div key={a} className="flex flex-col items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-neon-blue/30 animate-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                        <span className="text-[10px] text-slate-500">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && !debateData && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-2xl bg-neon-blue/5 border border-neon-blue/10 flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-neon-blue/40" />
                  </div>
                  <p className="text-slate-400 font-medium mb-1">Ready to Analyze</p>
                  <p className="text-sm text-slate-600">Fill in the match parameters and click "Initialize Strategy Protocol"</p>
                </div>
              )}

              {!isLoading && debateData && (
                <div className="space-y-4">
                  {debateData.timeline.map((item, i) =>
                    item.role === 'captain' ? (
                      <FinalDecisionCard key={i} agent={item.agent} text={item.text} confidence={item.confidence} />
                    ) : (
                      <AgentCard key={i} agent={item.agent} text={item.text} role={item.role} delay={i * 0.15} />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
