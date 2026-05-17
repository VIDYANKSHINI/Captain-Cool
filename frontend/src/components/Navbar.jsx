import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Trophy, LayoutDashboard, Mic, Radio, Network, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/dashboard', label: 'Strategy Room', icon: LayoutDashboard },
  { to: '/live', label: 'Live Match', icon: Radio },
  { to: '/voice', label: 'Voice Captain', icon: Mic },
  { to: '/architecture', label: 'Architecture', icon: Network },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(2,8,23,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)' }}>
            <Trophy className="w-4 h-4" style={{ color: '#00d4ff' }} />
          </div>
          <span className="font-display font-black text-white text-lg hidden sm:block">
            Captain <span style={{ color: '#00d4ff' }}>Cool</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:text-white"
              style={({ isActive }) => isActive ? { background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' } : {}}
            >
              <Icon className="w-4 h-4" />{label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex">
          <div className="badge-online">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Gemini Active
          </div>
        </div>

        <button className="md:hidden p-2 text-slate-400" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(10,15,30,0.98)', borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
            <nav className="p-4 flex flex-col gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400"
                  style={({ isActive }) => isActive ? { background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff' } : {}}>
                  <Icon className="w-4 h-4" />{label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
