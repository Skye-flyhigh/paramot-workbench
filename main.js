import { app, BrowserWindow, ipcMain, session } from 'electron';
import { join } from 'path';
import { GliderService } from './src/services/gliderService';

let mainWindow;
const gliderService = new GliderService();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // Set CSP headers for all web requests
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';"
        ]
      }
    });
  });

  // In development, load from Vite dev server
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built files
    mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  // Handle IPC calls with proper error handling
  ipcMain.handle('getGliderData', async (event, brand, modelName, sizeLabel) => {
    try {
      if (!brand || !modelName || !sizeLabel) {
        throw new Error('Missing required parameters');
      }
      const data = await gliderService.getGliderMeasurementData(brand, modelName, sizeLabel);
      if (!data) {
        throw new Error('No data found for this glider configuration');
      }
      return data;
    } catch (error) {
      console.error('Error in getGliderData handler:', error);
      throw error;
    }
  });

  // New IPC handlers for glider selection
  ipcMain.handle('getAvailableBrands', async () => {
    try {
      return await gliderService.getAvailableBrands();
    } catch (error) {
      console.error('Error in getAvailableBrands handler:', error);
      throw error;
    }
  });

  ipcMain.handle('getModelsForBrand', async (event, brand) => {
    try {
      if (!brand) throw new Error('Brand is required');
      return await gliderService.getModelsForBrand(brand);
    } catch (error) {
      console.error('Error in getModelsForBrand handler:', error);
      throw error;
    }
  });

  ipcMain.handle('getSizesForModel', async (event, brand, modelName) => {
    try {
      if (!brand || !modelName) throw new Error('Brand and model name are required');
      return await gliderService.getSizesForModel(brand, modelName);
    } catch (error) {
      console.error('Error in getSizesForModel handler:', error);
      throw error;
    }
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
}); 