import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { MainView } from './views/MainView';
import { YoutubeDownloaderContainer } from './containers/YoutubeDownloaderContainer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0000', // YouTube red
    },
    secondary: {
      main: '#FFFFFF', // White
    },
    background: {
      default: '#0f0f0f', // Dark background color
      paper: '#202020', // Dark paper color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainView>
        <YoutubeDownloaderContainer />
      </MainView>
    </ThemeProvider>
  );
}
export default App;
