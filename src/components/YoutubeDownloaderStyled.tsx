import { Box, TextField, Button, InputAdornment, IconButton, Grid, CircularProgress } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, FormEvent } from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

interface YoutubeDownloaderProps {
  folderPath: string;
  videoUrl: string;
  videoUrlError: string;
  videoId: string;
  isFormValid: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  onSubmit: (e: FormEvent) => void;
  onSelectFolder: () => void;
  onRemoveFolder: (e: MouseEvent) => void;
  onVideoUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSuccess: () => void;
}

export function YoutubeDownloaderStyled({
  folderPath,
  videoUrl,
  videoUrlError,
  isFormValid,
  isLoading,
  isSuccess,
  videoId,
  onSubmit,
  onSelectFolder,
  onRemoveFolder,
  onVideoUrlChange,
  onClearSuccess,
}: YoutubeDownloaderProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
          <TextField
            size={'small'}
            margin="normal"
            fullWidth
            label="Select Folder"
            value={folderPath}
            onClick={onSelectFolder}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={(e) => onRemoveFolder(e as unknown as MouseEvent)} edge="end">
                    {folderPath ? <CloseIcon /> : <FolderOpenIcon fontSize={'small'} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size={'small'}
            margin="normal"
            fullWidth
            label="Video URL"
            onChange={onVideoUrlChange}
            value={videoUrl}
            error={!!videoUrlError}
            helperText={videoUrlError}
            InputProps={{
              endAdornment: isSuccess && (
                <InputAdornment position="end">
                  <IconButton onClick={onClearSuccess} edge="end">
                    <TaskAltIcon color={'success'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" disabled={!isFormValid || isLoading} fullWidth variant="contained" sx={{ mt: 1, mb: 0, borderRadius: '20px' }}>
            {isLoading ? <CircularProgress size={25} /> : <span>Download</span>}
          </Button>
        </Box>
      </Grid>

      {videoId && (
        <Grid item xs={12} sm={6} sx={{ mb: 3, mt: 3 }}>
          <iframe style={{ width: '100%' }} id="ytplayer" width="640" height="360" src={`https://www.youtube.com/embed/${videoId}`} />
        </Grid>
      )}

      {!videoId && (
        <Grid item xs={12} sm={6} sx={{ mb: 3, mt: 3 }}>
          <div style={{ border: '1px solid gray', height: '356px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <YouTubeIcon color={'primary'} sx={{ fontSize: 65 }} />
          </div>
        </Grid>
      )}
    </Grid>
  );
}
