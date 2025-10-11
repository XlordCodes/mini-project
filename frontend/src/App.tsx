import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import EmailAnalysisPage from './pages/EmailAnalysisPage';
import URLDetector from './pages/URLDetector';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/email-analysis" element={<EmailAnalysisPage />} />
            <Route path="/url-detection" element={<URLDetector />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;