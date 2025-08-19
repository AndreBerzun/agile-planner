const {app, BrowserWindow, screen} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  // Get primary display dimensions
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Create window with reasonable defaults
  mainWindow = new BrowserWindow({
    height: height * 0.9,
    width: Math.min(650, width * 0.8),
    backgroundColor: '#1a1a1a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    frame: true,
    autoHideMenuBar: true
  });

  // Log errors that might occur during window loading
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  // Log console messages from renderer
  mainWindow.webContents.on('console-message', (event, level, message) => {
    console.log(`[Renderer ${level}]: ${message}`);
  });

  let startUrl = url.format({
    pathname: path.join(__dirname, 'dist', 'agile-planner', 'browser', 'index.html'),
    protocol: 'file:',
    slashes: true
  });
  console.log('Loading packaged app from:', startUrl);

  // Load the app and log outcome
  mainWindow.loadURL(startUrl)
    .then(() => console.log('App loaded successfully'))
    .catch(err => console.error('Error loading app:', err));

  // Emitted when the window is closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
