
import { Match } from "@/types"
import { z } from "zod"

// Define a Zod schema for match validation
export const matchSchema = z.object({
  date: z.string().min(1, "Date is required"),
  home_team: z.string().min(1, "Home team is required"),
  away_team: z.string().min(1, "Away team is required"),
  home_score: z.number().int().min(0, "Home score must be a non-negative integer"),
  away_score: z.number().int().min(0, "Away score must be a non-negative integer"),
  ht_home_score: z.number().int().min(0, "Half-time home score must be a non-negative integer"),
  ht_away_score: z.number().int().min(0, "Half-time away score must be a non-negative integer"),
  round: z.union([z.string(), z.number()]).optional(),
  venue: z.string().optional(),
  referee: z.string().optional(),
  id: z.string().optional(),
});

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  match?: Match;
}

export function validateMatch(data: any): ValidationResult {
  try {
    const match = matchSchema.parse(data);
    return { 
      valid: true, 
      errors: [], 
      match 
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => {
        const path = err.path.join('.');
        return `${path}: ${err.message}`;
      });
      return { 
        valid: false, 
        errors 
      };
    }
    return { 
      valid: false, 
      errors: ['Unknown validation error'] 
    };
  }
}

export function validateMatches(matchesData: any[]): {
  validMatches: Match[];
  invalidMatches: { data: any; errors: string[] }[];
} {
  const validMatches: Match[] = [];
  const invalidMatches: { data: any; errors: string[] }[] = [];

  for (const data of matchesData) {
    const result = validateMatch(data);
    if (result.valid && result.match) {
      validMatches.push(result.match);
    } else {
      invalidMatches.push({
        data,
        errors: result.errors
      });
    }
  }

  return { validMatches, invalidMatches };
}
