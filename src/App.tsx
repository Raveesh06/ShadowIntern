import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Code2, 
  ShoppingBag, 
  User, 
  ChevronRight, 
  Zap, 
  Trophy, 
  Terminal,
  Terminal as TerminalIcon,
  GitMerge,
  CheckCircle,
  GitBranch,
  Database,
  MessageSquare,
  FileCode,
  CheckCircle2,
  Check,
  AlertCircle,
  Search,
  Filter,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
  AtSign,
  Send,
  AlertTriangle,
  Eye,
  Play,
  Clock,
  Target,
  Shield,
  Smartphone,
  CreditCard,
  Globe,
  Dna,
  Linkedin,
  Github,
  Activity,
  Map as MapIcon,
  Command,
  Bell,
  Settings,
  LogOut,
  Cpu,
  Globe2,
  Lock,
  Unlock,
  Sparkles,
  ArrowUpRight,
  MousePointer2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area
} from 'recharts';
import Markdown from 'react-markdown';
import { cn } from './lib/utils';

// --- Types ---
interface UserProfile {
  id: string;
  name: string;
  email: string;
  university: string;
  shadowScore: number;
  seniorityLevel: string;
  xp: number;
  learningCredits: number;
  isClockedIn: boolean;
  lastClockIn: string | null;
  totalHoursLogged: number;
  weeklyHours: number;
  internshipDay: number;
  reliabilityRating: number;
  isPro: boolean;
  linkedIn?: string;
  role: string;
  competencies: {
    codeQuality: number;
    architecture: number;
    security: number;
    debugging: number;
    collaboration: number;
    documentation: number;
  };
  workLog: { id: string; type: string; title: string; status: string; date: string; score: number }[];
  certifications: { id: string; title: string; company: string; date: string }[];
  careerRoadmap: {
    google: number;
    stripe: number;
    microsoft: number;
  };
  unlockedCompanies: string[];
  activeInternship?: {
    company: string;
    trackId: string;
    startDate: string;
    endDate: string;
    currentSprint: number;
    deadline: string;
  };
}

const PARTNER_UNIVERSITIES = [
  "IIT Bombay", "IIT Delhi", "Stanford University", "MIT", "BITS Pilani", "Delhi University", "SRM Institute", "VIT University"
];

const COMPANIES = [
  { id: 'google', name: 'Google', industry: 'Tech', logo: 'https://www.google.com/favicon.ico', color: 'bg-blue-500' },
  { id: 'tesla', name: 'Tesla', industry: 'Automotive/Tech', logo: 'https://www.tesla.com/favicon.ico', color: 'bg-red-600' },
  { id: 'goldman', name: 'Goldman Sachs', industry: 'Finance', logo: 'https://www.goldmansachs.com/favicon.ico', color: 'bg-blue-900' },
  { id: 'mckinsey', name: 'McKinsey', industry: 'Consulting', logo: 'https://www.mckinsey.com/favicon.ico', color: 'bg-blue-800' },
  { id: 'adobe', name: 'Adobe', industry: 'Creative Tech', logo: 'https://www.adobe.com/favicon.ico', color: 'bg-red-500' },
  { id: 'netflix', name: 'Netflix', industry: 'Entertainment', logo: 'https://www.netflix.com/favicon.ico', color: 'bg-red-700' },
  { id: 'amazon', name: 'Amazon', industry: 'E-commerce', logo: 'https://www.amazon.com/favicon.ico', color: 'bg-orange-500' },
  { id: 'meta', name: 'Meta', industry: 'Social Media', logo: 'https://www.meta.com/favicon.ico', color: 'bg-blue-600' },
  { id: 'microsoft', name: 'Microsoft', industry: 'Tech', logo: 'https://www.microsoft.com/favicon.ico', color: 'bg-blue-400' },
  { id: 'apple', name: 'Apple', industry: 'Consumer Tech', logo: 'https://www.apple.com/favicon.ico', color: 'bg-gray-800' },
  { id: 'stripe', name: 'Stripe', industry: 'Fintech', logo: 'https://www.stripe.com/favicon.ico', color: 'bg-indigo-600' },
  { id: 'spacex', name: 'SpaceX', industry: 'Aerospace', logo: 'https://www.spacex.com/favicon.ico', color: 'bg-black' },
  { id: 'nvidia', name: 'Nvidia', industry: 'Hardware/AI', logo: 'https://www.nvidia.com/favicon.ico', color: 'bg-green-600' },
  { id: 'airbnb', name: 'Airbnb', industry: 'Hospitality', logo: 'https://www.airbnb.com/favicon.ico', color: 'bg-rose-500' },
  { id: 'uber', name: 'Uber', industry: 'Mobility', logo: 'https://www.uber.com/favicon.ico', color: 'bg-black' },
  { id: 'spotify', name: 'Spotify', industry: 'Media', logo: 'https://www.spotify.com/favicon.ico', color: 'bg-green-500' },
  { id: 'salesforce', name: 'Salesforce', industry: 'SaaS', logo: 'https://www.salesforce.com/favicon.ico', color: 'bg-blue-400' },
  { id: 'jpmorgan', name: 'J.P. Morgan', industry: 'Finance', logo: 'https://www.jpmorgan.com/favicon.ico', color: 'bg-blue-950' },
  { id: 'morganstanley', name: 'Morgan Stanley', industry: 'Finance', logo: 'https://www.morganstanley.com/favicon.ico', color: 'bg-blue-900' },
  { id: 'bcg', name: 'BCG', industry: 'Consulting', logo: 'https://www.bcg.com/favicon.ico', color: 'bg-green-800' },
];

const ROLES = [
  "Backend Developer", "Frontend Developer", "Fullstack Engineer", "Product Manager", 
  "Data Analyst", "UX Architect", "DevOps Engineer", "Security Researcher", "Other"
];

// --- Components ---

