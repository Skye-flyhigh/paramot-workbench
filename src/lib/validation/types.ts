import { z } from 'zod';

// Base validation types
export type ValidationStatus = 'pass' | 'fail' | 'warning' | 'pending';

export interface ValidationResult {
  status: ValidationStatus;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  category: 'safety' | 'measurement' | 'documentation';
  severity: 'critical' | 'warning' | 'info';
  validate: (data: unknown) => Promise<ValidationResult>;
}

// APPI-specific validation types
export interface APPIValidationRule extends ValidationRule {
  appiReference: string;
  manufacturerSpecific?: boolean;
  requiresTechnicianInput?: boolean;
}

// Measurement validation types
export interface MeasurementValidation extends ValidationResult {
  measuredValue: number;
  expectedRange: {
    min: number;
    max: number;
    unit: string;
  };
  tolerance?: number;
}

// Glider-specific validation types
export interface GliderValidationContext {
  manufacturer: string;
  model: string;
  serialNumber: string;
  lastInspection?: Date;
  validationHistory?: ValidationResult[];
}

// Zod schemas for runtime validation
export const measurementSchema = z.object({
  value: z.number(),
  unit: z.string(),
  timestamp: z.date(),
  technicianId: z.string(),
});

export const validationResultSchema = z.object({
  status: z.enum(['pass', 'fail', 'warning', 'pending']),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.date(),
});

// Validation service types
export interface ValidationService {
  validateRule(rule: ValidationRule, data: unknown): Promise<ValidationResult>;
  validateGlider(context: GliderValidationContext): Promise<ValidationResult[]>;
  getValidationHistory(gliderId: string): Promise<ValidationResult[]>;
  addValidationRule(rule: ValidationRule): Promise<void>;
  updateValidationRule(rule: ValidationRule): Promise<void>;
}

// Error types
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ValidationError';
  }
} 