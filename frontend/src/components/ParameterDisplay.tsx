import React from 'react';
import { Info } from 'lucide-react';
import type { EmailParameters } from '../types/analysis';

interface ParameterDisplayProps {
  parameters: EmailParameters;
}

const parameterDescriptions: Record<keyof EmailParameters, string> = {
  Have_IP: 'Presence of IP addresses in URLs instead of domain names',
  Have_At: 'URLs containing "@" symbol, often used to mislead users',
  URL_Length: 'Average length of URLs found in the email content',
  URL_Depth: 'Average depth (number of path segments) of URLs',
  Redirection: 'Number of URL redirections detected',
  https_Domain: 'Percentage of URLs using secure HTTPS protocol',
  TinyURL: 'Presence of URL shortening services',
  'Prefix/Suffix': 'Suspicious prefixes or suffixes in domain names',
  DNS_Record: 'Validity of DNS records for domains',
  Web_Traffic: 'Estimated web traffic ranking of domains',
  Domain_Age: 'Average age of domains in months',
  Domain_End: 'Time until domain expiration in years',
  iFrame: 'Presence of iframe elements in email HTML',
  Mouse_Over: 'JavaScript mouse over events detected',
  Right_Click: 'Right-click event handlers detected',
  Web_Forwards: 'Number of web forwards detected'
};

const ParameterDisplay: React.FC<ParameterDisplayProps> = ({ parameters }) => {
  const getParameterColor = (key: keyof EmailParameters, value: number) => {
    const suspiciousKeys = ['Have_IP', 'Have_At', 'Redirection', 'TinyURL', 'iFrame', 'Mouse_Over', 'Right_Click', 'Web_Forwards'];
    const positiveKeys = ['https_Domain', 'DNS_Record', 'Domain_Age', 'Domain_End'];
    
    if (suspiciousKeys.includes(key)) {
      return value > 0 ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50';
    }
    
    if (positiveKeys.includes(key)) {
      if (key === 'https_Domain' || key === 'DNS_Record') {
        return value >= 1 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
      }
      if (key === 'Domain_Age') {
        return value >= 12 ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50';
      }
      if (key === 'Domain_End') {
        return value >= 1 ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50';
      }
    }
    
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Calculated Parameters</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(parameters).map(([key, value]) => (
          <div
            key={key}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-medium text-gray-900">{key.replace('_', ' ').replace('/', ' / ')}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                getParameterColor(key as keyof EmailParameters, value)
              }`}>
                {value}
              </span>
            </div>
            
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {parameterDescriptions[key as keyof EmailParameters]}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h4 className="font-medium text-gray-900 mb-2">JSON Payload</h4>
        <pre className="text-xs text-gray-600 overflow-x-auto bg-white p-3 rounded border">
          {JSON.stringify(parameters, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ParameterDisplay;