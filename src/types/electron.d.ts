interface ElectronAPI {
  getGliderData: (brand: string, modelName: string, sizeLabel: string) => Promise<any>;
  getAvailableBrands: () => Promise<string[]>;
  getModelsForBrand: (brand: string) => Promise<string[]>;
  getSizesForModel: (brand: string, modelName: string) => Promise<string[]>;
}

declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

export {}; 