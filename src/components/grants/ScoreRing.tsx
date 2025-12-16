interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreRing({ score, size = 48, strokeWidth = 4 }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'hsl(var(--foreground))';
    if (score >= 65) return 'hsl(var(--muted-foreground))';
    if (score >= 50) return 'hsl(var(--muted-foreground) / 0.7)';
    return 'hsl(var(--destructive))';
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getScoreColor(score)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="square"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono font-bold text-sm">{score}</span>
      </div>
    </div>
  );
}
