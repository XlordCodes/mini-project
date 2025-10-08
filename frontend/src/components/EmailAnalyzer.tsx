import React, { useState } from 'react';
import { Mail, Shield, Send } from 'lucide-react';
import { ServerResponse, getRiskLevel, riskColors } from '../types/analysis';

const EmailAnalyzer: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<React.ReactNode>(null);

  const handleSendToServer = async () => {
    if (!emailContent.trim()) return;

    setIsSending(true);
    setSendResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: emailContent }),
      });

      if (response.ok) {
        const data: ServerResponse = await response.json();
        const prediction = data.predictions[0];
        const riskLevelFromTypes = getRiskLevel(prediction.probability);
        
        setSendResult(
          <div className={`inline-flex items-center px-3 py-1 rounded-full ${riskColors[riskLevelFromTypes]}`}>
            {`${(prediction.probability * 100).toFixed(1)}% Risk`}
          </div>
        );
      }
    } catch (error) {
      console.error('Failed to analyze:', error);
      setSendResult('Analysis failed. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Email Input Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Email Content Analysis</h2>
        </div>
        
        <div className="space-y-4">
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste your email content here for analysis..."
            className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
          />
          
          <div className="flex gap-4">
            <button
              onClick={handleSendToServer}
              disabled={!emailContent.trim() || isSending}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Analyze Email
                </>
              )}
            </button>
          </div>

          {sendResult && (
            <div className="mt-4">
              {sendResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailAnalyzer;