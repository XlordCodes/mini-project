export interface EmailParameters {
  Have_IP: number;
  Have_At: number;
  URL_Length: number;
  URL_Depth: number;
  Redirection: number;
  https_Domain: number;
  TinyURL: number;
  'Prefix/Suffix': number;
  DNS_Record: number;
  Web_Traffic: number;
  Domain_Age: number;
  Domain_End: number;
  iFrame: number;
  Mouse_Over: number;
  Right_Click: number;
  Web_Forwards: number;
}

export interface AnalysisMetadata {
  urlsFound: number;
  domainsAnalyzed: number;
  contentLength: number;
}

export interface AnalysisResult {
  parameters: EmailParameters;
  metadata: AnalysisMetadata;
}

export interface ServerPrediction {
  class: 'phishing' | 'legitimate';
  probability: number;
}

export interface ServerResponse {
  text: string;
  predictions: ServerPrediction[];
}

export type RiskLevel = 'safe' | 'moderate' | 'high';

export const getRiskLevel = (probability: number): RiskLevel => {
  if (probability < 0.5) return 'safe';
  if (probability < 0.7) return 'moderate';
  return 'high';
};

export const riskColors = {
  safe: 'text-green-600 bg-green-50 border-green-200',
  moderate: 'text-orange-600 bg-orange-50 border-orange-200',
  high: 'text-red-600 bg-red-50 border-red-200'
} as const;