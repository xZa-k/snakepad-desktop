import {app, ipcMain, BrowserWindow} from "electron";
import { resolveHtmlPath } from "./util";

let mainWindow: BrowserWindow;

const env = process.env.NODE_ENV || 'development';
  
// If development environment
if (env === 'development') {
    try {
        require("electron-debug")();

        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }
}



app.on("ready", createWindows);


function createWindows(): void {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: __dirname + "/preload.js"
        },
        show: true
    });

    mainWindow.loadURL(resolveHtmlPath("index.html"));
    mainWindow.on("ready-to-show", ()=> mainWindow.show());
}
