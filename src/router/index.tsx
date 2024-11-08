import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import { PrivateRoute } from "./routes/private";
import { PublicRoute } from "./routes/public";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute element={<Home />} />,
    },
    { path: "/login", element: <PublicRoute element={<LoginPage />} /> },
  ]);

  return <RouterProvider router={router} />;
};
