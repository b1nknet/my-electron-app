import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron", "main");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.APP_ROOT, "public", "favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST
};
