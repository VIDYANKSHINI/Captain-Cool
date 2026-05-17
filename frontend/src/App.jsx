import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LiveMatchMode from './pages/LiveMatchMode';
import VoiceCaptain from './pages/VoiceCaptain';
import ArchitecturePage from './pages/ArchitecturePage';
import Navbar from './components/Navbar';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div {...pageVariants}><LandingPage /></motion.div>
        } />
        <Route path="/dashboard" element={
          <motion.div {...pageVariants}><Dashboard /></motion.div>
        } />
        <Route path="/live" element={
          <motion.div {...pageVariants}><LiveMatchMode /></motion.div>
        } />
        <Route path="/voice" element={
          <motion.div {...pageVariants}><VoiceCaptain /></motion.div>
        } />
        <Route path="/architecture" element={
          <motion.div {...pageVariants}><ArchitecturePage /></motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-navy-950 text-white">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
