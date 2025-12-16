export interface Grant {
  id: string;
  title: string;
  funder: string;
  description: string;
  awardAmount: {
    min: number;
    max: number;
  };
  deadline: string;
  category: GrantCategory;
  eligibility: EligibilityCriteria;
  sourceUrl: string;
  sourceReliability: 'verified' | 'unverified' | 'official';
  lastUpdated: string;
  scores: GrantScores;
  status: 'new' | 'reviewing' | 'applying' | 'submitted' | 'archived';
}

export type GrantCategory = 
  | 'research' 
  | 'nonprofit' 
  | 'education' 
  | 'technology' 
  | 'healthcare' 
  | 'environment' 
  | 'arts' 
  | 'community';

export interface EligibilityCriteria {
  organizationType: string[];
  geographicRestrictions: string[];
  fundingUse: string[];
  requirements: string[];
  matchingFunds: boolean;
}

export interface GrantScores {
  eligibilityFit: number; // 0-100
  deadlineUrgency: number; // 0-100 (higher = more urgent)
  awardSize: number; // 0-100 (relative to needs)
  effortLevel: number; // 0-100 (higher = easier)
  strategicFit: number; // 0-100
  overallScore: number; // Weighted composite
}

export interface ScoringWeights {
  eligibilityFit: number;
  deadlineUrgency: number;
  awardSize: number;
  effortLevel: number;
  strategicFit: number;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  eligibilityFit: 0.30,
  deadlineUrgency: 0.15,
  awardSize: 0.20,
  effortLevel: 0.15,
  strategicFit: 0.20,
};

export interface FilterState {
  categories: GrantCategory[];
  minAmount: number;
  maxAmount: number;
  deadlineWithin: number; // days
  minScore: number;
  status: Grant['status'][];
}
