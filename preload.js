const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    getGliderData: async (brand, modelName, sizeLabel) => {
      try {
        return await ipcRenderer.invoke('getGliderData', brand, modelName, sizeLabel);
      } catch (error) {
        console.error('Error in getGliderData:', error);
        throw error; // Re-throw to let the renderer handle it
      }
    },
    getAvailableBrands: async () => {
      try {
        return await ipcRenderer.invoke('getAvailableBrands');
      } catch (error) {
        console.error('Error in getAvailableBrands:', error);
        throw error;
      }
    },
    getModelsForBrand: async (brand) => {
      try {
        return await ipcRenderer.invoke('getModelsForBrand', brand);
      } catch (error) {
        console.error('Error in getModelsForBrand:', error);
        throw error;
      }
    },
    getSizesForModel: async (brand, modelName) => {
      try {
        return await ipcRenderer.invoke('getSizesForModel', brand, modelName);
      } catch (error) {
        console.error('Error in getSizesForModel:', error);
        throw error;
      }
    }
  }
); 