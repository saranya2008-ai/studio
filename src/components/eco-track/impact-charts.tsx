
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FootprintResult } from "@/lib/carbon-utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ImpactChartsProps {
  data: FootprintResult;
}

export function ImpactCharts({ data }: ImpactChartsProps) {
  const pieData = [
    { name: "Transport", value: data.transportScore, color: "hsl(var(--primary))" },
    { name: "Energy", value: data.energyScore, color: "hsl(var(--accent))" },
    { name: "Diet", value: data.dietScore, color: "hsl(var(--chart-3))" },
  ];

  const barData = [
    { name: "You", value: parseFloat(data.annualScore.toFixed(2)) },
    { name: "Global Avg", value: 4.8 },
    { name: "Target (2030)", value: 2.5 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-lg font-headline">Emission Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                itemStyle={{ color: 'white' }}
              />
              <Legend verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-lg font-headline">Annual Score Comparison</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 30, top: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" horizontal={false} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {barData.map((entry, index) => (
                  <Cell 
                    key={`bar-${index}`} 
                    fill={entry.name === 'You' ? 'hsl(var(--primary))' : 'hsl(var(--muted))'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
