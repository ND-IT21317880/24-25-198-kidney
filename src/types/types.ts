import { z } from "zod";
export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age must be a positive number"),
  scr: z.number().min(0, "Serum Creatinine must be a positive number"),
  eGFR: z.number().min(0, "eGFR must be a positive number"),
});

// Define the CKDu stage type
export type CKDuStage =
  | "Stage 1"
  | "Stage 2"
  | "Stage 3a"
  | "Stage 3b"
  | "Stage 4"
  | "Stage 5";

// Define the prevention strategies type
export type PreventionStrategies = {
  [key in CKDuStage]: string[];
};
export type CKDProfile = {
  stage: string;
  educationYrs: number;
  herbicideUsageHistory: number;
  appliedHerbicideV1: number;
  ppeUsageScoreSeverity: number;
  wellWaterHx: number;
  naturalWaterDrinkingV1: number;
  exhausionV5: number;
  exhausionSeverityV5: number;
  jointPainV2: number;
  naV3: number;
  kV3: number;
  kV4: number;
  kV5: number;
  hbV1: number;
  hbV2: number;
  hbV3: number;
  hbV4: number;
  hbV5: number;
  hbV6: number;
  uAcidV1: number;
  uAcidV3: number;
  uAcidV4: number;
  uAcidV5: number;
  uProteinV2: number;
  uProteinV3: number;
  uProteinV6: number;
  conductivity: number;
  bePpm: number;
};
export type ApiResponse = {
  prediction: string[];
};
