import React, { useState } from 'react';
import { Link, Shield, AlertCircle } from 'lucide-react';
import { ServerResponse, getRiskLevel, riskColors } from '../types/analysis';

const URLDetector: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    probability: number;
    classification: 'phishing' | 'legitimate';
    riskLevel: 'safe' | 'moderate' | 'high';
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: url }),
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
        setError('Failed to analyze URL. Please try again.');
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Analysis failed. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isAnalyzing && url.trim()) {
      handleAnalyze();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Link className="w-6 h-6 text-cyan-600" />
          <h2 className="text-2xl font-semibold text-gray-900">URL Phishing Detection</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter URL to analyze
            </label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError(null);
              }}
              onKeyPress={handleKeyPress}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
            />
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!url.trim() || isAnalyzing}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Analyze URL
              </>
            )}
          </button>
        </div>

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
                    ? '⚠️ Warning: This URL appears to be suspicious. Avoid clicking on it or entering any personal information.'
                    : '✓ This URL appears to be legitimate. However, always exercise caution when browsing unfamiliar websites.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for Safe Browsing</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-cyan-600 mt-1">•</span>
            <span>Always check the URL before clicking on links in emails or messages</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-600 mt-1">•</span>
            <span>Look for HTTPS and a padlock icon in your browser's address bar</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-600 mt-1">•</span>
            <span>Be cautious of URLs with misspellings or unusual domain names</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-600 mt-1">•</span>
            <span>Never enter sensitive information on suspicious websites</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default URLDetector;
