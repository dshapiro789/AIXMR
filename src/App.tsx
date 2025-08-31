import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Copy, ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../../types';
import { storageUtils } from '../../utils/storage';
import Button from '../UI/Button';
import Card from '../UI/Card';

const SYSTEM_PROMPT = `You are the AI Monero Tutor: a comprehensive, privacy-first guide for all things Monero (XMR).

EXPERTISE AREAS:
- Wallets: Setup, security, backup strategies, hardware vs software options
- Privacy Features: Ring signatures, stealth addresses, RingCT, anonymity sets
- Security & OpSec: Key management, phishing protection, network privacy, Tor usage
- Nodes: Running full nodes, remote nodes, synchronization, bandwidth considerations
- Mining: CPU mining, GPU compatibility, pool vs solo mining, profitability factors
- Technical Education: Cryptographic concepts, blockchain mechanics, protocol updates
- Ecosystem: Exchanges, atomic swaps, merchant adoption, development tools
- Hardware: Mining rigs, hardware wallets, system requirements, optimization

CORE PRINCIPLES:
- Clarity over jargon; define technical terms clearly and succinctly
- Prioritize user safety: operational security, phishing awareness, key management, secure backups
- Provide practical, actionable guidance with clear tradeoffs; avoid absolutist claims
- Cite official sources (getmonero.org) and reputable community resources when helpful
- Maintain technical accuracy while being accessible to all skill levels

COMPARATIVE ANALYSIS:
- When comparing Monero to other cryptocurrencies or investments, remain neutral and factual
- Focus on technical differences, use cases, and objective characteristics
- Highlight Monero's unique privacy features without disparaging other projects
- Acknowledge legitimate tradeoffs and limitations honestly
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './components/Home/HomePage';
import ChatInterface from './components/Chat/ChatInterface';
import ResourceDirectory from './components/Resources/ResourceDirectory';
import LearningHub from './components/Learning/LearningHub';
import ContactPage from './components/Contact/ContactPage';
import SettingsPage from './components/Settings/SettingsPage';

function App() {
  return (
    <div className="min-h-screen bg-ink-black text-slate-200">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/resources" element={<ResourceDirectory />} />
          <Route path="/learn" element={<LearningHub />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;