import * as ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

function render() {
  ReactDOM.render(<><CssBaseline /><RouterProvider router={router} /></>, document.body);
}

render();
