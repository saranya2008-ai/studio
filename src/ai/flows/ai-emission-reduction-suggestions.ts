'use server';
/**
 * @fileOverview Provides an AI-powered emission reduction tool that generates personalized suggestions.
 *
 * - aiEmissionReductionSuggestions - A function that calculates and provides personalized emission reduction suggestions.
 * - AIEmissionReductionSuggestionsInput - The input type for the aiEmissionReductionSuggestions function.
 * - AIEmissionReductionSuggestionsOutput - The return type for the aiEmissionReductionSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIEmissionReductionSuggestionsInputSchema = z.object({
  transportType: z
    .string()
    .describe(
      'The user\'s primary mode of transport (e.g., "car", "public transport", "bicycle", "plane").'
    ),
  distanceTravelledKm: z
    .number()
    .describe(
      'The estimated average distance travelled per week in kilometers for their primary transport type.'
    ),
  electricityUsageKwh: z
    .number()
    .describe('The estimated average monthly electricity usage in kilowatt-hours (kWh).'),
  foodHabits: z
    .string()
    .describe(
      'A description of the user\'s food habits (e.g., "meat-heavy", "vegetarian", "vegan", "flexitarian").'
    ),
  currentFootprintScore: z
    .number()
    .optional()
    .describe(
      'The user\'s current estimated carbon footprint score in CO2e, if available.'
    ),
});
export type AIEmissionReductionSuggestionsInput = z.infer<
  typeof AIEmissionReductionSuggestionsInputSchema
>;

const AIEmissionReductionSuggestionSchema = z.object({
  category: z
    .string()
    .describe('The category of the suggestion (e.g., "Transport", "Diet", "Energy", "Waste").'),
  recommendation: z
    .string()
    .describe('A specific, actionable recommendation to reduce emissions.'),
  estimatedImpact: z
    .string()
    .describe(
      'An estimated impact of the recommendation (e.g., "High", "Medium", "Low", or a quantitative estimate like "reduces by X kg CO2e/year").'
    ),
});

const AIEmissionReductionSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(AIEmissionReductionSuggestionSchema)
    .describe(
      'An array of personalized suggestions to reduce emissions, categorized by area.'
    ),
});
export type AIEmissionReductionSuggestionsOutput = z.infer<
  typeof AIEmissionReductionSuggestionsOutputSchema
>;

export async function aiEmissionReductionSuggestions(
  input: AIEmissionReductionSuggestionsInput
): Promise<AIEmissionReductionSuggestionsOutput> {
  return aiEmissionReductionSuggestionsFlow(input);
}

const aiEmissionReductionSuggestionsPrompt = ai.definePrompt({
  name: 'aiEmissionReductionSuggestionsPrompt',
  input: {schema: AIEmissionReductionSuggestionsInputSchema},
  output: {schema: AIEmissionReductionSuggestionsOutputSchema},
  prompt: `You are an AI-powered sustainability advisor specialized in helping individuals reduce their carbon footprint.
Your goal is to provide personalized, actionable suggestions to reduce emissions based on the user's current lifestyle.

Here is the user's current carbon footprint profile:
- Primary transport type: {{{transportType}}}
- Estimated weekly distance travelled: {{{distanceTravelledKm}}} km
- Estimated monthly electricity usage: {{{electricityUsageKwh}}} kWh
- Food habits: {{{foodHabits}}}
{{#if currentFootprintScore}}
- Current estimated carbon footprint score: {{{currentFootprintScore}}} CO2e
{{/if}}

Please provide an array of suggestions, categorized by area (e.g., "Transport", "Diet", "Energy", "Waste").
Each suggestion should include:
1.  **category**: The main area of the suggestion.
2.  **recommendation**: A specific, actionable step the user can take.
3.  **estimatedImpact**: An estimation of the potential impact of this recommendation (e.g., "High", "Medium", "Low", or a quantitative estimate if possible like "reduces by X kg CO2e/year").

Ensure the suggestions are practical and directly related to the user's provided habits. Aim for at least 2-3 suggestions per relevant category.`,
});

const aiEmissionReductionSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiEmissionReductionSuggestionsFlow',
    inputSchema: AIEmissionReductionSuggestionsInputSchema,
    outputSchema: AIEmissionReductionSuggestionsOutputSchema,
  },
  async (input) => {
    const {output} = await aiEmissionReductionSuggestionsPrompt(input);
    return output!;
  }
);
