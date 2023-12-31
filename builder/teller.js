const { app, BrowserWindow, screen } = require("electron");

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        titleBarOverlay: true,
        titleBarStyle: "hidden",
        title: "Counter",
        width: 400,
        height: 230,
        frame: true,
        maximizable: true,
        movable: true,
        closable: true,
        x: width - 420,
        y: height - 260,
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
