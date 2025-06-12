import { GliderRepository } from '../repositories/gliderRepository';

export class GliderService {
  private repo: GliderRepository;

  constructor() {
    this.repo = new GliderRepository();
  }

  async getAvailableBrands() {
    return await this.repo.getAvailableBrands();
  }

  async getModelsForBrand(brand: string) {
    return await this.repo.getModelsForBrand(brand);
  }

  async getSizesForModel(brand: string, modelName: string) {
    return await this.repo.getSizesForModel(brand, modelName);
  }

  async getGliderMeasurementData(brand: string, modelName: string, sizeLabel: string) {
    const glider = await this.repo.getGliderByModelAndSize(brand, modelName, sizeLabel);
    if (!glider) return null;
    const size = glider.sizes[0];
    const lineset = size.lineSets[0];
    const lineLengths = size.sizeLineLengths[0]?.lengths || {};
    return {
      glider,
      size,
      lineset,
      lineLengths,
    };
  }
} 