import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { BlogLayout } from '../layouts/BlogLayout';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { BlogPage } from '../pages/BlogPage';
import { BlogPost } from '../pages/BlogPost';
import { Contact } from '../pages/Contact';
import { NotFound } from '../pages/NotFound';
import { Projects } from '../pages/Projects';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'blog',
        element: <BlogLayout />,
        children: [
          {
            index: true,
            element: <BlogPage />,
          },
          {
            path: ':slug',
            element: <BlogPost />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
