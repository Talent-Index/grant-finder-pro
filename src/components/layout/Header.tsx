import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Radar, Bell, Settings, Plus } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b-2 border-foreground bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-foreground flex items-center justify-center">
              <Radar className="w-6 h-6 text-background" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Grant Spotter</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Discovery & Eligibility System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Source
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge 
                className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
