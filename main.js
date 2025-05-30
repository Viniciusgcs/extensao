const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  // Inicia seu servidor Express
  const server = exec('node app.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao iniciar o servidor: ${error.message}`);
      return;
    }
    if (stderr) console.error(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
  });

  // Espera um pouco antes de abrir a janela, pra garantir que o servidor subiu
  setTimeout(createWindow, 1000);
});

app.on('window-all-closed', () => {
  app.quit();
});
