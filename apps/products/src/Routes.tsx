import { Navbar } from "./Navbar";
import Products from "./Products";
import { Outlet, createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/products",
        element: <Products />,
        children: [
          {
            path: "/products/:productId",
            element: <div>id</div>,
          },
        ],
      },
    ],
  },
]);
