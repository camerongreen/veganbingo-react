import * as React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
        path: 'help',
        element: <Help/>,
      },
      {
        path: 'timeline',
        element: <Timeline/>,
      },
      {
        path: 'settings',
        element: <Settings/>,
      },
      {
        path: 'book',
        element: <Book/>,
      },
      {
        path: 'about',
        element: <About/>,
      },
      {
        path: 'page/:name',
        element: <Page/>,
      },
      // Redirects from old routes.
      {
        path: 'aspirational',
        element: <Navigate to="/page/aspirational" replace />,
      },
      {
        path: 'bacon',
        element: <Navigate to="/page/bacon" replace />,
      },
      {
        path: 'cant',
        element: <Navigate to="/page/cant" replace />,
      },
      {
        path: 'cheese',
        element: <Navigate to="/page/cheese" replace />,
      },
      {
        path: 'cow',
        element: <Navigate to="/page/cow" replace />,
      },
      {
        path: 'eat',
        element: <Navigate to="/page/eat" replace />,
      },
      {
        path: 'food',
        element: <Navigate to="/page/food" replace />,
      },
      {
        path: 'hitler',
        element: <Navigate to="/page/hitler" replace />,
      },
      {
        path: 'humane',
        element: <Navigate to="/page/humane" replace />,
      },
      {
        path: 'natural',
        element: <Navigate to="/page/natural" replace />,
      },
      {
        path: 'notmuch',
        element: <Navigate to="/page/notmuch" replace />,
      },
      {
        path: 'plants',
        element: <Navigate to="/page/plants" replace />,
      },
      {
        path: 'preachy',
        element: <Navigate to="/page/preachy" replace />,
      },
      {
        path: 'protein',
        element: <Navigate to="/page/protein" replace />,
      },
      {
        path: 'teeth',
        element: <Navigate to="/page/teeth" replace />,
      },
    ],
  },
]);

export default function App() {
  return (
    <BingoProvider>
      <RouterProvider router={router}/>
    </BingoProvider>
  );
}