const CommandPalette = ({ isOpen, onClose, onAction }: { isOpen: boolean, onClose: () => void, onAction: (action: string) => void }) => {
  const [search, setSearch] = useState('');
  const actions = [
    { id: 'profile', label: 'View Shadow Profile', icon: User, shortcut: 'G P' },
    { id: 'workspace', label: 'Open Simulation Hub', icon: Code2, shortcut: 'G W' },
    { id: 'roadmap', label: 'Check Career Path', icon: MapIcon, shortcut: 'G R' },
    { id: 'marketplace', label: 'Browse Marketplace', icon: ShoppingBag, shortcut: 'G M' },
    { id: 'pro', label: 'Upgrade to Pro', icon: Zap, shortcut: 'U' },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl glass-panel overflow-hidden shadow-2xl border-white/20"
      >
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Command className="w-5 h-5 text-brand-primary" />
          <input 
            autoFocus
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 font-mono text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-slate-500 font-mono">ESC</div>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filtered.map(action => (
            <button
              key={action.id}
              onClick={() => { onAction(action.id); onClose(); }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                  <action.icon className="w-4 h-4 text-slate-400 group-hover:text-brand-primary" />
                </div>
                <span className="text-sm font-bold text-slate-300 group-hover:text-white">{action.label}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-600 uppercase">{action.shortcut}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const GlobalActivityFeed = () => {
  const [activities, setActivities] = useState([
    { id: 1, user: 'Shadow_0x42', action: 'merged a PR', company: 'Stripe', time: '2m ago' },
    { id: 2, user: 'Intern_Alpha', action: 'completed onboarding', company: 'Google', time: '5m ago' },
    { id: 3, user: 'Dev_Shadow', action: 'unlocked Pro', company: 'N/A', time: '12m ago' },
    { id: 4, user: 'Code_Runner', action: 'fixed a bug', company: 'Netflix', time: '15m ago' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['Shadow_Bot', 'Intern_X', 'Dev_01', 'Cloud_Shadow'];
      const actions = ['pushed code', 'resolved a ticket', 'started a sprint', 'earned a badge'];
      const companies = ['Google', 'Stripe', 'Amazon', 'Meta'];
      
      const newActivity = {
        id: Date.now(),
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        time: 'Just now'
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Globe2 className="w-3 h-3 text-brand-primary" />
          Global Shadow Feed
        </h3>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="space-y-3">
        {activities.map(activity => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3 group"
          >
            <div className="w-6 h-6 rounded bg-brand-primary/10 flex items-center justify-center text-[10px] font-black text-brand-primary">
              {activity.user[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-slate-300 leading-tight">
                <span className="font-black text-white">{activity.user}</span> {activity.action} at <span className="text-brand-primary">{activity.company}</span>
              </p>
              <p className="text-[8px] text-slate-600 font-bold uppercase mt-0.5">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface Track {
  id: string;
  title: string;
  company: string;
  industry: string;
  logo: string;
  difficulty: string;
  requiredScore: number;
  duration: string;
  skills: string[];
  status: string;
  price: number;
  currency: string;
  roi: number;
  isSponsorFunded: boolean;
  culture: string;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-dark p-6 font-mono">
          <div className="neomorphic-card max-w-lg w-full p-8 border-red-500/30">
            <h2 className="text-2xl font-black text-red-500 uppercase tracking-tighter mb-4">System <span className="text-white">Crash</span></h2>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 mb-6">
              <p className="text-xs text-red-400 font-bold leading-relaxed">
                {this.state.error?.message || "An unexpected runtime error occurred in the Workforce Engine."}
              </p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-white/5 border border-border-dark text-white rounded-xl font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AuthPage = ({ onAuthSuccess }: { onAuthSuccess: (user: UserProfile) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [customRole, setCustomRole] = useState('');
  const [showPartnerPopup, setShowPartnerPopup] = useState(false);

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setUniversity(val);
    if (PARTNER_UNIVERSITIES.includes(val)) {
      setShowPartnerPopup(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock logic for "New Account" vs "Returning User"
    const isReturningUser = email.includes('returning');
    const finalRole = role === 'Other' ? customRole : role;
    
    const mockUser: UserProfile = {
      id: 'u-' + Date.now(),
      name: username || (isReturningUser ? 'Alex Shadow' : 'New Shadow'),
      email: email,
      university: university || 'Self-Taught',
      shadowScore: isReturningUser ? 840 : 0,
      seniorityLevel: isReturningUser ? 'Senior Shadow' : 'Junior Shadow',
      xp: isReturningUser ? 4500 : 0,
      learningCredits: isReturningUser ? 120 : 0,
      isClockedIn: false,
      lastClockIn: null,
      totalHoursLogged: isReturningUser ? 25.5 : 0,
      weeklyHours: isReturningUser ? 12.5 : 0,
      internshipDay: isReturningUser ? 14 : 1,
      reliabilityRating: isReturningUser ? 98 : 100,
      isPro: false,
      role: isReturningUser ? 'Backend Developer' : finalRole,
      unlockedCompanies: isReturningUser ? ['google', 'stripe'] : [],
      competencies: {
        codeQuality: isReturningUser ? 75 : 0,
        architecture: isReturningUser ? 60 : 0,
        security: isReturningUser ? 45 : 0,
        debugging: isReturningUser ? 80 : 0,
        collaboration: isReturningUser ? 90 : 0,
        documentation: isReturningUser ? 70 : 0,
      },
      workLog: isReturningUser ? [
        { id: '1', type: 'PR', title: 'Auth Logic Fix', status: 'Merged', date: '2026-03-20', score: 45 },
        { id: '2', type: 'DOC', title: 'API Specs', status: 'Approved', date: '2026-03-22', score: 30 },
      ] : [],
      certifications: isReturningUser ? [
        { id: 'c1', title: 'Cloud Fundamentals', company: 'Google', date: '2026-03-15' }
      ] : [],
      careerRoadmap: {
        google: isReturningUser ? 45 : 0,
        stripe: isReturningUser ? 30 : 0,
        microsoft: isReturningUser ? 15 : 0,
      }
    };

    onAuthSuccess(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark p-6 overflow-y-auto font-mono">
      <AnimatePresence>
        {showPartnerPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[210] flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
          >
            <div className="neomorphic-card max-w-md w-full p-8 border-brand-primary/50 text-center">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-primary/30">
                <Trophy className="text-brand-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Partner <span className="text-brand-primary">Discount!</span></h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Your university is a <span className="text-white font-bold">ShadowIntern partner!</span> Claim your exclusive coupon code for a <span className="text-brand-primary font-bold">20% discount</span> on Pro.
              </p>
              <div className="p-4 bg-white/5 border border-dashed border-brand-primary/50 rounded-xl mb-8">
                <span className="text-lg font-mono font-black text-brand-primary tracking-widest">SHADOW20-PARTNER</span>
              </div>
              <button 
                onClick={() => setShowPartnerPopup(false)}
                className="w-full py-4 bg-brand-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-glow"
              >
                Claim Coupon
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neomorphic-card max-w-md w-full p-10 border-brand-primary/20"
      >
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-glow">
            <Zap className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase">SHADOW<span className="text-brand-primary">INTERN</span></h1>
        </div>

        <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Join the Network'}
        </h2>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-8 text-center">
          {isLogin ? 'Access your simulation hub' : 'Start your 30-day corporate journey'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-all"
                placeholder="shadow_intern_01"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-all"
              placeholder="alex@shadow.com"
            />
            {isLogin && <p className="text-[9px] text-slate-600 italic">Tip: Use 'returning' in email for mock data</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-all"
              placeholder="••••••••"
            />
          </div>
          {!isLogin && (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">College/University (Optional)</label>
                <select 
                  value={university}
                  onChange={handleUniversityChange}
                  className="w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-all appearance-none"
                >
                  <option value="" className="bg-bg-dark">Select University</option>
                  {PARTNER_UNIVERSITIES.map(u => (
                    <option key={u} value={u} className="bg-bg-dark">{u}</option>
                  ))}
                  <option value="Other" className="bg-bg-dark">Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Desired Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-all appearance-none"
                >
                  {ROLES.map(r => (
                    <option key={r} value={r} className="bg-bg-dark">{r}</option>
                  ))}
                </select>
                {role === 'Other' && (
                  <input 
                    type="text" 
                    required
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    className="w-full bg-white/5 border border-border-dark rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-all mt-2"
                    placeholder="Specify your role..."
                  />
                )}
              </div>
            </>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-brand-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-glow mt-4 hover:scale-[1.02] transition-all"
          >
            {isLogin ? 'Initialize Session' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-brand-primary transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
const Sidebar = ({ activeTab, setActiveTab, user, onUpgrade }: { activeTab: string; setActiveTab: (tab: string) => void; user: UserProfile; onUpgrade: () => void }) => {
  const menuItems = [
    { id: 'profile', icon: User, label: 'Shadow Profile' },
    { id: 'workspace', icon: Code2, label: 'Simulation Hub' },
    { id: 'roadmap', icon: MapIcon, label: 'Career Path' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
  ];

  return (
    <div className="w-72 border-r border-white/5 h-screen flex flex-col bg-bg-dark/80 backdrop-blur-2xl relative z-50">
      <div className="p-8 flex items-center gap-4">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-glow-strong animate-pulse-slow">
          <Zap className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase leading-none">SHADOW</h1>
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">INTERN OS</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
              activeTab === item.id 
                ? "bg-brand-primary/10 text-brand-primary shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]" 
                : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-pill"
                className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-brand-primary rounded-r-full"
              />
            )}
            <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", activeTab === item.id ? "text-brand-primary" : "text-slate-500 group-hover:text-slate-200")} />
            <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary shadow-glow" />
            )}
          </button>
        ))}
      </nav>

      <div className="px-6 space-y-8 mb-8">
        <GlobalActivityFeed />
        
        {!user.isPro && (
          <button 
            onClick={onUpgrade}
            className="w-full p-5 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-black uppercase tracking-widest text-[10px] shadow-glow-strong hover:shadow-brand-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Unlock Pro Access
          </button>
        )}
      </div>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-black shadow-lg group-hover:shadow-brand-primary/20 transition-all">
              {user.name[0]}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-bg-dark" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black text-white truncate uppercase tracking-tighter">{user.name}</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{user.seniorityLevel}</p>
          </div>
          <LogOut className="w-4 h-4 text-slate-600 hover:text-brand-accent transition-colors" />
        </div>
      </div>
    </div>
  );
};

const ProUpgradeModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(onSuccess, 1500);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="neomorphic-card max-w-2xl w-full p-0 overflow-hidden border-brand-primary/30"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="p-10 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border-r border-white/5">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mb-6 shadow-glow">
              <Zap className="text-white w-7 h-7" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Unlock <span className="text-brand-primary">Pro</span> Access</h2>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">
              Get unlimited access to all 20+ company simulations, exclusive mentor feedback, and AI-powered career roadmaps.
            </p>
            <ul className="space-y-4">
              {[
                "All 20+ Companies Unlocked",
                "Priority AI Feedback",
                "Custom Career Roadmaps",
                "Advanced IDE Features",
                "Verified Pro Certificate"
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-xs font-bold text-white uppercase tracking-widest">
                  <div className="w-5 h-5 bg-brand-primary/20 rounded-full flex items-center justify-center border border-brand-primary/30">
                    <Check className="text-brand-primary w-3 h-3" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-10 flex flex-col justify-center bg-bg-dark/40">
            {step === 'info' ? (
              <div className="text-center">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Lifetime Access</p>
                <div className="flex items-center justify-center gap-2 mb-8">
                  <span className="text-5xl font-black text-white tracking-tighter">₹1299</span>
                  <span className="text-sm text-slate-500 line-through font-bold">₹2499</span>
                </div>
                <button 
                  onClick={() => setStep('payment')}
                  className="w-full py-5 bg-brand-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-glow hover:scale-[1.02] transition-all"
                >
                  Upgrade Now
                </button>
                <button 
                  onClick={onClose}
                  className="mt-6 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-6">Select Payment Method</h3>
                <div className="space-y-3">
                  {[
                    { id: 'upi', name: 'UPI (GPay/PhonePe)', icon: Smartphone },
                    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'net', name: 'Net Banking', icon: Globe },
                  ].map(m => (
                    <button 
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={cn(
                        "w-full p-4 rounded-xl border flex items-center gap-4 transition-all",
                        paymentMethod === m.id 
                          ? "bg-brand-primary/10 border-brand-primary text-white" 
                          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                      )}
                    >
                      <m.icon className={cn("w-5 h-5", paymentMethod === m.id ? "text-brand-primary" : "text-slate-500")} />
                      <span className="text-xs font-bold uppercase tracking-widest">{m.name}</span>
                    </button>
                  ))}
                </div>
                <button 
                  disabled={!paymentMethod}
                  onClick={handlePayment}
                  className="w-full py-5 bg-brand-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-glow mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Purchase
                </button>
                <button 
                  onClick={() => setStep('info')}
                  className="w-full text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CareerRoadmapPage = ({ user }: { user: UserProfile }) => {
  const roadmapItems = [
    { year: '2026', title: 'Shadow Intern', company: 'Google (Simulation)', status: 'Active', icon: Zap },
    { year: '2026', title: 'Junior Backend Dev', company: 'Stripe (Simulation)', status: 'Upcoming', icon: Code2 },
    { year: '2027', title: 'Fullstack Engineer', company: 'Meta (Simulation)', status: 'Target', icon: Target },
    { year: '2028', title: 'Senior Software Engineer', company: 'Netflix', status: 'Career Goal', icon: Trophy },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Career <span className="text-brand-primary">Roadmap</span></h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">AI-Generated path based on your SkillDNA</p>
        </div>
        <div className="flex gap-4">
          <div className="neomorphic-card p-4 flex items-center gap-4 border-brand-primary/20">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
              <Dna className="text-brand-primary w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">SkillDNA Score</p>
              <p className="text-lg font-black text-white">84% Match</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border-dark border-dashed border-l" />
        <div className="space-y-12">
          {roadmapItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-20"
            >
              <div className={cn(
                "absolute left-6 top-0 w-4 h-4 rounded-full border-4 border-bg-dark z-10",
                item.status === 'Active' ? "bg-brand-primary shadow-glow" : "bg-slate-700"
              )} />
              <div className="neomorphic-card p-6 border-white/5 hover:border-brand-primary/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                      <item.icon className="text-slate-400 group-hover:text-brand-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tighter">{item.title}</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.company}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                    item.status === 'Active' ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary" : "bg-white/5 border-white/10 text-slate-500"
                  )}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {['System Design', 'Scalability', 'Security'].map(skill => (
                    <div key={skill} className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1">{skill}</p>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
  const ProfilePage = ({ user }: { user: UserProfile }) => {
  const stats = [
    { label: 'Shadow Score', value: user.shadowScore, icon: Trophy, color: 'text-brand-primary' },
    { label: 'XP Points', value: user.xp.toLocaleString(), icon: Zap, color: 'text-brand-secondary' },
    { label: 'Reliability', value: `${user.reliabilityRating}%`, icon: Shield, color: 'text-green-500' },
    { label: 'Hours Logged', value: user.totalHoursLogged.toFixed(1), icon: Clock, color: 'text-brand-accent' },
  ];

  const heatmapData = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 100),
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-mono">
      {/* Header Bento Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 neomorphic-card flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-brand-primary/10 transition-all duration-700" />
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary p-1 shadow-glow-strong">
              <img 
                src={`https://picsum.photos/seed/${user.id}/200/200`} 
                alt="Profile" 
                className="w-full h-full rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-bg-dark border border-white/10 px-3 py-1 rounded-full text-[10px] font-black text-brand-primary uppercase tracking-widest shadow-xl">
              {user.seniorityLevel}
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter text-glow">{user.name}</h2>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em]">{user.role} @ {user.university}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-300">/in/shadow-intern</span>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 flex items-center gap-2">
                <Github className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-300">@shadow_dev</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/5 min-w-[140px]">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Internship Day</span>
            <span className="text-4xl font-black text-brand-primary">{user.internshipDay}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">of 30</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="neomorphic-card flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Simulation Stats</h3>
            <Activity className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-brand-primary/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className={cn("w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center", stat.color.replace('text-', 'bg-') + '/10')}>
                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                </div>
                <span className="text-sm font-black text-white group-hover:text-brand-primary transition-colors">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skills & Heatmap Bento Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="neomorphic-card lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">SkillDNA Radar</h3>
            <Cpu className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { subject: 'Code', A: user.competencies.codeQuality, fullMark: 100 },
                { subject: 'Arch', A: user.competencies.architecture, fullMark: 100 },
                { subject: 'Sec', A: user.competencies.security, fullMark: 100 },
                { subject: 'Debug', A: user.competencies.debugging, fullMark: 100 },
                { subject: 'Collab', A: user.competencies.collaboration, fullMark: 100 },
                { subject: 'Doc', A: user.competencies.documentation, fullMark: 100 },
              ]}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <Radar name="Skills" dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="neomorphic-card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Activity Heatmap</h3>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-sm bg-brand-primary/20" />
              <div className="w-2 h-2 rounded-sm bg-brand-primary/40" />
              <div className="w-2 h-2 rounded-sm bg-brand-primary/60" />
              <div className="w-2 h-2 rounded-sm bg-brand-primary" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-3">
            {heatmapData.map((d) => (
              <div key={d.day} className="space-y-1">
                <div 
                  className="aspect-square rounded-lg border border-white/5 transition-all hover:scale-110 cursor-help"
                  style={{ 
                    backgroundColor: `rgba(14, 165, 233, ${d.value / 100})`,
                    boxShadow: d.value > 80 ? '0 0 10px rgba(14, 165, 233, 0.3)' : 'none'
                  }}
                  title={`Day ${d.day}: ${d.value} Shadow Points`}
                />
                <span className="text-[8px] text-slate-600 font-bold block text-center">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Current Streak</p>
                <p className="text-lg font-black text-brand-primary">12 DAYS</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-glow">
              Share Profile
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CodeEditorModal = ({ task, onClose, onSubmit }: { task: any; onClose: () => void; onSubmit: (code: string) => void }) => {
  const [code, setCode] = useState(`// Task: ${task.title}\n// Implement your solution here...\n\nfunction solve() {\n  \n}`);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="neomorphic-card w-full max-w-4xl h-[600px] flex flex-col overflow-hidden border-brand-primary/30"
      >
        <div className="h-12 border-b border-border-dark flex items-center justify-between px-6 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">IDE: {task.title}.ts</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 bg-[#0d1117] p-6 font-mono text-sm">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-transparent text-slate-300 outline-none resize-none spellcheck-false"
            autoFocus
          />
        </div>
        <div className="h-16 border-t border-border-dark flex items-center justify-end px-6 bg-black/20 gap-4">
          <button onClick={onClose} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase hover:text-white transition-colors">Cancel</button>
          <button 
            onClick={() => onSubmit(code)}
            className="px-8 py-2 bg-brand-primary text-white text-xs font-black uppercase rounded shadow-glow hover:scale-105 transition-all"
          >
            Submit for Review
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const TaskModal = ({ task, feedback, onClose, onStart, onOpenIDE, onAskReview }: { 
  task: any, 
  feedback?: string, 
  onClose: () => void, 
  onStart: () => void, 
  onOpenIDE: () => void, 
  onAskReview: () => void 
}) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="neomorphic-card max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-border-dark flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              task.status === 'Done' ? "bg-green-500/20 text-green-500" :
              task.status === 'Review' ? "bg-yellow-500/20 text-yellow-500" :
              "bg-brand-primary/20 text-brand-primary"
            )}>
              {task.status === 'Done' ? <CheckCircle2 className="w-6 h-6" /> : <Target className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">{task.title}</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Issue #{task.id} | Priority: {task.priority}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-white/5 border border-border-dark">
              <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Status</p>
              <p className="text-xs font-black text-white uppercase">{task.status}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-border-dark">
              <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">XP Reward</p>
              <p className="text-xs font-black text-brand-primary uppercase">+250 XP</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-border-dark">
              <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Shadow Score</p>
              <p className="text-xs font-black text-green-500 uppercase">+15 Impact</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-brand-primary pl-3">Description</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {task.description || "This task involves implementing core functionality for the current sprint. Ensure all edge cases are handled and code follows the company's engineering standards."}
            </p>
          </div>

          {task.code && (
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-brand-primary pl-3">Your Submission</h4>
              <div className="bg-black/60 p-4 rounded-xl border border-border-dark font-mono text-[11px] text-slate-400 overflow-x-auto">
                <pre>{task.code}</pre>
              </div>
            </div>
          )}

          {feedback && (
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-green-500 pl-3">Tech Lead Feedback</h4>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400 italic leading-relaxed">
                "{feedback}"
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border-dark bg-black/40 flex gap-4">
          {task.status === 'To Do' && (
            <button 
              onClick={onStart}
              className="flex-1 py-3 bg-brand-primary text-white text-xs font-black uppercase rounded-xl hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Working
            </button>
          )}
          {task.status === 'In Progress' && (
            <button 
              onClick={onOpenIDE}
              className="flex-1 py-3 bg-brand-primary text-white text-xs font-black uppercase rounded-xl hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              Open IDE
            </button>
          )}
          {task.status === 'Review' && (
            <button 
              onClick={onAskReview}
              className="flex-1 py-3 bg-yellow-500 text-black text-xs font-black uppercase rounded-xl hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Ask for Review
            </button>
          )}
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-white/5 border border-border-dark text-slate-400 text-xs font-black uppercase rounded-xl hover:bg-white/10 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const BossGuidanceModal = ({ guidance, onClose }: { guidance: any; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="neomorphic-card w-full max-w-md p-8 border-brand-primary/30"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
            <User className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h4 className="text-lg font-black text-white uppercase tracking-tighter">{guidance.bossName} <span className="text-brand-primary">(Boss)</span></h4>
            <span className={cn(
              "text-[9px] font-black uppercase px-1.5 py-0.5 rounded",
              guidance.priority === 'Critical' ? "bg-red-500 text-white" : "bg-brand-primary/20 text-brand-primary"
            )}>
              {guidance.priority} Priority
            </span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-border-dark mb-6 italic text-sm text-slate-300 leading-relaxed">
          "{guidance.message}"
        </div>
        <button 
          onClick={onClose}
          className="w-full py-4 bg-brand-primary text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-glow hover:scale-[1.02] transition-all"
        >
          Understood, Sir.
        </button>
      </motion.div>
    </div>
  );
};

const PeerReviewModal = ({ review, onClose, onSubmit }: { review: any; onClose: () => void; onSubmit: (feedback: string) => void }) => {
  const [feedback, setFeedback] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="neomorphic-card w-full max-w-2xl flex flex-col overflow-hidden border-brand-primary/30"
      >
        <div className="h-12 border-b border-border-dark flex items-center justify-between px-6 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-primary shadow-glow" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Peer Review: {review.peerName}</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/20">
            <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">Context:</p>
            <p className="text-xs text-slate-300">{review.context}</p>
          </div>
          <div className="bg-[#0d1117] p-4 rounded-xl border border-border-dark font-mono text-xs">
            <pre className="text-slate-300 whitespace-pre-wrap">{review.snippet}</pre>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Your Review Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Be specific and empathetic. Identify the bug if you see it..."
              className="w-full h-32 bg-white/5 border border-border-dark rounded-xl p-4 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all resize-none"
            />
          </div>
        </div>
        <div className="h-16 border-t border-border-dark flex items-center justify-end px-6 bg-black/20 gap-4">
          <button onClick={onClose} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase hover:text-white transition-colors">Skip</button>
          <button 
            onClick={() => onSubmit(feedback)}
            className="px-8 py-2 bg-brand-primary text-white text-xs font-black uppercase rounded shadow-glow hover:scale-105 transition-all"
          >
            Submit Review
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const WorkspacePage = ({ track, user, onUpdateUser }: { track: Track; user: UserProfile | null; onUpdateUser: (u: UserProfile) => void }) => {
  const [activeTab, setActiveTab] = useState('jira');
  const [slackInput, setSlackInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<{ id: number; text: string; type: 'info' | 'error' | 'success' | 'cmd'; time: string }[]>([
    { id: 1, text: 'ShadowOS v2.0.4 initialized.', type: 'info', time: new Date().toLocaleTimeString() },
    { id: 2, text: 'Connecting to secure corporate VPN...', type: 'info', time: new Date().toLocaleTimeString() },
    { id: 3, text: 'VPN Connected. Access granted to internal clusters.', type: 'success', time: new Date().toLocaleTimeString() },
  ]);

  const addTerminalLog = (text: string, type: 'info' | 'error' | 'success' | 'cmd' = 'info') => {
    setTerminalLogs(prev => [{ id: Date.now(), text, type, time: new Date().toLocaleTimeString() }, ...prev]);
  };
  const [messages, setMessages] = useState<any[]>([
    { id: 1, sender: 'PM (Sarah)', text: 'Hey team, we need to pivot the auth logic. The client wants biometric support by EOD.', time: '10:24 AM', persona: 'pm' },
    { id: 2, sender: 'Tech Lead (Dave)', text: 'Sarah, that is a massive scope creep. We haven\'t even finished the base JWT implementation.', time: '10:26 AM', persona: 'tech' },
  ]);
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Implement JWT Middleware', status: 'In Progress', priority: 'High', code: '', description: 'Create a robust JWT middleware to handle user authentication and session management across all microservices.' },
    { id: 't2', title: 'Fix Memory Leak in Auth Service', status: 'To Do', priority: 'Critical', code: '', description: 'Investigate and resolve the heap memory leak occurring during high-concurrency login attempts.' },
    { id: 't3', title: 'Setup CI/CD Pipeline', status: 'Done', priority: 'Medium', code: '// Pipeline setup complete', description: 'Configure GitHub Actions for automated testing and deployment to the staging environment.' },
    { id: 't4', title: 'Database Schema Migration', status: 'To Do', priority: 'High', code: '', description: 'Migrate the legacy user table to the new relational schema to support multi-tenancy.' },
    { id: 't5', title: 'API Documentation (Swagger)', status: 'Review', priority: 'Low', code: 'swagger: "2.0"\ninfo:\n  title: Auth API', description: 'Generate comprehensive API documentation using Swagger/OpenAPI standards.' },
  ]);
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', text: 'System initialized. All services operational.', time: '09:00:00' },
    { id: 2, type: 'warn', text: 'CPU usage spike detected: 84%', time: '10:15:22' },
    { id: 3, type: 'error', text: 'Connection timeout on DB cluster-0', time: '10:45:10' },
  ]);

  const [activeCodingTask, setActiveCodingTask] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [bossGuidance, setBossGuidance] = useState<any>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [taskFeedback, setTaskFeedback] = useState<Record<string, string>>({});
  const [peerReview, setPeerReview] = useState<any>(null);
  const [deadlineTime, setDeadlineTime] = useState('04:22:15');

  useEffect(() => {
    const timer = setInterval(() => {
      setDeadlineTime(prev => {
        const [h, m, s] = prev.split(':').map(Number);
        let totalSeconds = h * 3600 + m * 60 + s - 1;
        if (totalSeconds < 0) return '00:00:00';
        const nh = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const nm = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const ns = (totalSeconds % 60).toString().padStart(2, '0');
        return `${nh}:${nm}:${ns}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockToggle = async () => {
    if (!user) return;
    const endpoint = user.isClockedIn ? '/api/simulation/clock-out' : '/api/simulation/clock-in';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
      const data = await res.json();
      if (data.success) {
        onUpdateUser({ ...user, isClockedIn: data.isClockedIn, totalHoursLogged: data.totalHours || user.totalHoursLogged });
        setLogs(prev => [{ 
          id: Date.now(), 
          type: 'info', 
          text: `User ${data.isClockedIn ? 'Clocked In' : 'Clocked Out'}. Session recorded.`, 
          time: new Date().toLocaleTimeString() 
        }, ...prev]);
      }
    } catch (error) {
      console.error("Clock toggle failed", error);
    }
  };

  const triggerPeerReview = async () => {
    try {
      const res = await fetch('/api/simulation/peer-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: track.company })
      });
      const data = await res.json();
      // Also post to Slack
      setMessages(prev => [{
        id: Date.now(),
        sender: data.peerName,
        text: `Hey, I just pushed some code for the ${data.context}. Could you give it a quick look? I'm not sure about the logic here.`,
        time: new Date().toLocaleTimeString(),
        persona: 'tech',
        action: {
          label: 'Review Code',
          onClick: () => setPeerReview(data)
        }
      }, ...prev]);
      // Switch to Slack tab to show the message
      setActiveTab('slack');
    } catch (error) {
      console.error("Peer review trigger failed", error);
    }
  };

  const submitPeerReview = async (feedback: string) => {
    if (!peerReview) return;
    try {
      const res = await fetch('/api/simulation/peer-review-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          peerReview, 
          userFeedback: feedback,
          company: track.company 
        })
      });
      const data = await res.json();
      
      setMessages(prev => [{
        id: Date.now(),
        sender: peerReview.peerName,
        text: `Thanks for the review! ${data.feedback}`,
        time: new Date().toLocaleTimeString(),
        persona: 'tech'
      }, ...prev]);

      if (user) {
        onUpdateUser({
          ...user,
          shadowScore: user.shadowScore + data.scoreImpact,
          competencies: {
            ...user.competencies,
            collaboration: Math.min(100, user.competencies.collaboration + 2)
          }
        });
      }
      setPeerReview(null);
    } catch (error) {
      console.error("Peer review submission failed", error);
    }
  };

  const getBossGuidance = async () => {
    try {
      const res = await fetch('/api/workplace/boss-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sprintStatus: tasks, company: track.company })
      });
      const data = await res.json();
      setBossGuidance(data);
      // Also post to Slack
      setMessages(prev => [{ 
        id: Date.now(), 
        sender: `Boss (${data.bossName})`, 
        text: data.message, 
        time: new Date().toLocaleTimeString(), 
        persona: 'boss' 
      }, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slackInput.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: user?.name || 'You',
      text: slackInput,
      time: new Date().toLocaleTimeString(),
      persona: 'user'
    };

    setMessages(prev => [userMsg, ...prev]);
    setSlackInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/workplace/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: slackInput, 
          company: track.company,
          history: messages.slice(0, 5)
        })
      });
      const data = await res.json();
      setMessages(prev => [{
        id: Date.now(),
        sender: data.sender,
        text: data.text,
        time: new Date().toLocaleTimeString(),
        persona: data.persona
      }, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const submitCode = async (code: string) => {
    if (!activeCodingTask) return;
    
    // Move to Review
    const updatedTasks = tasks.map(t => t.id === activeCodingTask.id ? { ...t, status: 'Review', code } : t);
    setTasks(updatedTasks);
    setActiveCodingTask(null);
    setLogs(prev => [{ id: Date.now(), type: 'info', text: `Task #${activeCodingTask.id} submitted for review.`, time: new Date().toLocaleTimeString() }, ...prev]);
  };

  const askForReview = async (task: any) => {
    setIsReviewing(true);
    try {
      const res = await fetch('/api/workplace/review-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, code: task.code, company: track.company })
      });
      const data = await res.json();
      
      if (data.approved) {
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'Done' } : t));
        setTaskFeedback(prev => ({ ...prev, [task.id]: data.feedback }));
        setMessages(prev => [{ id: Date.now(), sender: 'Tech Lead (Dave)', text: `Nice work on #${task.id}! ${data.feedback}`, time: new Date().toLocaleTimeString(), persona: 'tech' }, ...prev]);
        
        if (user) {
          onUpdateUser({
            ...user,
            shadowScore: user.shadowScore + (data.shadowScoreImpact || 10),
            xp: user.xp + (data.xpGain || 100)
          });
        }
      } else {
        setMessages(prev => [{ id: Date.now(), sender: 'Tech Lead (Dave)', text: `Rejected #${task.id}. ${data.feedback}`, time: new Date().toLocaleTimeString(), persona: 'tech' }, ...prev]);
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'In Progress' } : t));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsReviewing(false);
    }
  };

  const stats = [
    { label: 'CPU', value: '42%', color: 'text-green-500' },
    { label: 'MEM', value: '1.2GB', color: 'text-blue-500' },
    { label: 'LATENCY', value: '14ms', color: 'text-brand-primary' },
  ];

  return (
    <div className="h-full flex flex-col bg-bg-dark font-mono">
      {activeCodingTask && (
        <CodeEditorModal 
          task={activeCodingTask} 
          onClose={() => setActiveCodingTask(null)} 
          onSubmit={submitCode} 
        />
      )}
      {bossGuidance && (
        <BossGuidanceModal 
          guidance={bossGuidance} 
          onClose={() => setBossGuidance(null)} 
        />
      )}
      {peerReview && (
        <PeerReviewModal 
          review={peerReview} 
          onClose={() => setPeerReview(null)} 
          onSubmit={submitPeerReview} 
        />
      )}
      {selectedTask && (
        <TaskModal 
          task={selectedTask} 
          feedback={taskFeedback[selectedTask.id]}
          onClose={() => setSelectedTask(null)}
          onStart={() => {
            setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, status: 'In Progress' } : t));
            setSelectedTask(null);
          }}
          onOpenIDE={() => {
            setActiveCodingTask(selectedTask);
            setSelectedTask(null);
          }}
          onAskReview={() => {
            askForReview(selectedTask);
            setSelectedTask(null);
          }}
        />
      )}

      {/* Top Bar - System Health */}
      <div className="h-14 border-b border-border-dark flex items-center justify-between px-6 bg-black/40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{track?.company || 'SYSTEM'} // WAR ROOM</span>
          </div>
          <div className="h-4 w-px bg-border-dark" />
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-500 font-bold uppercase">Weekly Progress</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-border-dark">
                  <div 
                    className="h-full bg-brand-primary transition-all duration-1000" 
                    style={{ width: `${(user?.weeklyHours || 0) / 40 * 100}%` }} 
                  />
                </div>
                <span className="text-[9px] text-slate-400 font-bold">{Math.round(user?.weeklyHours || 0)}/40h</span>
              </div>
            </div>
            <div className="h-4 w-px bg-border-dark" />
            <div className="flex flex-col">
              <span className="text-[8px] text-red-500 font-bold uppercase">Sprint Deadline</span>
              <div className="flex items-center gap-1.5 text-[10px] font-black text-red-500">
                <Clock className="w-3 h-3" />
                {deadlineTime}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleClockToggle}
            className={cn(
              "px-4 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all flex items-center gap-2",
              user?.isClockedIn 
                ? "bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white" 
                : "bg-green-500/20 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white"
            )}
          >
            <Zap className={cn("w-3 h-3", user?.isClockedIn && "animate-pulse")} />
            {user?.isClockedIn ? 'Clock Out' : 'Clock In'}
          </button>
          <button 
            onClick={getBossGuidance}
            className="px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-[9px] font-black text-brand-primary uppercase rounded-lg hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2"
          >
            <User className="w-3 h-3" />
            Boss Guidance
          </button>
          <button 
            onClick={() => setActiveTab('teampulse')}
            className={cn(
              "px-3 py-1.5 border text-[9px] font-bold uppercase rounded-lg transition-all",
              activeTab === 'teampulse' ? "bg-brand-primary text-white border-brand-primary shadow-glow" : "bg-white/5 border-border-dark text-slate-500 hover:text-white"
            )}
          >
            Team Pulse
          </button>
          <div className="h-4 w-px bg-border-dark" />
          <button 
            onClick={() => {
              addTerminalLog('Initiating production deployment...', 'info');
              setTimeout(() => addTerminalLog('Building assets...', 'info'), 1000);
              setTimeout(() => addTerminalLog('Running security scans...', 'info'), 2000);
              setTimeout(() => addTerminalLog('Pushing to edge nodes...', 'info'), 3500);
              setTimeout(() => {
                addTerminalLog('Deployment SUCCESSFUL. Version 2.0.5 live.', 'success');
                alert('Deployment Successful! Your changes are now live on production edge nodes.');
              }, 5000);
            }}
            className="px-4 py-1.5 bg-brand-primary text-white text-[9px] font-black uppercase rounded-lg hover:shadow-glow transition-all"
          >
            Deploy to Prod
          </button>
        </div>
      </div>

      {/* Main 4-Pane Layout */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left Rail - Navigation */}
        <div className="col-span-1 border-r border-border-dark flex flex-col items-center py-6 gap-8 bg-black/20">
          {[
            { id: 'jira', icon: LayoutDashboard, label: 'Jira' },
            { id: 'slack', icon: MessageSquare, label: 'Slack' },
            { id: 'teampulse', icon: Activity, label: 'Pulse' },
            { id: 'docs', icon: FileCode, label: 'Docs' },
            { id: 'logs', icon: TerminalIcon, label: 'Logs' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "p-3 rounded-xl transition-all group relative",
                activeTab === item.id ? "bg-brand-primary text-white shadow-glow" : "text-slate-500 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="absolute left-16 bg-black text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="col-span-11 overflow-hidden flex flex-col">
          {activeTab === 'jira' && (
            <div className="p-8 h-full overflow-y-auto space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter">Sprint <span className="text-brand-primary">Backlog</span></h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-border-dark">
                      <div 
                        className="h-full bg-brand-primary transition-all duration-1000" 
                        style={{ width: `${(tasks.filter(t => t.status === 'Done').length / tasks.length) * 100}%` }} 
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase">
                      {Math.round((tasks.filter(t => t.status === 'Done').length / tasks.length) * 100)}% Complete
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white/5 border border-border-dark text-[9px] text-slate-500 font-bold uppercase">{tasks.length} Issues</span>
                  <span className="px-2 py-1 bg-brand-primary/10 border border-brand-primary/20 text-[9px] text-brand-primary font-bold uppercase">Active Sprint</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {['To Do', 'In Progress', 'Review', 'Done'].map(status => (
                  <div key={status} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border-dark pb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{status}</span>
                      <span className="text-[10px] font-bold text-slate-600">{tasks.filter(t => t.status === status).length}</span>
                    </div>
                    {tasks.filter(t => t.status === status).map(task => (
                      <div 
                        key={task.id} 
                        onClick={() => setSelectedTask(task)}
                        className={cn(
                          "bg-white/5 border border-border-dark p-4 rounded-lg hover:border-brand-primary transition-colors cursor-pointer group relative overflow-hidden",
                          status === 'Done' && "border-green-500/20 hover:border-green-500/50",
                          status === 'Review' && "border-yellow-500/20 hover:border-yellow-500/50",
                          status === 'In Progress' && "border-brand-primary/20 hover:border-brand-primary/50"
                        )}
                      >
                        {status === 'In Progress' && (
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-brand-primary/20">
                            <motion.div 
                              className="h-full bg-brand-primary"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <span className={cn(
                            "text-[8px] font-black uppercase px-1.5 py-0.5 rounded",
                            task.priority === 'Critical' ? "bg-red-500 text-white" :
                            task.priority === 'High' ? "bg-orange-500/20 text-orange-500 border border-orange-500/30" :
                            "bg-blue-500/20 text-blue-500 border border-blue-500/30"
                          )}>
                            {task.priority}
                          </span>
                          <span className="text-[9px] text-slate-600 font-bold">#{task.id}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors mb-4 line-clamp-2">{task.title}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {[1, 2].map(i => (
                              <div key={i} className="w-5 h-5 rounded-full border-2 border-bg-dark bg-slate-800 flex items-center justify-center">
                                <User className="w-3 h-3 text-slate-500" />
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-500 uppercase">
                            <Clock className="w-3 h-3" />
                            {status === 'Done' ? 'Completed' : '2d left'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          )}

          {activeTab === 'slack' && (
            <div className="flex flex-col h-full bg-black/20">
              <div className="p-4 border-b border-border-dark bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-widest">#engineering-general</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">12 members | Internal Communication</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-dark bg-slate-800 flex items-center justify-center">
                        <User className="w-3 h-3 text-slate-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col-reverse">
                {isTyping && (
                  <div className="flex gap-3 items-start animate-pulse">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                      <User className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Someone is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                {messages.map(msg => (
                  <div key={msg.id} className={cn(
                    "flex gap-3 items-start group",
                    msg.persona === 'user' ? "flex-row-reverse" : ""
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded flex items-center justify-center flex-shrink-0",
                      msg.persona === 'boss' ? "bg-red-500/20 text-red-500" :
                      msg.persona === 'tech' ? "bg-blue-500/20 text-blue-500" :
                      msg.persona === 'pm' ? "bg-orange-500/20 text-orange-500" :
                      "bg-brand-primary/20 text-brand-primary"
                    )}>
                      {msg.persona === 'boss' ? <ShieldAlert className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={cn(
                      "space-y-1 max-w-[70%]",
                      msg.persona === 'user' ? "items-end" : ""
                    )}>
                      <div className={cn(
                        "flex items-center gap-2",
                        msg.persona === 'user' ? "flex-row-reverse" : ""
                      )}>
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          msg.persona === 'boss' ? "text-red-500" :
                          msg.persona === 'tech' ? "text-blue-500" :
                          msg.persona === 'pm' ? "text-orange-500" :
                          "text-brand-primary"
                        )}>{msg.sender}</span>
                        <span className="text-[8px] text-slate-600 font-bold">{msg.time}</span>
                      </div>
                      <div className={cn(
                        "p-3 rounded-lg text-xs leading-relaxed",
                        msg.persona === 'user' ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" : "bg-white/5 text-slate-300 border border-border-dark"
                      )}>
                        {msg.text}
                        {msg.action && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <button 
                              onClick={msg.action.onClick}
                              className="px-4 py-1.5 bg-brand-primary text-white text-[10px] font-black uppercase rounded shadow-glow hover:scale-105 transition-all"
                            >
                              {msg.action.label}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border-dark bg-black/40">
                <form onSubmit={handleSendMessage} className="relative">
                  <input 
                    type="text" 
                    value={slackInput}
                    onChange={(e) => setSlackInput(e.target.value)}
                    placeholder="Message #engineering-general..."
                    className="w-full bg-white/5 border border-border-dark rounded-lg px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button type="button" className="p-1 text-slate-500 hover:text-white transition-colors"><AtSign className="w-4 h-4" /></button>
                    <button type="submit" className="p-1 text-brand-primary hover:text-white transition-colors"><Send className="w-4 h-4" /></button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="p-8 h-full overflow-y-auto max-w-4xl mx-auto w-full space-y-8">
              <div className="border-b border-border-dark pb-6">
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Engineering <span className="text-brand-primary">Standards</span></h1>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Last updated: 2 hours ago by Tech Lead</p>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                <h2 className="text-brand-primary uppercase tracking-widest text-sm font-black">01. Code Quality</h2>
                <p className="text-slate-400">All submissions must strictly follow the DRY (Don't Repeat Yourself) principle. Any duplicated logic will result in an immediate ticket rejection by the Tech Lead.</p>
                
                <h2 className="text-brand-primary uppercase tracking-widest text-sm font-black mt-8">02. Security Protocols</h2>
                <p className="text-slate-400">Never hardcode API keys or secrets. Use the environment variable system provided in the workspace. Any leaked credentials will impact your Shadow Score significantly.</p>
                
                <div className="bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-lg mt-8">
                  <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">Pro Tip:</p>
                  <p className="text-xs text-slate-300 italic">"The best code is the code you don't write. Keep it lean, keep it fast." — Tech Lead</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teampulse' && (
            <div className="p-8 h-full overflow-y-auto space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter">Team <span className="text-brand-primary">Pulse</span></h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time intern sentiment & velocity</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-[8px] text-slate-500 font-bold uppercase">Team Velocity</p>
                    <p className="text-sm font-black text-green-500">84.2%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-slate-500 font-bold uppercase">Active Interns</p>
                    <p className="text-sm font-black text-brand-primary">12 / 15</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="neomorphic-card p-6 border-white/5">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Intern Sentiment Analysis</h4>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { time: '09:00', sentiment: 65 },
                          { time: '10:00', sentiment: 72 },
                          { time: '11:00', sentiment: 85 },
                          { time: '12:00', sentiment: 60 },
                          { time: '13:00', sentiment: 45 },
                          { time: '14:00', sentiment: 78 },
                          { time: '15:00', sentiment: 92 },
                        ]}>
                          <defs>
                            <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }}
                            itemStyle={{ color: '#0ea5e9' }}
                          />
                          <Area type="monotone" dataKey="sentiment" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorSentiment)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="neomorphic-card p-6 border-white/5">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Top Performers</h4>
                      <div className="space-y-4">
                        {[
                          { name: 'Sarah K.', score: 98, avatar: 'SK' },
                          { name: 'Mike R.', score: 94, avatar: 'MR' },
                          { name: 'Alex J.', score: 89, avatar: 'AJ' },
                        ].map(intern => (
                          <div key={intern.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-brand-primary/10 flex items-center justify-center text-[10px] font-black text-brand-primary">
                                {intern.avatar}
                              </div>
                              <span className="text-xs font-bold text-white">{intern.name}</span>
                            </div>
                            <span className="text-[10px] font-black text-brand-primary">{intern.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="neomorphic-card p-6 border-white/5">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Team Health</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Collaboration</span>
                          <span className="text-[10px] font-black text-green-500 uppercase">Excellent</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Code Quality</span>
                          <span className="text-[10px] font-black text-brand-primary uppercase">High</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Deadline Risk</span>
                          <span className="text-[10px] font-black text-red-500 uppercase">Low</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="neomorphic-card p-6 border-white/5 h-full">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Live Activity</h4>
                    <div className="space-y-6">
                      {[
                        { user: 'Sarah K.', action: 'merged a PR', time: '2m ago', icon: GitMerge, color: 'text-purple-500' },
                        { user: 'Mike R.', action: 'resolved a bug', time: '5m ago', icon: CheckCircle, color: 'text-green-500' },
                        { user: 'Alex J.', action: 'pushed to main', time: '12m ago', icon: GitBranch, color: 'text-blue-500' },
                        { user: 'Boss', action: 'updated sprint', time: '25m ago', icon: ShieldAlert, color: 'text-red-500' },
                        { user: 'System', action: 'backup complete', time: '45m ago', icon: Database, color: 'text-slate-500' },
                      ].map((act, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className={cn("w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0", act.color.replace('text-', 'bg-') + '/10')}>
                            <act.icon className={cn("w-4 h-4", act.color)} />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-white">
                              <span className="text-brand-primary">{act.user}</span> {act.action}
                            </p>
                            <p className="text-[9px] text-slate-500 uppercase font-bold mt-0.5">{act.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={triggerPeerReview}
                      className="w-full mt-8 py-3 bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-black text-brand-primary uppercase rounded-xl hover:bg-brand-primary hover:text-white transition-all shadow-glow"
                    >
                      Trigger Peer Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="p-8 h-full overflow-y-auto space-y-6 bg-black/40 font-mono">
              <div className="flex items-center justify-between border-b border-border-dark pb-4">
                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-brand-primary" />
                  System Logs
                </h3>
                <button 
                  onClick={() => setTerminalLogs([])}
                  className="text-[10px] font-bold text-slate-500 uppercase hover:text-white transition-colors"
                >
                  Clear Console
                </button>
              </div>
              <div className="space-y-2">
                {terminalLogs.map(log => (
                  <div key={log.id} className="flex gap-4 text-[11px] leading-relaxed">
                    <span className="text-slate-600 shrink-0">[{log.time}]</span>
                    <span className={cn(
                      "font-bold",
                      log.type === 'error' ? "text-red-500" :
                      log.type === 'success' ? "text-green-500" :
                      log.type === 'cmd' ? "text-brand-primary" :
                      "text-slate-400"
                    )}>
                      {log.type === 'cmd' && '> '}
                      {log.text}
                    </span>
                  </div>
                ))}
                <div className="flex gap-4 text-[11px] items-center">
                  <span className="text-brand-primary font-bold">{'>'}</span>
                  <input 
                    type="text" 
                    placeholder="Enter command..."
                    className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-700"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value;
                        if (!val) return;
                        addTerminalLog(val, 'cmd');
                        (e.target as HTMLInputElement).value = '';
                        
                        // Simulate command processing
                        setTimeout(() => {
                          if (val.toLowerCase() === 'help') {
                            addTerminalLog('Available commands: help, clear, status, deploy, whoami', 'info');
                          } else if (val.toLowerCase() === 'status') {
                            addTerminalLog('System: Operational | VPN: Active | Latency: 14ms', 'success');
                          } else if (val.toLowerCase() === 'whoami') {
                            addTerminalLog(`${user?.name || 'Intern'} @ ${track?.company || 'ShadowOS'}`, 'info');
                          } else {
                            addTerminalLog(`Command not found: ${val}`, 'error');
                          }
                        }, 500);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MarketplacePage = ({ tracks, user, onUpdateUser }: { tracks: Track[], user: UserProfile, onUpdateUser: (user: UserProfile) => void }) => {
  const [filter, setFilter] = useState('All');
  const [purchasing, setPurchasing] = useState<Track | null>(null);
  const industries = ['All', 'Tech', 'Finance', 'Consulting', 'Automotive', 'Entertainment', 'E-commerce', 'Fintech', 'Aerospace', 'AI/ML', 'SaaS'];

  // Logic for Pro users: all tracks are unlocked unless already in progress or completed
  const processedTracks = tracks.map(track => {
    if (user.isPro && track.status === 'Locked') {
      return { ...track, status: 'Unlocked' };
    }
    return track;
  });

  const filteredTracks = filter === 'All' ? processedTracks : processedTracks.filter(t => t.industry === filter || t.company.toLowerCase().includes(filter.toLowerCase()));

  const handlePurchase = async (track: Track) => {
    if (!user.isPro && user.learningCredits < track.price) {
      alert('Insufficient Learning Credits. Complete more tasks to earn credits or Go Pro to unlock all companies!');
      return;
    }

    // Simulate purchase
    const updatedUser = {
      ...user,
      learningCredits: user.isPro ? user.learningCredits : user.learningCredits - track.price,
      unlockedCompanies: [...user.unlockedCompanies, track.id],
      workLog: [
        { id: Math.random().toString(), type: 'PURCHASE', title: `Enrolled in ${track.title}`, status: 'Completed', date: new Date().toLocaleDateString(), score: 0 },
        ...user.workLog
      ]
    };
    onUpdateUser(updatedUser);
    setPurchasing(null);
    alert(`Successfully enrolled in ${track.title}!`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-mono">
      {/* Bloomberg Header */}
      <div className="border-b border-brand-primary/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase shrink-0">Market <span className="text-brand-primary">Terminals</span></h2>
          <div className="flex flex-wrap gap-2">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-3 py-1 border transition-all",
                  filter === ind ? "bg-brand-primary text-white border-brand-primary" : "text-slate-500 border-border-dark hover:text-white hover:border-slate-600"
                )}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => alert("Company Request Form coming soon! We're adding new partners every week.")}
            className="px-4 py-2 bg-white/5 border border-dashed border-slate-700 text-[10px] font-bold uppercase text-slate-400 hover:text-white hover:border-slate-500 transition-all"
          >
            + Request Company
          </button>
          <div className="text-right">
            <p className="text-[9px] text-slate-500 font-bold uppercase">Learning Credits</p>
            <p className="text-sm font-black text-brand-primary">{user.learningCredits} LC</p>
          </div>
          <div className="h-8 w-px bg-border-dark hidden md:block" />
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold text-brand-primary">
            <span className="animate-pulse">LIVE FEED:</span>
            <span className="text-slate-500">BTC +2.4%</span>
            <span className="text-slate-500">ETH -1.2%</span>
            <span className="text-slate-500">SHADOW +15.8%</span>
          </div>
        </div>
      </div>

      {/* Track List - Bloomberg Style */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-dark text-[10px] uppercase font-bold text-slate-500 tracking-widest">
              <th className="py-4 px-4">Ticker / Company</th>
              <th className="py-4 px-4">Track Title</th>
              <th className="py-4 px-4">Simulation Cycle</th>
              <th className="py-4 px-4">Price (LC)</th>
              <th className="py-4 px-4">Difficulty</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dark">
            {filteredTracks.map(track => (
              <tr key={track.id} className="group hover:bg-white/5 transition-colors">
                <td className="py-6 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white p-1 rounded flex items-center justify-center">
                      <img src={track.logo} alt={track.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white uppercase">{track.company}</p>
                      <p className="text-[10px] text-slate-500">{track.industry}</p>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-4">
                  <p className="text-sm font-bold text-slate-300">{track.title}</p>
                  <p className="text-[10px] text-slate-500">{track.skills.slice(0, 2).join(' / ')}</p>
                </td>
                <td className="py-6 px-4">
                  <span className="text-sm font-bold text-brand-primary uppercase tracking-tighter">30-Day Cycle</span>
                </td>
                <td className="py-6 px-4">
                  <p className="text-sm font-bold text-white">{track.price}</p>
                  {track.isSponsorFunded && <span className="text-[9px] text-brand-primary font-bold uppercase">Sponsor Funded</span>}
                </td>
                <td className="py-6 px-4">
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                    track.difficulty === 'Expert' ? "bg-red-500/10 text-red-500" :
                    track.difficulty === 'Hard' ? "bg-orange-500/10 text-orange-500" :
                    "bg-blue-500/10 text-blue-500"
                  )}>
                    {track.difficulty}
                  </span>
                </td>
                <td className="py-6 px-4">
                  <p className="text-xs font-bold text-slate-400">{track.status}</p>
                </td>
                <td className="py-6 px-4 text-right">
                  <button 
                    onClick={() => (track.status === 'Locked' || track.status === 'Unlocked') ? setPurchasing(track) : null}
                    className={cn(
                      "px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all",
                      (track.status === 'Locked' || track.status === 'Unlocked') ? "border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white" : "border-border-dark text-slate-600 cursor-not-allowed"
                    )}
                  >
                    {track.status === 'In Progress' ? 'Resume' : track.status === 'Completed' ? 'Review' : track.status === 'Unlocked' ? 'Enroll (Pro)' : 'Enroll'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {purchasing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="neomorphic-card max-w-md w-full p-8 space-y-6"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-white p-3 rounded-2xl mx-auto mb-6">
                  <img src={purchasing.logo} alt={purchasing.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {user.isPro ? 'Pro Enrollment' : 'Confirm Enrollment'}
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  {user.isPro 
                    ? `As a Pro member, you can enroll in ${purchasing.company} for free!`
                    : `You are about to enroll in the ${purchasing.title} track by ${purchasing.company}.`}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-border-dark space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold uppercase">Price</span>
                  <span className={cn("font-bold", user.isPro && "line-through text-slate-500")}>{purchasing.price} LC</span>
                  {user.isPro && <span className="text-brand-primary font-bold">0 LC (PRO)</span>}
                </div>
                {!user.isPro && (
                  <>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-bold uppercase">Your Balance</span>
                      <span className="text-white font-bold">{user.learningCredits} LC</span>
                    </div>
                    <div className="h-px bg-border-dark" />
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-bold uppercase">Remaining</span>
                      <span className={cn("font-bold", user.learningCredits >= purchasing.price ? "text-green-500" : "text-red-500")}>
                        {user.learningCredits - purchasing.price} LC
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setPurchasing(null)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-border-dark text-slate-400 font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handlePurchase(purchasing)}
                  className="flex-1 py-3 rounded-xl bg-brand-primary text-white font-bold text-sm hover:shadow-glow transition-all"
                >
                  {user.isPro ? 'Unlock Now' : 'Confirm & Pay'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [showProModal, setShowProModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('shadow_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      fetch(`/api/profile?email=${parsedUser.email}`).then(res => res.json()).then(setUser);
    }
    fetch('/api/tracks').then(res => res.json()).then(data => {
      setTracks(data);
      if (data.length > 0) setActiveTrack(data[0]);
    });
  }, []);

  const handleAuthSuccess = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('shadow_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('shadow_user');
  };

  const handleUpgradeSuccess = () => {
    if (user) {
      const updatedUser = { ...user, isPro: true };
      setUser(updatedUser);
      localStorage.setItem('shadow_user', JSON.stringify(updatedUser));
      setShowProModal(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="flex h-screen bg-bg-dark overflow-hidden selection:bg-brand-primary/30">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onUpgrade={() => setShowProModal(true)} 
      />
      
      <main className="flex-1 flex flex-col relative">
        {/* Top Navigation Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-bg-dark/40 backdrop-blur-xl z-40">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
            >
              <Command className="w-4 h-4 group-hover:text-brand-primary transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest">Quick Search</span>
              <div className="flex items-center gap-1 ml-4">
                <div className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono">⌘</div>
                <div className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono">K</div>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Server: Online</span>
            </div>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border-2 border-bg-dark" />
            </button>
            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
              <Settings className="w-4 h-4" />
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all ml-2"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full overflow-y-auto"
            >
              {activeTab === 'profile' && <ProfilePage user={user} />}
              {activeTab === 'workspace' && activeTrack && <WorkspacePage track={activeTrack} user={user} onUpdateUser={setUser} />}
              {activeTab === 'roadmap' && <CareerRoadmapPage user={user} />}
              {activeTab === 'marketplace' && <MarketplacePage tracks={tracks} user={user} onUpdateUser={setUser} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Floating Actions */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-brand-primary text-white rounded-2xl shadow-glow-strong flex items-center justify-center group"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </motion.button>
        </div>
      </main>

      <AnimatePresence>
        {isCommandPaletteOpen && (
          <CommandPalette 
            isOpen={isCommandPaletteOpen} 
            onClose={() => setIsCommandPaletteOpen(false)} 
            onAction={(id) => setActiveTab(id)}
          />
        )}
        {showProModal && (
          <ProUpgradeModal 
            onClose={() => setShowProModal(false)} 
            onSuccess={handleUpgradeSuccess} 
          />
        )}
      </AnimatePresence>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[400] overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                top: -20, 
                left: `${Math.random() * 100}%`,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                top: '120%',
                rotate: 360 * 2,
                left: `${Math.random() * 100}%`
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                ease: "linear",
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ 
                backgroundColor: ['#0ea5e9', '#6366f1', '#f43f5e', '#fbbf24'][Math.floor(Math.random() * 4)]
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
