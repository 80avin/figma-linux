const {
    shell,
    app,
    BrowserWindow
} = require('electron');
const shorcuts = require('./shortcuts');
const menu = require('./menu');

const HOME = 'https://www.figma.com/'
const winOptions = {
    width: 1200,
    height: 900,
    webPreferences: {
        nodeIntegration: false,
        'web-security': false,
        webgl: true,
        experimentalFeatures: true,
        experimentalCanvasFeatures: true,
        zoomFactor: 0.7
    }
};

app.on('ready', () => {
    let window = new BrowserWindow(winOptions);

    window.setMenuBarVisibility(false);
    window.loadURL(HOME);

    window.webContents.on('will-navigate', (event, url) => {
        parts = url.split("/");
        if (parts[0] + "//" + parts[2] != HOME) {
            event.preventDefault()
            shell.openExternal(url)
        };
    })

    shorcuts(window);
    menu(window);

    window.on('closed', () => {
        window = null;
    });
});

app.on('window-all-closed', () => {

    if(process.platform !== 'darwin') {
        app.quit();
    }
});