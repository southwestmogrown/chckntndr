import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Landing from '../components/Landing';
import Home from '../components/Home';
import Place from '../components/Place';
import FriendsHome from '../components/FriendsHome';
import Navigation from '../components/Navigation';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    element: <Navigation />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "friends",
        element: <FriendsHome />
      },
      {
        path: "places",
        element: <Place />
      }
    ],
  },
]);