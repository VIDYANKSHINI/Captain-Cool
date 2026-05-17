import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Radio, Volume2 } from 'lucide-react';
import { useState } from 'react';

export default function VoiceCaptain() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  return (
    <div className="min-h-screen bg-stadium pt-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="badge-online w-fit mx-auto mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Voice Mode Beta
          </div>
          <h1 className="font-display font-black text-5xl md:text-6xl text-white mb-4">
            🎙️ Voice <span className="text-neon-blue">Captain</span>
          </h1>
          <p className="text-slate-400 text-lg mb-12">
            Speak directly to your AI captain — like a real dugout conversation. Ask any tactical question in natural language.
          </p>

          {/* Mic button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsListening(!isListening)}
            className={`relative w-32 h-32 rounded-full mx-auto flex items-center justify-center mb-8 transition-all duration-300 ${
              isListening
                ? 'bg-red-500/20 border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]'
                : 'bg-neon-blue/10 border-2 border-neon-blue/40 hover:shadow-neon-blue'
            }`}
          >
            {isListening && (
              <div className="absolute inset-0 rounded-full border-2 border-red-500/50 animate-ping" />
            )}
            {isListening
              ? <MicOff className="w-12 h-12 text-red-400" />
              : <Mic className="w-12 h-12 text-neon-blue" />
            }
          </motion.button>

          {isListening && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
              <p className="text-red-400 font-medium mb-4">Listening to your tactical question...</p>
              {/* Waveform animation */}
              <div className="flex items-center justify-center gap-0.5">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>
            </motion.div>
          )}

          <div className="glass-card p-6 text-left">
            <div className="section-header mb-4"><Volume2 className="w-3 h-3" /> Example Questions</div>
            <div className="space-y-3">
              {[
                "Should Dhoni come in at 7 or promote himself given the dew factor?",
                "MI needs 18 off the last over. Who should bowl — Pandya or Bumrah?",
                "CSK is 120/5 at over 15, pitch is dry. What's the best field placement?",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-navy-900/60 border border-white/5 hover:border-neon-blue/20 transition-colors cursor-pointer">
                  <span className="text-neon-blue font-mono text-xs mt-0.5">{String(i+1).padStart(2,'0')}.</span>
                  <p className="text-sm text-slate-300 leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-6">Voice mode coming soon. This is a preview of the upcoming feature.</p>
        </motion.div>
      </div>
    </div>
  );
}
