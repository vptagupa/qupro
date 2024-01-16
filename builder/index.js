const { app, BrowserWindow, screen, Tray } = require("electron");

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        titleBarOverlay: true,
        titleBarStyle: "hidden",
        title: "Counter",
        autoHideMenuBar: true,
        width: 400,
        height: 270,
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

    win.loadURL("http://qupro.test:8080/tellers");
};

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", (e) => {
    if (process.platform !== "darwin") app.quit();
});
