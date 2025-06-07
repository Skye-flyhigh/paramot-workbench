import { ValidationService, ValidationRule, ValidationResult, GliderValidationContext, APPIValidationRule } from './types';
import { appiRules } from './appi-rules';

export class ValidationServiceImpl implements ValidationService {
  private rules: Map<string, ValidationRule>;

  constructor() {
    this.rules = new Map();
    // Initialize with APPI rules
    appiRules.forEach(rule => this.rules.set(rule.id, rule));
  }

  async validateRule(rule: ValidationRule, data: unknown): Promise<ValidationResult> {
    try {
      return await rule.validate(data);
    } catch (error) {
      return {
        status: 'fail',
        message: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
      };
    }
  }

  async validateGlider(context: GliderValidationContext): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    // Get all rules that apply to this glider
    const applicableRules = Array.from(this.rules.values()).filter(rule => {
      const appiRule = rule as APPIValidationRule;
      // For APPI rules, check if they're manufacturer-specific
      return !('manufacturerSpecific' in appiRule) || 
             (appiRule.manufacturerSpecific && appiRule.appiReference.includes(context.manufacturer));
    });

    // Run all applicable validations
    for (const rule of applicableRules) {
      const result = await this.validateRule(rule, context);
      results.push(result);
    }

    return results;
  }

  async getValidationHistory(gliderId: string): Promise<ValidationResult[]> {
    // TODO: Implement database integration
    return [];
  }

  async addValidationRule(rule: ValidationRule): Promise<void> {
    this.rules.set(rule.id, rule);
  }

  async updateValidationRule(rule: ValidationRule): Promise<void> {
    if (!this.rules.has(rule.id)) {
      throw new Error(`Validation rule ${rule.id} not found`);
    }
    this.rules.set(rule.id, rule);
  }

  // APPI-specific validation methods
  async validateLineLength(measurement: number, expectedRange: { min: number; max: number }): Promise<ValidationResult> {
    if (measurement < expectedRange.min) {
      return {
        status: 'fail',
        message: `Line length ${measurement}mm is below minimum required ${expectedRange.min}mm`,
        timestamp: new Date(),
      };
    }
    if (measurement > expectedRange.max) {
      return {
        status: 'fail',
        message: `Line length ${measurement}mm exceeds maximum allowed ${expectedRange.max}mm`,
        timestamp: new Date(),
      };
    }
    return {
      status: 'pass',
      message: `Line length ${measurement}mm is within acceptable range`,
      timestamp: new Date(),
    };
  }

  async validateLineDifferential(
    measurements: { [key: string]: number },
    maxDifferential: number
  ): Promise<ValidationResult> {
    const values = Object.values(measurements);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const differential = max - min;

    if (differential > maxDifferential) {
      return {
        status: 'fail',
        message: `Line differential ${differential}mm exceeds maximum allowed ${maxDifferential}mm`,
        timestamp: new Date(),
      };
    }
    return {
      status: 'pass',
      message: `Line differential ${differential}mm is within acceptable range`,
      timestamp: new Date(),
    };
  }
}

// Create and export a singleton instance
export const validationService = new ValidationServiceImpl(); 