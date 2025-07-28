// Creates Electron desktop application window
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow( {
        // Sets window title and dimensions
        title: 'Daily Cultivation',
        width: 400,
        height: 430,
    });

    const startUrl = url.format ({
        // Loads the react app from the build directory
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file',
        slashes: true,
    });

    mainWindow.loadURL(startUrl); // loads the app in electron window
}

// Starts the app when electron is ready
app.whenReady().then(createMainWindow)