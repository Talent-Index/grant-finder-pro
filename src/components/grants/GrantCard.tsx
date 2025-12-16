import { Grant } from '@/types/grant';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { formatCurrency, getDaysUntilDeadline, getUrgencyLevel } from '@/lib/scoring';
import { ScoreRing } from './ScoreRing';

interface GrantCardProps {
  grant: Grant;
  onViewDetails: (grant: Grant) => void;
}

export function GrantCard({ grant, onViewDetails }: GrantCardProps) {
  const daysUntil = getDaysUntilDeadline(grant.deadline);
  const urgency = getUrgencyLevel(grant.deadline);

  const urgencyConfig = {
    critical: { 
      label: 'Critical', 
      className: 'bg-destructive text-destructive-foreground',
      icon: AlertTriangle 
    },
    high: { 
      label: 'High Priority', 
      className: 'bg-foreground text-background',
      icon: Clock 
    },
    medium: { 
      label: 'Medium', 
      className: 'bg-muted text-muted-foreground border-2 border-foreground',
      icon: Clock 
    },
    low: { 
      label: 'Low', 
      className: 'bg-secondary text-secondary-foreground border-2 border-foreground',
      icon: CheckCircle2 
    },
  };

  const reliabilityConfig = {
    official: { label: 'Official Source', icon: Shield, className: 'text-foreground' },
    verified: { label: 'Verified', icon: CheckCircle2, className: 'text-muted-foreground' },
    unverified: { label: 'Unverified', icon: AlertTriangle, className: 'text-destructive' },
  };

  const statusConfig = {
    new: 'NEW',
    reviewing: 'REVIEWING',
    applying: 'APPLYING',
    submitted: 'SUBMITTED',
    archived: 'ARCHIVED',
  };

  const UrgencyIcon = urgencyConfig[urgency].icon;
  const ReliabilityIcon = reliabilityConfig[grant.sourceReliability].icon;

  return (
    <Card className="border-2 border-foreground shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className="uppercase text-xs font-mono">
                {grant.category}
              </Badge>
              <Badge className={urgencyConfig[urgency].className}>
                <UrgencyIcon className="w-3 h-3 mr-1" />
                {daysUntil}d left
              </Badge>
              <Badge variant="secondary" className="uppercase text-xs">
                {statusConfig[grant.status]}
              </Badge>
            </div>
            <h3 className="font-bold text-lg leading-tight line-clamp-2">
              {grant.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 font-medium">
              {grant.funder}
            </p>
          </div>
          <ScoreRing score={grant.scores.overallScore} size={56} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {grant.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono font-medium">
              {formatCurrency(grant.awardAmount.min)} - {formatCurrency(grant.awardAmount.max)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono">
              {new Date(grant.deadline).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-xs">
            <ReliabilityIcon className={`w-3 h-3 ${reliabilityConfig[grant.sourceReliability].className}`} />
            <span className="text-muted-foreground">
              {reliabilityConfig[grant.sourceReliability].label}
            </span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(grant.sourceUrl, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Source
            </Button>
            <Button 
              size="sm"
              onClick={() => onViewDetails(grant)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
