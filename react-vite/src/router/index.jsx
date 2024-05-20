import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Landing from '../components/Landing';
import Home from '../components/Home';

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
      }
    ],
  },
]);