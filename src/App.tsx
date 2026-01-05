import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './router/routes';
import './styles/global.scss';

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

