const { app, BrowserWindow, screen } = require("electron");

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width: 500,
        height: 400,
        frame: false,
        maximizable: true,
        movable: true,
        closable: true,
        x: width - 500,
        y: 0,
        webPreferences: {
            webSecurity: false,
        },
        alwaysOnTop: true,
        darkTheme: true,
    });

    win.loadURL("http://qupro.local/tellers");
};

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
