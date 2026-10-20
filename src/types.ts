
export interface Solution {
  id: string;
  name: string;
  provider: string;
  description: string;
  price: number;
  category: 'Network' | 'Endpoint' | 'Monitoring' | 'Access Control' | 'Vulnerability Management' | 'Incident Response';
  riskMitigation: string[];
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  image: string;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  category: 'Network' | 'Physical' | 'Policy' | 'Legacy Systems' | 'Access Control' | 'Inventory';
  riskInfo?: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  vulnerabilities: string[];
}
