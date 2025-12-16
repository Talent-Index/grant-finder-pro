import { FilterState, GrantCategory } from '@/types/grant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { X, Filter } from 'lucide-react';

interface GrantFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const CATEGORIES: GrantCategory[] = [
  'research',
  'nonprofit',
  'education',
  'technology',
  'healthcare',
  'environment',
  'arts',
  'community',
];

export function GrantFilters({ filters, onFiltersChange, onReset }: GrantFiltersProps) {
  const toggleCategory = (category: GrantCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    (filters.minScore > 0 ? 1 : 0) + 
    (filters.deadlineWithin < 365 ? 1 : 0);

  return (
    <div className="border-2 border-foreground p-4 space-y-5 bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <h3 className="font-bold uppercase text-sm tracking-wide">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="font-mono text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          <X className="w-3 h-3 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Categories
        </Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={filters.categories.includes(category) ? 'default' : 'outline'}
              className="cursor-pointer uppercase text-xs"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Deadline Within: {filters.deadlineWithin} days
        </Label>
        <Slider
          value={[filters.deadlineWithin]}
          onValueChange={([value]) =>
            onFiltersChange({ ...filters, deadlineWithin: value })
          }
          min={7}
          max={365}
          step={7}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Minimum Score: {filters.minScore}
        </Label>
        <Slider
          value={[filters.minScore]}
          onValueChange={([value]) =>
            onFiltersChange({ ...filters, minScore: value })
          }
          min={0}
          max={100}
          step={5}
          className="py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">
            Min Award
          </Label>
          <Input
            type="number"
            value={filters.minAmount}
            onChange={(e) =>
              onFiltersChange({ ...filters, minAmount: Number(e.target.value) })
            }
            placeholder="0"
            className="font-mono"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">
            Max Award
          </Label>
          <Input
            type="number"
            value={filters.maxAmount}
            onChange={(e) =>
              onFiltersChange({ ...filters, maxAmount: Number(e.target.value) })
            }
            placeholder="No limit"
            className="font-mono"
          />
        </div>
      </div>
    </div>
  );
}
