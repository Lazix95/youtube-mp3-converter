import ytdl from 'ytdl-core';
// import ffmpeg from "fluent-ffmpeg";
// import ffmpegPath from "ffmpeg-static";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpeg = require('fluent-ffmpeg');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpegPath = require('ffmpeg-static');
import path from 'path';
import fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegPath as string);

export async function getAudioFilePath(userChosenFolderPath: string, videoUrl: string) {
  const videoInfo = await ytdl.getInfo(videoUrl);
  const rootDir = path.resolve('/');

  const sanitizedFolderPath = path.join(rootDir, userChosenFolderPath);
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
        reject(`Failed to convert video to MP3: ${error}`);
      })
      .save(audioFilePath)
      .on('end', () => {
        resolve(audioFilePath);
      });
  });
}
