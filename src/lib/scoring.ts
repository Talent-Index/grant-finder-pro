import { Grant, ScoringWeights, DEFAULT_WEIGHTS } from '@/types/grant';

export function calculateOverallScore(
  scores: Omit<Grant['scores'], 'overallScore'>,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): number {
  const weighted =
    scores.eligibilityFit * weights.eligibilityFit +
    scores.deadlineUrgency * weights.deadlineUrgency +
    scores.awardSize * weights.awardSize +
    scores.effortLevel * weights.effortLevel +
    scores.strategicFit * weights.strategicFit;

  return Math.round(weighted);
}

export function getUrgencyLevel(deadline: string): 'critical' | 'high' | 'medium' | 'low' {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil <= 7) return 'critical';
  if (daysUntil <= 21) return 'high';
  if (daysUntil <= 45) return 'medium';
  return 'low';
}

export function getDaysUntilDeadline(deadline: string): number {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Fair';
  return 'Low';
}

export function sortGrantsByScore(grants: Grant[]): Grant[] {
  return [...grants].sort((a, b) => b.scores.overallScore - a.scores.overallScore);
}

export function sortGrantsByDeadline(grants: Grant[]): Grant[] {
  return [...grants].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
}
