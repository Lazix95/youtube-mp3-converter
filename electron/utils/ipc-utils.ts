import { ipcMain, dialog, IpcMainInvokeEvent } from "electron";
import { convertVideoToMp3, getAudioFilePath } from "./converter-utils";

ipcMain.handle("selectFolder", async () => {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
          const selectedFolder = result.filePaths[0];
          resolve(selectedFolder);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
});

ipcMain.handle("convertToMp3", async (_event: IpcMainInvokeEvent, folderPath: string, videoUrl: string) => {
  const audioPath = await getAudioFilePath(folderPath, videoUrl);
  await convertVideoToMp3(audioPath, videoUrl);
  return audioPath;
});
