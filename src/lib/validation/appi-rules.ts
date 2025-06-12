import { ValidationRule, ValidationResult, APPIValidationRule } from './types';

// Helper: Get APPI deviation limit based on aspect ratio
function getAppiDeviationLimit(aspectRatio: number): number {
  if (aspectRatio <= 5) return 20;
  if (aspectRatio <= 6) return 15;
  if (aspectRatio <= 6.5) return 10;
  return 10; // >6.5
}

// Helper: Suggest correction loops (simple logic: 1 loop ≈ 10mm)
function suggestCorrectionLoops(diff: number): number {
  // 1 loop ≈ 10mm, always round up, never negative
  return Math.max(0, Math.round(diff / 10));
}

// APPI Trim Validation Rule (per group)
export const appiTrimRule: APPIValidationRule = {
  id: 'APPI_TRIM',
  name: 'APPI Trim Check',
  description: 'Validates trim using APPI methodology (aspect-ratio-based, group differentials, correction loops, dynamic reference line)',
  category: 'safety',
  severity: 'critical',
  appiReference: 'APPI-TRIM-001',
  manufacturerSpecific: false,
  requiresTechnicianInput: true,
  validate: async (data: unknown): Promise<ValidationResult> => {
    const context = data as {
      aspectRatio: number;
      groups: Array<{
        name: string;
        measured: Record<string, number>; // e.g. { A: 7295, B: 7265, C: 7265 }
        manufacturer: Record<string, number>;
      }>;
    };
    const { aspectRatio, groups } = context;
    const limit = getAppiDeviationLimit(aspectRatio);
    let hasError = false;
    const results: string[] = [];
    const corrections: Record<string, Record<string, number>> = {};
    const differentials: Record<string, Record<string, number>> = {};

    for (const group of groups) {
      // Find the shortest line (reference)
      const lineNames = Object.keys(group.measured);
      const measuredEntries = Object.entries(group.measured);
      const referenceEntry = measuredEntries.reduce((min, curr) => (curr[1] < min[1] ? curr : min));
      const referenceLine = referenceEntry[0];
      const referenceValue = referenceEntry[1];

      // Correction: for each line, how much to shorten to match reference
      corrections[group.name] = {};
      for (const [line, value] of measuredEntries) {
        if (line === referenceLine) {
          corrections[group.name][line] = 0;
        } else {
          const diff = value - referenceValue;
          corrections[group.name][line] = suggestCorrectionLoops(diff);
        }
      }

      // Differential table: for all pairs (e.g. AB, AC, AD, etc.)
      differentials[group.name] = {};
      for (let i = 0; i < lineNames.length; i++) {
        for (let j = i + 1; j < lineNames.length; j++) {
          const diffKey = `${lineNames[i]}${lineNames[j]}`;
          const diffVal = group.measured[lineNames[i]] - group.measured[lineNames[j]];
          differentials[group.name][diffKey] = diffVal;
          if (Math.abs(diffVal) > limit) {
            hasError = true;
            results.push(
              `${group.name}: Differential ${diffKey} (${diffVal}mm) out of tolerance (±${limit}mm)`
            );
          }
        }
      }
    }

    return {
      status: hasError ? 'fail' : 'pass',
      message: results.length > 0 ? results.join('\n') : 'All group differentials within tolerance.',
      details: { corrections, differentials },
      timestamp: new Date(),
    };
  },
};

export const appiRules: ValidationRule[] = [
  appiTrimRule,
]; 