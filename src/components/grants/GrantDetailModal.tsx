import { Grant } from '@/types/grant';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  MapPin, 
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { formatCurrency, getDaysUntilDeadline, getUrgencyLevel } from '@/lib/scoring';
import { ScoreBreakdown } from './ScoreBreakdown';

interface GrantDetailModalProps {
  grant: Grant | null;
  open: boolean;
  onClose: () => void;
}

export function GrantDetailModal({ grant, open, onClose }: GrantDetailModalProps) {
  if (!grant) return null;

  const daysUntil = getDaysUntilDeadline(grant.deadline);
  const urgency = getUrgencyLevel(grant.deadline);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-foreground">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="outline" className="uppercase text-xs font-mono">
              {grant.category}
            </Badge>
            <Badge 
              variant={urgency === 'critical' ? 'destructive' : 'secondary'}
              className="uppercase text-xs"
            >
              <Clock className="w-3 h-3 mr-1" />
              {daysUntil} days left
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold leading-tight">
            {grant.title}
          </DialogTitle>
          <p className="text-muted-foreground font-medium">{grant.funder}</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <p className="text-sm leading-relaxed">{grant.description}</p>

          <div className="grid grid-cols-2 gap-4 p-4 bg-secondary border-2 border-foreground">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                <DollarSign className="w-3 h-3" />
                Award Range
              </div>
              <p className="font-mono font-bold">
                {formatCurrency(grant.awardAmount.min)} - {formatCurrency(grant.awardAmount.max)}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase text-muted-foreground">
                <Calendar className="w-3 h-3" />
                Deadline
              </div>
              <p className="font-mono font-bold">
                {new Date(grant.deadline).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-bold uppercase text-sm tracking-wide">Eligibility</h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Building2 className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-muted-foreground">Organization Types: </span>
                  <span className="font-medium">
                    {grant.eligibility.organizationType.join(', ')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-muted-foreground">Geographic: </span>
                  <span className="font-medium">
                    {grant.eligibility.geographicRestrictions.join(', ')}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-muted-foreground">Funding Use: </span>
                  <span className="font-medium">
                    {grant.eligibility.fundingUse.join(', ')}
                  </span>
                </div>
              </div>

              {grant.eligibility.matchingFunds && (
                <div className="flex items-center gap-2 p-2 bg-muted border border-foreground">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs uppercase font-medium">
                    Matching funds required
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase text-muted-foreground">Requirements:</span>
              <ul className="text-sm space-y-1">
                {grant.eligibility.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator />

          <ScoreBreakdown scores={grant.scores} />

          <Separator />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Last updated: {new Date(grant.lastUpdated).toLocaleDateString()}
            </span>
            <span className="uppercase">
              Source: {grant.sourceReliability}
            </span>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open(grant.sourceUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Original Source
            </Button>
            <Button className="flex-1">
              Start Application
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
