import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <p>ERRoR</p>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);
