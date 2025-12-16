import { Header } from '@/components/layout/Header';
import { DashboardStats } from '@/components/grants/DashboardStats';
import { GrantList } from '@/components/grants/GrantList';
import { mockGrants } from '@/data/mockGrants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle2, Archive } from 'lucide-react';

const Index = () => {
  const activeGrants = mockGrants.filter(g => g.status !== 'archived');
  const archivedGrants = mockGrants.filter(g => g.status === 'archived');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <section>
          <h2 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
            Overview
          </h2>
          <DashboardStats grants={mockGrants} />
        </section>

        <section className="pt-4">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="border-2 border-foreground p-0 h-auto bg-transparent">
              <TabsTrigger 
                value="all" 
                className="rounded-none data-[state=active]:bg-foreground data-[state=active]:text-background px-4 py-2"
              >
                <FileText className="w-4 h-4 mr-2" />
                All Grants
              </TabsTrigger>
              <TabsTrigger 
                value="urgent" 
                className="rounded-none data-[state=active]:bg-foreground data-[state=active]:text-background px-4 py-2 border-l-2 border-foreground"
              >
                <Clock className="w-4 h-4 mr-2" />
                Urgent
              </TabsTrigger>
              <TabsTrigger 
                value="in-progress" 
                className="rounded-none data-[state=active]:bg-foreground data-[state=active]:text-background px-4 py-2 border-l-2 border-foreground"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                In Progress
              </TabsTrigger>
              <TabsTrigger 
                value="archived" 
                className="rounded-none data-[state=active]:bg-foreground data-[state=active]:text-background px-4 py-2 border-l-2 border-foreground"
              >
                <Archive className="w-4 h-4 mr-2" />
                Archived
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <GrantList grants={activeGrants} />
            </TabsContent>

            <TabsContent value="urgent">
              <GrantList 
                grants={activeGrants.filter(g => {
                  const daysUntil = Math.ceil(
                    (new Date(g.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );
                  return daysUntil <= 21;
                })} 
              />
            </TabsContent>

            <TabsContent value="in-progress">
              <GrantList 
                grants={activeGrants.filter(g => 
                  g.status === 'reviewing' || g.status === 'applying'
                )} 
              />
            </TabsContent>

            <TabsContent value="archived">
              <GrantList grants={archivedGrants} />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="border-t-2 border-foreground mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>
              Last sync: {new Date().toLocaleString()} · {mockGrants.length} grants indexed
            </p>
            <p className="uppercase tracking-wide">
              Grant Spotter v1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
