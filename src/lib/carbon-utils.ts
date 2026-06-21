
/**
 * Average CO2e emission factors (kg CO2e per unit)
 */
export const EMISSION_FACTORS = {
  transport: {
    car: 0.192, // kg CO2e per km
    public_transport: 0.041, // kg CO2e per km
    bicycle: 0,
    plane: 0.255, // kg CO2e per km (short/medium haul average)
    walking: 0,
  },
  electricity: 0.475, // kg CO2e per kWh (global average mix)
  diet: {
    'meat-heavy': 7.19, // kg CO2e per day
    vegetarian: 3.81, // kg CO2e per day
    vegan: 2.89, // kg CO2e per day
    flexitarian: 4.67, // kg CO2e per day
  },
};

export interface FootprintInput {
  transportType: string;
  distanceTravelledKm: number;
  electricityUsageKwh: number;
  foodHabits: string;
}

export interface FootprintResult {
  transportScore: number; // monthly kg CO2e
  energyScore: number;    // monthly kg CO2e
  dietScore: number;      // monthly kg CO2e
  totalScore: number;     // monthly kg CO2e
  annualScore: number;    // annual tons CO2e
}

export function calculateCarbonFootprint(input: FootprintInput): FootprintResult {
  const transportFactor = EMISSION_FACTORS.transport[input.transportType as keyof typeof EMISSION_FACTORS.transport] || 0;
  const transportScore = transportFactor * input.distanceTravelledKm * 4.33; // weekly to monthly

  const energyScore = input.electricityUsageKwh * EMISSION_FACTORS.electricity;

  const dietFactor = EMISSION_FACTORS.diet[input.foodHabits as keyof typeof EMISSION_FACTORS.diet] || 0;
  const dietScore = dietFactor * 30.42; // daily to monthly

  const totalScore = transportScore + energyScore + dietScore;
  const annualScore = (totalScore * 12) / 1000; // kg to metric tons

  return {
    transportScore,
    energyScore,
    dietScore,
    totalScore,
    annualScore,
  };
}
