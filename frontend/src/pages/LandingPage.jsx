import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Zap, Brain, Mic, Network, ChevronRight, BarChart2, Star, Link2, GitBranch, LineChart, Thermometer, AlertTriangle } from 'lucide-react';

/* ── Particles ─────────────────────────────────────────────────────────── */
function Particles() {
  const items = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#ff6b00' : '#6366f1',
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Live score widget ─────────────────────────────────────────────────── */
function ScoreWidget({ t1, s1, t2, s2, over, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
      className="glass-card p-4 min-w-[170px]"
    >
      <div className="badge-live mb-2 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />LIVE
      </div>
      <div className="flex justify-between items-center text-sm mb-1">
        <span className="font-bold text-white">{t1}</span>
        <span className="font-mono text-neon-blue font-bold">{s1}</span>
      </div>
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>{t2}</span><span className="font-mono">{s2}</span>
      </div>
      <div className="text-slate-600 text-xs mt-2 font-mono">Over {over}</div>
    </motion.div>
  );
}

/* ── Feature card ──────────────────────────────────────────────────────── */
const features = [
  { Icon: GitBranch, color: '#00d4ff', bg: 'rgba(0,212,255,0.08)', title: 'Multi-Agent Debate', desc: '5 Gemini agents debate every tactical move in real time' },
  { Icon: Brain,     color: '#6366f1', bg: 'rgba(99,102,241,0.08)', title: 'Tactical AI Captain', desc: 'Synthesizes all inputs into the optimal match strategy' },
  { Icon: Zap,       color: '#ff6b00', bg: 'rgba(255,107,0,0.08)', title: 'Live Match Intel', desc: 'Import live scorecard URLs for instant AI analysis' },
  { Icon: BarChart2, color: '#10b981', bg: 'rgba(16,185,129,0.08)', title: 'Win Probability', desc: 'Animated confidence gauge and counterfactual analysis' },
  { Icon: Mic,       color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', title: 'Voice Captain', desc: 'Speak your question — hear the AI captain reply' },
  { Icon: Network,   color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', title: 'Field Placement AI', desc: 'Visual field map with AI-suggested fielding positions' },
];

function FeatureCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { Icon, color, bg, title, desc } = item;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: bg }}>
        <Icon style={{ color }} className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ── Agent showcard ────────────────────────────────────────────────────── */
const agents = [
  { icon: LineChart, name: 'Stats Analyst', role: 'Data-Driven', color: '#6366f1', border: 'rgba(99,102,241,0.3)', bg: 'rgba(99,102,241,0.06)', specialty: 'Matchups, economy rates, historical stats' },
  { icon: Thermometer, name: 'Pitch Analyst', role: 'Conditions Expert', color: '#10b981', border: 'rgba(16,185,129,0.3)', bg: 'rgba(16,185,129,0.06)', specialty: 'Dew factor, pitch behavior, venue conditions' },
  { icon: AlertTriangle, name: "Devil's Advocate", role: 'Risk Analyst', color: '#ef4444', border: 'rgba(239,68,68,0.3)', bg: 'rgba(239,68,68,0.06)', specialty: 'Finding flaws, stress-testing decisions' },
  { icon: Mic, name: 'Commentator', role: 'Shastri-AI', color: '#f59e0b', border: 'rgba(245,158,11,0.3)', bg: 'rgba(245,158,11,0.06)', specialty: 'Fan-friendly IPL commentary style' },
];

function AgentShowcard({ agent, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const IconComponent = agent.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, type: 'spring', bounce: 0.3 }}
      className="glass-card p-6 relative overflow-hidden flex flex-col"
      style={{ borderColor: agent.border, background: agent.bg }}
    >
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl" style={{ background: agent.bg }} />
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border" style={{ borderColor: agent.border, background: agent.bg }}>
        <IconComponent style={{ color: agent.color }} className="w-5 h-5" />
      </div>
      <h3 className="font-display font-bold text-lg text-white">{agent.name}</h3>
      <p className="text-xs font-semibold mb-3" style={{ color: agent.color }}>{agent.role}</p>
      <p className="text-sm text-slate-400 leading-relaxed flex-1">{agent.specialty}</p>
      <div className="badge-online mt-4 w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Active
      </div>
    </motion.div>
  );
}

/* ── Main LandingPage ──────────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      <Particles />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
        {/* Centered glow orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.05) 0%, transparent 70%)' }} />
        </div>
        
        {/* Floating score widgets */}
        <div className="absolute left-6 top-1/3 hidden lg:block">
          <ScoreWidget t1="CSK" s1="185/4" t2="MI" s2="Chasing" over="20" delay={0} />
        </div>
        <div className="absolute right-6 top-1/4 hidden lg:block">
          <ScoreWidget t1="RCB" s1="223/3" t2="KKR" s2="156/8" over="18.4" delay={1.5} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' }}>
              <Star className="w-3 h-3 fill-current text-yellow-400" />
              Agentic Premier League 2025 · GDG Cloud Pune
              <Star className="w-3 h-3 fill-current text-yellow-400" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
            <h1 className="font-display font-black leading-none mb-6" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
              <span className="text-white">Captain</span><br />
              <span className="text-white">Cool AI</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="text-xl text-slate-300 mb-3 font-medium">
            Multi-Agent IPL Match Strategist powered by{' '}
            <span className="text-neon-blue font-bold">Gemini 2.5</span>
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="text-slate-400 text-base max-w-2xl mx-auto mb-12 leading-relaxed">
            An AI captain that <span className="text-white font-medium">thinks like Dhoni</span>, debates like expert analysts, and decides like a champion. Five specialised Gemini agents. One perfect strategy.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #22d3ee)', color: '#020817' }}>
              Start Strategy
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/voice')}
              className="btn-outline text-base px-8 py-4">
              Voice Mode
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/architecture')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-slate-400 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              Architecture
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-10">
            {[
              { v: '5', l: 'AI Agents' }, { v: 'Gemini 2.5', l: 'Model' },
              { v: 'Real-time', l: 'Weather API' }, { v: '∞', l: 'Scenarios' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="font-display font-black text-2xl text-neon-blue">{v}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-slate-700 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-neon-blue animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-4 py-24 max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-header justify-center mb-3">Features</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            The Full <span className="text-gradient-ipl">Captain's Arsenal</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">Every tool a cricket AI captain needs, powered by Google Gemini</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => <FeatureCard key={f.title} item={f} index={i} />)}
        </div>
      </section>

      {/* ── AGENTS ── */}
      <section className="px-4 py-24 max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-header justify-center mb-3">The War Room</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Meet the <span className="text-gradient-captain">AI Agents</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">Four specialised Gemini agents that debate, challenge, and decide every tactical moment</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {agents.map((a, i) => <AgentShowcard key={a.name} agent={a} index={i} />)}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t mt-8 px-4 py-12 text-center" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-neon-blue" />
            <span className="font-display font-black text-lg text-white">Captain Cool AI</span>
          </div>
          <p className="text-slate-500 text-sm mb-6">Built with Gemini 2.5 Flash · Open-Meteo · GDG Cloud Pune APL 2025</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-outline text-sm">
              <Link2 className="w-4 h-4" /> GitHub
            </a>
            <button onClick={() => navigate('/dashboard')} className="btn-outline text-sm">
              Launch App
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
