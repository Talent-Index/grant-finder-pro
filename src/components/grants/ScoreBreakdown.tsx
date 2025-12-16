import { Grant } from '@/types/grant';
import { DEFAULT_WEIGHTS } from '@/types/grant';
import { Progress } from '@/components/ui/progress';

interface ScoreBreakdownProps {
  scores: Grant['scores'];
}

export function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  const scoreItems = [
    { 
      label: 'Eligibility Fit', 
      value: scores.eligibilityFit, 
      weight: DEFAULT_WEIGHTS.eligibilityFit,
      description: 'How well you match requirements'
    },
    { 
      label: 'Deadline Urgency', 
      value: scores.deadlineUrgency, 
      weight: DEFAULT_WEIGHTS.deadlineUrgency,
      description: 'Time sensitivity factor'
    },
    { 
      label: 'Award Size', 
      value: scores.awardSize, 
      weight: DEFAULT_WEIGHTS.awardSize,
      description: 'Relative to funding needs'
    },
    { 
      label: 'Effort Level', 
      value: scores.effortLevel, 
      weight: DEFAULT_WEIGHTS.effortLevel,
      description: 'Application complexity (higher = easier)'
    },
    { 
      label: 'Strategic Fit', 
      value: scores.strategicFit, 
      weight: DEFAULT_WEIGHTS.strategicFit,
      description: 'Alignment with organizational goals'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b-2 border-foreground pb-3">
        <h4 className="font-bold uppercase text-sm tracking-wide">Score Breakdown</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase">Overall</span>
          <span className="font-mono font-bold text-2xl">{scores.overallScore}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {scoreItems.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground ml-2 text-xs">
                  ({Math.round(item.weight * 100)}%)
                </span>
              </div>
              <span className="font-mono font-bold">{item.value}</span>
            </div>
            <Progress value={item.value} className="h-2" />
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
