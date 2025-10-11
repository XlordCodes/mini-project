import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Link, Shield, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Security Analysis Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Protect yourself from phishing attacks with our advanced analysis tools. Choose a service below to get started.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            onClick={() => navigate('/email-analysis')}
            className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Email Analysis
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Paste your email content to analyze potential phishing indicators, suspicious links, and security risks.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">Phishing Detection</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">Link Analysis</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">Risk Assessment</span>
            </div>
          </div>

          <div
            onClick={() => navigate('/url-detection')}
            className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center group-hover:bg-cyan-200 transition-colors duration-300">
                <Link className="w-8 h-8 text-cyan-600" />
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-cyan-600 group-hover:translate-x-2 transition-all duration-300" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              URL Phishing Detection
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Check if a URL is safe or potentially malicious. Get instant analysis of suspicious links and phishing attempts.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">URL Scanning</span>
              <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">Instant Results</span>
              <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">Safe Browsing</span>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Powered by advanced machine learning models</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
