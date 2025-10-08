import React from 'react';
import EmailAnalyzer from './components/EmailAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Email Security Analysis Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paste your email content below to analyze potential phishing indicators and security parameters
          </p>
        </div>
        <EmailAnalyzer />
      </div>
    </div>
  );
}

export default App;