import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable better error logging
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
 
// Log the current environment and paths
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('NODE_ENV:', process.env.NODE_ENV);

function createWindow() {
  // Create the browser window with explicit size
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Enable DevTools in development
  if (process.env.NODE_ENV !== 'production') {
    win.webContents.openDevTools();
  }

  // Log the path we're trying to load
  const loadPath = process.env.NODE_ENV === 'production' 
    ? join(__dirname, 'dist', 'index.html')
    : 'http://localhost:5173';
  console.log('Attempting to load:', loadPath);

  // Load the appropriate URL with error handling
  if (process.env.NODE_ENV === 'production') {
    win.loadFile(join(__dirname, 'dist', 'index.html'))
      .catch(err => {
        console.error('Error loading production file:', err);
        // Fallback to dev server if production load fails
        console.log('Falling back to dev server...');
        win.loadURL('http://localhost:5173')
          .catch(e => console.error('Failed to load dev server:', e));
      });
  } else {
    win.loadURL('http://localhost:5173')
      .catch(err => console.error('Error loading dev server:', err));
  }

  // Log when the window is ready
  win.webContents.on('did-finish-load', () => {
    console.log('Window loaded successfully');
  });

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });
}

// Wait for app to be ready
app.whenReady().then(() => {
  console.log('App is ready');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});