import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './components/Home/HomePage';
import ChatInterface from './components/Chat/ChatInterface';
import ResourceDirectory from './components/Resources/ResourceDirectory';
import ModelSettings from './components/Settings/ModelSettings';

function App() {
  return (
    <div className="min-h-screen bg-ink-black text-slate-200">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/resources" element={<ResourceDirectory />} />
          <Route path="/learn" element={
            <div className="max-w-4xl mx-auto px-4 py-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-100 mb-8 font-noto-serif">Learning Guides</h1>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Short lessons that respect your time. Ask the Tutor anywhere when you need more depth.
                </p>
                <div className="bg-slate-800/90 border border-slate-600/50 rounded-lg p-8 backdrop-blur-sm">
                  <p className="text-slate-400">Learning guides coming soon! For now, use the Chat feature to ask specific questions about Monero.</p>
                </div>
              </div>
            </div>
          } />
          <Route path="/contact" element={
            <div className="max-w-4xl mx-auto px-4 py-16">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-100 mb-8 font-noto-serif">Contact & Support</h1>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                  Have questions, feedback, or need help? We're here to assist.
                </p>
                <div className="bg-slate-800/90 border border-slate-600/50 rounded-lg p-8 backdrop-blur-sm">
                  <p className="text-slate-400">Contact form coming soon! For now, join the Monero community on Reddit or IRC for support.</p>
                </div>
              </div>
            </div>
          } />
          <Route path="/settings" element={
            <ModelSettings />
          } />
          <Route path="/about" element={
            <div className="max-w-4xl mx-auto px-4 py-16">
              <div className="text-center">
               <h1 className="text-4xl font-bold text-slate-100 mb-8 font-noto-serif">About Monero Tutor</h1>
               <div className="text-left space-y-6 text-slate-300">
                  <p className="text-lg">
                    The AI Monero Tutor is an educational platform designed to make Monero accessible, understandable, and safe for everyone. Our mission is to provide privacy-focused guidance without compromising your security or anonymity.
                  </p>
                  <p>
                   <strong className="text-slate-100">What we do:</strong> Provide curated resources, AI-powered guidance, and educational content to help you understand and use Monero effectively.
                  </p>
                  <p>
                   <strong className="text-slate-100">What we don't do:</strong> We never provide financial advice, store your private keys, or compromise your privacy. All AI interactions can be configured to remain local and private.
                  </p>
                 <div className="bg-red-900/25 border border-red-600/40 rounded-lg p-4 mt-8 backdrop-blur-sm">
                   <p className="text-red-300 text-sm">
                      <strong>Disclaimer:</strong> This is an educational resource only. Always verify information from multiple sources and never share private keys or seed phrases with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;