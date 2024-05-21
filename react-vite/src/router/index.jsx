import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Landing from '../components/Landing';
import Home from '../components/Home';
import Friend from '../components/Friend';
import Place from '../components/Place';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "friends",
        element: <Friend />
      },
      {
        path: "places",
        element: <Place />
      }
    ],
  },
]);