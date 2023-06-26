/* eslint-disable @typescript-eslint/no-var-requires */

import ytdl from 'ytdl-core';
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
import path from 'path';
import fs from 'fs';
const ffmpegPath = process.env.NODE_ENV === 'development' ? ffmpegStatic : path.join(__dirname, '..', '..', 'ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

console.log(ffmpegPath);

export async function getAudioFilePath(userChosenFolderPath: string, videoUrl: string) {
  const videoInfo = await ytdl.getInfo(videoUrl);
  let sanitizedFolderPath = userChosenFolderPath;

  if (process.platform === 'darwin') {
    const rootDir = path.resolve('/');
    sanitizedFolderPath = path.join(rootDir, userChosenFolderPath);
  }

  const songName = videoInfo.videoDetails.title.replace(/[^\w\s]/gi, ''); // Remove special characters from the song name
  const audioFileName = `${songName}.mp3`;
  const audioFilePath = path.join(sanitizedFolderPath, audioFileName);

  if (!fs.existsSync(sanitizedFolderPath)) {
    fs.mkdirSync(sanitizedFolderPath, { recursive: true });
  }

  return audioFilePath;
}

export async function convertVideoToMp3(audioFilePath: string, videoUrl: string) {
  return new Promise((resolve, reject) => {
    const audioStream = ytdl(videoUrl, { filter: 'audioonly' });
    ffmpeg(audioStream)
      .noVideo()
      .audioCodec('libmp3lame')
      .audioBitrate('320k')
      .audioChannels(2)
      .audioFrequency(44100)
      .format('mp3')
      .on('error', (error: unknown) => {
        console.log(error);
        reject(`Failed to convert video to MP3: ${error}`);
      })
      .save(audioFilePath)
      .on('end', () => {
        resolve(audioFilePath);
      });
  });
}
