import { ValidationRule, ValidationResult, APPIValidationRule } from './types';

// Helper: Get APPI deviation limit based on aspect ratio
function getAppiDeviationLimit(aspectRatio: number): number {
  if (aspectRatio <= 5) return 20;
  if (aspectRatio <= 6) return 15;
  if (aspectRatio <= 6.5) return 10;
  return 10; // >6.5
}

// Helper: Suggest correction loops (simple logic: 1 loop ≈ 10mm)
function suggestCorrectionLoops(deviation: number): number {
  return Math.round(deviation / 10);
}

// APPI Trim Validation Rule (per group)
export const appiTrimRule: APPIValidationRule = {
  id: 'APPI_TRIM',
  name: 'APPI Trim Check',
  description: 'Validates trim using APPI methodology (aspect-ratio-based, group differentials, correction loops)',
  category: 'safety',
  severity: 'critical',
  appiReference: 'APPI-TRIM-001',
  manufacturerSpecific: false,
  requiresTechnicianInput: true,
  validate: async (data: unknown): Promise<ValidationResult> => {
    const context = data as {
      aspectRatio: number;
      groups: Array<{
        name: string; // e.g. G1, G2, G3, ST
        measured: { A: number; B: number; C: number };
        manufacturer: { A: number; B: number; C: number };
      }>;
    };
    const { aspectRatio, groups } = context;
    const limit = getAppiDeviationLimit(aspectRatio);
    let hasError = false;
    const results: string[] = [];
    const corrections: Record<string, { AB: number; AC: number; loopsA: number; loopsB: number; loopsC: number }> = {};

    for (const group of groups) {
      // Calculate deviation for each line
      const devA = group.measured.A - group.manufacturer.A;
      const devB = group.measured.B - group.manufacturer.B;
      const devC = group.measured.C - group.manufacturer.C;
      // Calculate differentials
      const diffAB = devA - devB;
      const diffAC = devA - devC;
      // Correction suggestion (bring B/C to A)
      const loopsA = 0;
      const loopsB = suggestCorrectionLoops(diffAB);
      const loopsC = suggestCorrectionLoops(diffAC);
      corrections[group.name] = { AB: diffAB, AC: diffAC, loopsA, loopsB, loopsC };
      // Validation
      if (Math.abs(diffAB) > limit || Math.abs(diffAC) > limit) {
        hasError = true;
        results.push(
          `${group.name}: Differential out of tolerance (A-B: ${diffAB}mm, A-C: ${diffAC}mm, limit: ±${limit}mm)`
        );
      } else {
        results.push(
          `${group.name}: Differential OK (A-B: ${diffAB}mm, A-C: ${diffAC}mm, limit: ±${limit}mm)`
        );
      }
    }

    return {
      status: hasError ? 'fail' : 'pass',
      message: results.join('\n'),
      details: { corrections },
      timestamp: new Date(),
    };
  },
};

export const appiRules: ValidationRule[] = [
  appiTrimRule,
]; 