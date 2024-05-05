import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root'
import Weather from './routes/Weather'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/weather-results",
    element: <Weather />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
