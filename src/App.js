import * as React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Services.
import { BingoProvider } from './services/BingoContext';

// Elements.
import About from "./About";
import Book from './Book';
import Dashboard from './Dashboard';
import Error from "./Error";
import Game from "./Game";
import Help from "./Help";
import Page from "./Page";
import Settings from "./Settings";
import Timeline from "./Timeline";

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
        path: '/book',
        element: <Book />,
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
