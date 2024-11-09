import { app, BrowserWindow, screen, globalShortcut, ipcMain, Notification } from 'electron';
import * as path from 'path';
import * as url from 'url';

// // Initialize remote module
// require('@electron/remote/main').initialize();

let win: BrowserWindow|null = null;
const args = process.argv.slice(1),
serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    minWidth: 600,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false
    },
    //frame:false,//remove Navigation bar and  Menu
    fullscreen:true,
    //icon:path.join(__dirname,"/src/assets/icons/electron.bmp")//icon on Navigation bar
  });
  win.removeMenu();//remove Menu

  // Initialize remote module
  require('@electron/remote/main').initialize();
  require('@electron/remote/main').enable(win.webContents);

  if (serve) {
    win.webContents.openDevTools();

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/zeams/browser/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.on('closed', () => {
    win = null;
  });

  globalShortcut.register('ESC', ()=>{console.log(__dirname,path.join(__dirname,"/src/assets/icons/ad.jpg"))
    //code...
    if(win != null){
      if(win.fullScreen == true)win.fullScreen = false; 
      else win.fullScreen = true;
    }
  })
  return win;
}

try {
  app.on('ready', () => setTimeout(createWindow, 400));
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

  ipcMain.on('my-custom-signal', (event, arg) => {
    if(arg === "close electron"){
       win = null;
      if (process.platform !== 'darwin') {
        app.quit();
      }
    }
  });

  ipcMain.on('notification', (event, arg) => {
    new Notification({
      title: arg.title,
      body: arg.text,
    }).show();
  });
} catch (e) {
}