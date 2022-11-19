import * as React from 'react';
import Dashboard from './Dashboard';
import { BingoProvider } from './BingoContext';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Error";
import Game from "./Game";
import Help from "./Help";
import Timeline from "./Timeline";
import Settings from "./Settings";
import About from "./About";
import Page from "./Page";

import './styles/App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Game/>,
      },
      {
        path: '/help',
        element: <Help/>,
      },
      {
        path: '/timeline',
        element: <Timeline/>,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: "page/:name",
        element: <Page/>,
      },
    ],
  },
]);

export default function App() {
  return (
    <BingoProvider>
      <RouterProvider router={router} />
    </BingoProvider>
  );
}
