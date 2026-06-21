
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf, Car, Zap, Utensils, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FootprintInput } from "@/lib/carbon-utils";

const formSchema = z.object({
  transportType: z.string().min(1, "Please select a transport type"),
  distanceTravelledKm: z.coerce.number().min(0, "Distance must be positive"),
  electricityUsageKwh: z.coerce.number().min(0, "Usage must be positive"),
  foodHabits: z.string().min(1, "Please select food habits"),
});

interface IntakeFormProps {
  onCalculate: (data: FootprintInput) => void;
  isSubmitting?: boolean;
}

export function IntakeForm({ onCalculate, isSubmitting }: IntakeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transportType: "car",
      distanceTravelledKm: 50,
      electricityUsageKwh: 200,
      foodHabits: "flexitarian",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onCalculate(values);
  }

  return (
    <Card className="border-primary/20 bg-card shadow-lg animate-fade-in overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Leaf className="w-24 h-24 text-primary" />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-headline flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          Sustainability Intake
        </CardTitle>
        <CardDescription>
          Enter your lifestyle details to analyze your carbon footprint.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="transportType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-accent" /> Primary Transport
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue placeholder="Select transport" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="car">Personal Car (Gasoline)</SelectItem>
                        <SelectItem value="public_transport">Public Transport</SelectItem>
                        <SelectItem value="bicycle">Bicycle</SelectItem>
                        <SelectItem value="plane">Frequent Flyer</SelectItem>
                        <SelectItem value="walking">Walking</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="distanceTravelledKm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-accent" /> Weekly Distance (km)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="bg-secondary/50 border-border" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="electricityUsageKwh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" /> Monthly Electricity (kWh)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="bg-secondary/50 border-border" />
                    </FormControl>
                    <FormDescription>Average household consumption.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foodHabits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-accent" /> Dietary Profile
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue placeholder="Select diet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="meat-heavy">Meat-heavy Diet</SelectItem>
                        <SelectItem value="flexitarian">Flexitarian (Mixed)</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Analyzing Data..."
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Calculate Footprint
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
