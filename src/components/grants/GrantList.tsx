import { useState, useMemo } from 'react';
import { Grant, FilterState } from '@/types/grant';
import { GrantCard } from './GrantCard';
import { GrantFilters } from './GrantFilters';
import { GrantDetailModal } from './GrantDetailModal';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { getDaysUntilDeadline, sortGrantsByScore, sortGrantsByDeadline } from '@/lib/scoring';

interface GrantListProps {
  grants: Grant[];
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  minAmount: 0,
  maxAmount: Infinity,
  deadlineWithin: 365,
  minScore: 0,
  status: [],
};

type SortOption = 'score' | 'deadline' | 'amount';

export function GrantList({ grants }: GrantListProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedGrants = useMemo(() => {
    let result = grants.filter((grant) => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(grant.category)) {
        return false;
      }
      
      // Amount filter
      if (grant.awardAmount.max < filters.minAmount) return false;
      if (filters.maxAmount !== Infinity && grant.awardAmount.min > filters.maxAmount) {
        return false;
      }
      
      // Deadline filter
      const daysUntil = getDaysUntilDeadline(grant.deadline);
      if (daysUntil > filters.deadlineWithin) return false;
      
      // Score filter
      if (grant.scores.overallScore < filters.minScore) return false;
      
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'score':
        result = sortGrantsByScore(result);
        break;
      case 'deadline':
        result = sortGrantsByDeadline(result);
        break;
      case 'amount':
        result = [...result].sort(
          (a, b) => b.awardAmount.max - a.awardAmount.max
        );
        break;
    }

    return result;
  }, [grants, filters, sortBy]);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      <aside className="space-y-4">
        <GrantFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
      </aside>

      <main className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-mono font-bold text-foreground">
              {filteredAndSortedGrants.length}
            </span>{' '}
            grants found
          </p>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[140px] h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Best Match</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="amount">Award Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex border-2 border-foreground">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="rounded-none border-l-2 border-foreground"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {filteredAndSortedGrants.length === 0 ? (
          <div className="border-2 border-dashed border-muted-foreground p-12 text-center">
            <p className="text-muted-foreground">No grants match your filters</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setFilters(DEFAULT_FILTERS)}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid md:grid-cols-2 gap-4'
              : 'space-y-4'
          }>
            {filteredAndSortedGrants.map((grant) => (
              <GrantCard
                key={grant.id}
                grant={grant}
                onViewDetails={setSelectedGrant}
              />
            ))}
          </div>
        )}
      </main>

      <GrantDetailModal
        grant={selectedGrant}
        open={!!selectedGrant}
        onClose={() => setSelectedGrant(null)}
      />
    </div>
  );
}
