import { RouterProvider } from "react-router-dom";
import AppRouter from "./Router";

const App = () => {
  return <RouterProvider router={AppRouter} />;
};

export default App;
