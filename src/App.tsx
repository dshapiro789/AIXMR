import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
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
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatInterface />
              </ProtectedRoute>
            } />
            <Route path="/resources" element={
              <ProtectedRoute>
                <ResourceDirectory />
              </ProtectedRoute>
            } />
            <Route path="/learn" element={
              <ProtectedRoute>
                <LearningHub />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;