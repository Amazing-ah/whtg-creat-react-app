import { createBrowserRouter } from 'react-router';
import App from '../App';
import RootLayout from '@/components/layout/rootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: App,
      },
    ],
  },
]);

export default router;
