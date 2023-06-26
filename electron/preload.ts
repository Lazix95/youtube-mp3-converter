/* eslint-disable react-hooks/rules-of-hooks */
import { useLoading, domReady } from "./utils/electron-utils";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", ipcRenderer);

const { appendLoading, removeLoading } = useLoading();
domReady().then(() => {
  appendLoading;
});

window.onmessage = (ev) => {
  ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);
