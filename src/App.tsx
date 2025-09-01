import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import HomePage from './components/Home/HomePage';
import ChatInterface from './components/Chat/ChatInterface';
import ResourceDirectory from './components/Resources/ResourceDirectory';
import LearningHub from './components/Learning/LearningHub';
import ContactPage from './components/Contact/ContactPage';
import SettingsPage from './components/Settings/SettingsPage';

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;