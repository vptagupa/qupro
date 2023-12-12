const { app, BrowserWindow, screen } = require("electron");

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const win = new BrowserWindow({
        width: 500,
        height: 220,
        frame: false,
        maximizable: true,
        movable: true,
        closable: true,
        x: width - 520,
        y: 20,
        webPreferences: {
            webSecurity: false,
            // nodeIntegration: true,
            // enableRemoteModule: true,
            // contentSecurityPolicy: {
            //     directives: {
            //         defaultSrc: ["'self'", "http://qupro.local/tellers"],
            //         // scriptSrc: ["'self'", "http://qupro.local/tellers"],
            //         // Add other directives as needed
            //     },
            // },
        },
        alwaysOnTop: true,
        darkTheme: true,
    });

    // win.loadFile("teller.html");
    win.loadURL("http://qupro.local/tellers");
};

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
