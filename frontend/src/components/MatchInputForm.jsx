import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VENUES = [
  'Wankhede Stadium, Mumbai',
  'Eden Gardens, Kolkata',
  'M. Chinnaswamy Stadium, Bengaluru',
  'M.A. Chidambaram Stadium, Chennai',
  'Narendra Modi Stadium, Ahmedabad',
  'Arun Jaitley Stadium, Delhi',
  'Sawai Mansingh Stadium, Jaipur',
  'Rajiv Gandhi Intl Stadium, Hyderabad',
];

const Field = ({ label, name, value, onChange, placeholder, className = '' }) => (
  <div className={className}>
    <label className="field-label">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="premium-input"
    />
  </div>
);

export default function MatchInputForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    battingTeam: 'Chennai Super Kings',
    bowlingTeam: 'Mumbai Indians',
    score: '150/4',
    overs: '16.2',
    target: '185',
    striker: 'MS Dhoni (32 off 18)',
    nonStriker: 'Ravindra Jadeja (12 off 8)',
    bowler: 'Jasprit Bumrah',
    venue: 'Wankhede Stadium, Mumbai',
    impactPlayerAvailable: true,
  });

  const set = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Batting Team" name="battingTeam" value={form.battingTeam} onChange={set} placeholder="e.g. CSK" />
        <Field label="Bowling Team" name="bowlingTeam" value={form.bowlingTeam} onChange={set} placeholder="e.g. MI" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Field label="Score" name="score" value={form.score} onChange={set} placeholder="150/4" />
        <Field label="Overs" name="overs" value={form.overs} onChange={set} placeholder="16.2" />
        <Field label="Target" name="target" value={form.target} onChange={set} placeholder="185" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Striker" name="striker" value={form.striker} onChange={set} placeholder="Name (runs off balls)" />
        <Field label="Non-Striker" name="nonStriker" value={form.nonStriker} onChange={set} placeholder="Name (runs off balls)" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Current Bowler" name="bowler" value={form.bowler} onChange={set} placeholder="e.g. Bumrah" />
        <div>
          <label className="field-label">Venue</label>
          <select name="venue" value={form.venue} onChange={set} className="premium-select">
            {VENUES.map((v) => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* Impact Player Toggle */}
      <button
        type="button"
        onClick={() => setForm((p) => ({ ...p, impactPlayerAvailable: !p.impactPlayerAvailable }))}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-sm ${
          form.impactPlayerAvailable
            ? 'bg-neon-blue/10 border-neon-blue/30 text-neon-blue'
            : 'bg-navy-900/50 border-white/5 text-slate-400 hover:border-white/10'
        }`}
      >
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          form.impactPlayerAvailable ? 'bg-neon-blue border-neon-blue' : 'border-slate-600'
        }`}>
          {form.impactPlayerAvailable && <div className="w-2 h-2 bg-navy-950 rounded-sm" />}
        </div>
        <span className="font-medium">Impact Player Available</span>
        {form.impactPlayerAvailable && (
          <span className="ml-auto text-[10px] bg-neon-blue/20 px-2 py-0.5 rounded-full uppercase tracking-widest">ON</span>
        )}
      </button>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        disabled={isLoading}
        type="submit"
        className={`btn-primary flex items-center justify-center gap-2 mt-2 ${isLoading ? 'opacity-60 cursor-not-allowed hover:scale-100' : ''}`}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            Initialize Strategy Protocol
          </>
        )}
      </motion.button>
    </form>
  );
}
