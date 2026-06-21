
"use client";

import { useState } from "react";
import { IntakeForm } from "@/components/eco-track/intake-form";
import { ImpactCharts } from "@/components/eco-track/impact-charts";
import { AISuggestions } from "@/components/eco-track/ai-suggestions";
import { calculateCarbonFootprint, FootprintInput, FootprintResult } from "@/lib/carbon-utils";
import { aiEmissionReductionSuggestions } from "@/ai/flows/ai-emission-reduction-suggestions";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TreePine, Info, Github, Globe, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EcoTrack() {
  const [result, setResult] = useState<FootprintResult | null>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCalculate = async (input: FootprintInput) => {
    setIsAnalyzing(true);
    const calcResult = calculateCarbonFootprint(input);
    setResult(calcResult);

    try {
      const aiResponse = await aiEmissionReductionSuggestions({
        ...input,
        currentFootprintScore: calcResult.annualScore
      });
      setSuggestions(aiResponse);
    } catch (error) {
      console.error("AI flow error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 group">
            <TreePine className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
            <h1 className="text-4xl font-headline font-bold tracking-tight text-primary">EcoTrack</h1>
          </div>
          <p className="text-muted-foreground max-w-lg text-lg">
            Personal carbon intelligence platform. Measure, analyze, and offset your environmental impact with data-driven AI.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 border-border bg-card">
            <Globe className="w-4 h-4" /> Global Benchmarks
          </Button>
          <Button variant="outline" size="icon" className="border-border bg-card">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Intake */}
        <div className="lg:col-span-5 space-y-6">
          <IntakeForm onCalculate={handleCalculate} isSubmitting={isAnalyzing} />
          <Card className="bg-secondary/20 border-border border-dashed">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                EcoTrack uses standard IPCC emission factors to estimate your CO2e. This data is for awareness and educational purposes.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
        <div className="lg:col-span-7 space-y-8 min-h-[600px]">
          {result ? (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-primary/5 border-primary/20 glow-mint overflow-hidden relative">
                  <div className="absolute -right-4 -bottom-4 opacity-5">
                    <TreePine className="w-32 h-32 text-primary" />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-1">Annual Footprint</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-headline font-bold">{result.annualScore.toFixed(1)}</span>
                      <span className="text-muted-foreground font-medium">tons CO2e</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent/5 border-accent/20 glow-azure overflow-hidden relative">
                  <CardContent className="p-6">
                    <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-1">Monthly Equivalent</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-headline font-bold">{result.totalScore.toFixed(0)}</span>
                      <span className="text-muted-foreground font-medium">kg CO2e</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <ImpactCharts data={result} />
              
              <Separator className="bg-border/50" />

              {suggestions ? (
                <AISuggestions suggestions={suggestions} />
              ) : (
                <div className="h-40 flex flex-col items-center justify-center gap-4 border border-dashed border-border rounded-xl">
                  <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-muted-foreground text-sm font-medium">Generating AI Recommendations...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6 bg-card/20 border border-border rounded-2xl border-dashed">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full" />
                <Globe className="w-20 h-20 text-muted-foreground/30 relative z-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-headline font-semibold">Awaiting Your Input</h3>
                <p className="text-muted-foreground max-w-md">
                  Complete the sustainability form to unlock your impact dashboard and personalized AI strategies.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-12 pb-6 border-t border-border mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <TreePine className="w-5 h-5 text-primary" />
            <span className="font-headline font-bold text-lg">EcoTrack</span>
            <span className="text-muted-foreground text-sm ml-4">© 2024 Eco-Sustainability Initiative</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium">
              <Info className="w-4 h-4" /> Methodology
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium">
              <Github className="w-4 h-4" /> Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
