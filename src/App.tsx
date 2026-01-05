import { RouterProvider, createHashRouter } from "react-router-dom";
import { routes } from "./router/routes";
import "./styles/global.scss";

const router = createHashRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
