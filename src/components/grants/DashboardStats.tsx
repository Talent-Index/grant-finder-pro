import { Grant } from '@/types/grant';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  FileText,
  Target
} from 'lucide-react';
import { formatCurrency, getDaysUntilDeadline } from '@/lib/scoring';

interface DashboardStatsProps {
  grants: Grant[];
}

export function DashboardStats({ grants }: DashboardStatsProps) {
  const urgentGrants = grants.filter(g => getDaysUntilDeadline(g.deadline) <= 14);
  const highScoreGrants = grants.filter(g => g.scores.overallScore >= 75);
  const totalPotentialFunding = grants.reduce(
    (sum, g) => sum + g.awardAmount.max,
    0
  );
  const avgScore = Math.round(
    grants.reduce((sum, g) => sum + g.scores.overallScore, 0) / grants.length
  );
  const newGrants = grants.filter(g => g.status === 'new');
  const applyingGrants = grants.filter(g => g.status === 'applying');

  const stats = [
    {
      label: 'Total Grants',
      value: grants.length,
      icon: FileText,
      subtext: `${newGrants.length} new`,
    },
    {
      label: 'Urgent Deadlines',
      value: urgentGrants.length,
      icon: AlertTriangle,
      subtext: 'Within 14 days',
      highlight: urgentGrants.length > 0,
    },
    {
      label: 'High Match',
      value: highScoreGrants.length,
      icon: Target,
      subtext: 'Score ≥75',
    },
    {
      label: 'Avg Score',
      value: avgScore,
      icon: TrendingUp,
      subtext: 'Across all grants',
    },
    {
      label: 'In Progress',
      value: applyingGrants.length,
      icon: Clock,
      subtext: 'Applications',
    },
    {
      label: 'Potential Funding',
      value: formatCurrency(totalPotentialFunding),
      icon: DollarSign,
      subtext: 'Maximum available',
      isLarge: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat) => (
        <Card 
          key={stat.label} 
          className={`border-2 border-foreground ${stat.highlight ? 'bg-destructive/10' : ''}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className={`font-mono font-bold ${stat.isLarge ? 'text-lg' : 'text-2xl'}`}>
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
