import React, { useState } from 'react';
import { Mail, Shield, AlertCircle } from 'lucide-react';
import { ServerResponse, getRiskLevel, riskColors } from '../types/analysis';

const EmailAnalyzer: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{
    probability: number;
    classification: 'phishing' | 'legitimate';
    riskLevel: 'safe' | 'moderate' | 'high';
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendToServer = async () => {
    if (!emailContent.trim()) return;

    setIsSending(true);
    setError(null);
    setResult(null);

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
        const riskLevel = getRiskLevel(prediction.probability);

        setResult({
          probability: prediction.probability,
          classification: prediction.class,
          riskLevel,
        });
      } else {
        setError('Failed to analyze email. Please try again.');
      }
    } catch (err) {
      console.error('Failed to analyze:', err);
      setError('Analysis failed. Please check your connection and try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Email Content Analysis</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="email-content" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your email content below
            </label>
            <textarea
              id="email-content"
              value={emailContent}
              onChange={(e) => {
                setEmailContent(e.target.value);
                setError(null);
              }}
              placeholder="Paste your email content here for analysis..."
              className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
            />
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

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

          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className={`px-4 py-2 rounded-full font-semibold ${riskColors[result.riskLevel]}`}>
                    {result.riskLevel.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Classification:</span>
                  <span className={`px-4 py-2 rounded-full font-semibold ${
                    result.classification === 'phishing'
                      ? 'text-red-600 bg-red-50 border-red-200'
                      : 'text-green-600 bg-green-50 border-green-200'
                  }`}>
                    {result.classification.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phishing Probability:</span>
                  <span className="font-semibold text-gray-900">
                    {(result.probability * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    {result.classification === 'phishing'
                      ? '⚠️ Warning: This email appears to be suspicious. Do not click on any links or provide personal information.'
                      : '✓ This email appears to be legitimate. However, always exercise caution with unexpected emails.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for Identifying Phishing Emails</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Check the sender's email address carefully for misspellings or suspicious domains</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Be wary of urgent requests for personal information or financial details</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Hover over links before clicking to verify the destination URL</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Look for grammar mistakes or unusual formatting in the email content</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmailAnalyzer;