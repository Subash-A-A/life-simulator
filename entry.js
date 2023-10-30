const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
  const mainWindow = new BrowserWindow({ width: 1600, height: 900 });
  mainWindow.loadFile("./src/index.html");
});
