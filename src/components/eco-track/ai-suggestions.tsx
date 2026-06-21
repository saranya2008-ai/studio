
"use client";

import { AIEmissionReductionSuggestionsOutput } from "@/ai/flows/ai-emission-reduction-suggestions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Zap, Utensils, Car, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AISuggestionsProps {
  suggestions: AIEmissionReductionSuggestionsOutput;
}

const CategoryIcon = ({ category }: { category: string }) => {
  const c = category.toLowerCase();
  if (c.includes("transport")) return <Car className="w-5 h-5 text-accent" />;
  if (c.includes("energy") || c.includes("electricity")) return <Zap className="w-5 h-5 text-primary" />;
  if (c.includes("diet") || c.includes("food")) return <Utensils className="w-5 h-5 text-chart-3" />;
  return <Trash2 className="w-5 h-5 text-muted-foreground" />;
};

export function AISuggestions({ suggestions }: AISuggestionsProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-headline text-foreground">AI Intelligence Report</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.suggestions.map((suggestion, idx) => (
          <Card key={idx} className="bg-card border-border hover:border-primary/40 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <CategoryIcon category={suggestion.category} />
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {suggestion.category}
                </CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px] bg-secondary border-border uppercase tracking-wider">
                Impact: {suggestion.estimatedImpact}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium leading-relaxed mb-4">
                {suggestion.recommendation}
              </p>
              <div className="flex items-center text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Actionable Step <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
