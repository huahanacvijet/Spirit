// Creates Electron desktop application window
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const isDev = !app.isPackaged;

function createMainWindow() {
    const mainWindow = new BrowserWindow( {
        // Sets window title and dimensions
        title: 'Daily Cultivation',
        width: 400,
        height: 630,
        resizable: false,
        maximizable: false,
        minimizable: true,
        fullscreenable: false,
        useContentSize: false,
        // center: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    // if(isDev) {
    //     mainWindow.loadURL('http://localhost:3000');
    //     mainWindow.webContents.openDevTools();
    // } else {
        const startUrl = url.format ({
        // Loads the react app from the build directory
            pathname: path.join(__dirname, '../build/index.html'),
            protocol: 'file',
            slashes: true,
        });
         mainWindow.loadURL(startUrl); // loads the app in electron window
    // }
}
// Starts the app when electron is ready
app.whenReady().then(createMainWindow)