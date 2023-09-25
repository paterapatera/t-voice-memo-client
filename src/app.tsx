import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Editor } from './component/Editor';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Viewer } from './component/Viewer';
import { Suspense } from 'react';

const router = createMemoryRouter([
  {
    path: "/",
    element: <Editor />,
  },
  {
    path: "/viewer",
    element: <Viewer />,
  },
]);

const theme = createTheme({
  palette: {
    background: {
      paper: '#eff1f2',
      default: '#fbfcfd',
    },
    primary: {
      main: '#006879'
    },
    secondary: {
      main: '#4b6268'
    },
  },
});

createRoot(document.getElementById('root')).render(<>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  </ThemeProvider >
</>);
