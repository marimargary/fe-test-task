import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout.tsx";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => (
  <div className="h-[80vh] flex justify-center items-center">
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  </div>
);

const Home = lazy(async () => ({
  default: (await import("./Pages/index.tsx")).default,
}));

const AddUser = lazy(async () => ({
  default: (await import("./Pages/AddUser/index.tsx")).default,
}));

const UpdateUser = lazy(async () => ({
  default: (await import("./Pages/UpdateUser/index.tsx")).default,
}));

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/addUser",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <AddUser />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/updateUser/:id/:action",
    element: (
      <Layout>
        <Suspense fallback={<Loader />}>
          <UpdateUser />
        </Suspense>
      </Layout>
    ),
  },
]);

export default AppRouter;
