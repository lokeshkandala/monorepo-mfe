import { Navbar } from "./Navbar";
import { Outlet, createBrowserRouter, defer } from "react-router-dom";
import { getProduct, getProducts } from "./Products/Services";
import { queryClient } from "./QueryClient";
import Product from "./Product";
import { lazy } from "react";
import { BlockNavigation } from "./BlockNavigation";

const Products = lazy(() => import("./Products"));
const ProductsSuspense = lazy(() => import("./Products/ProductsSuspense"));

const getProductsLoader = () => {
  return defer({
    productsApiData: queryClient.fetchQuery({
      queryKey: ["productsApiData"],
      queryFn: getProducts,
    }),
  });
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <BlockNavigation />
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/products",
        loader: getProductsLoader,
        element: <Products />,
        children: [
          {
            path: "/products/:productId",
            element: <Product />,
            loader: async ({ params }) => {
              const product = await queryClient.fetchQuery({
                queryKey: ["products", params.productId],
                queryFn: () => getProduct(Number(params.productId)),
              });
              return { product };
            },
          },
        ],
      },
      {
        path: "/ProductsSuspense",
        element: <ProductsSuspense />,
      },
    ],
  },
]);
