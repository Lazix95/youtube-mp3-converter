import { ChangeEvent, useEffect, useState, Fragment, useRef, FormEvent } from 'react';
import { YoutubeDownloaderStyled } from '../components/YoutubeDownloaderStyled';
import { getYouTubeVideoId } from '../utils/youtube-utils';
import { ToastMessage, ToastMessageRef } from '../components/ToastMessage';

export function YoutubeDownloaderContainer() {
  const [folderPath, setFolderPath] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoUrlError, setVideoUrlError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toastMessageRef = useRef<ToastMessageRef>(null);

  const isFormValid = !videoUrlError && !!folderPath && !!videoId;

  useEffect(() => {
    if (!videoUrl) {
      setVideoId('');
      setVideoUrlError('');
      return;
    }
    const newVideoId = getYouTubeVideoId(videoUrl);
    if (newVideoId) {
      setVideoId(newVideoId);
      setVideoUrlError('');
    } else {
      setVideoId('');
      setVideoUrlError('YouTube URL is not correct');
    }
  }, [videoUrl]);

  async function handleSelectFolder() {
    const path = await window.electron.invoke('selectFolder');
    setFolderPath(path);
  }

  function handleVideoUrlChange(e: ChangeEvent<HTMLInputElement>) {
    setVideoUrl(e.target.value);
  }

  function handleRemoveFolderPath(e: MouseEvent) {
    if (!folderPath) return;
    e.stopPropagation();
    setFolderPath('');
  }

  function handleClearSuccess() {
    setIsSuccess(false);
    setVideoUrl('');
  }

  async function handleConvert(e: FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setIsLoading(true);
      await window.electron.invoke('convertToMp3', folderPath, videoId);
      toastMessageRef.current?.success('Successfully Downloaded');
      setIsSuccess(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toastMessageRef.current?.error(`Error - ${err}`);
      setIsLoading(false);
    }
  }

  return (
    <Fragment>
      <YoutubeDownloaderStyled
        folderPath={folderPath}
        videoUrl={videoUrl}
        videoId={videoId}
        videoUrlError={videoUrlError}
        isFormValid={isFormValid}
        isLoading={isLoading}
        isSuccess={isSuccess}
        onSubmit={handleConvert}
        onRemoveFolder={handleRemoveFolderPath}
        onVideoUrlChange={handleVideoUrlChange}
        onSelectFolder={handleSelectFolder}
        onClearSuccess={handleClearSuccess}
      />
      <ToastMessage ref={toastMessageRef} />
    </Fragment>
  );
}
