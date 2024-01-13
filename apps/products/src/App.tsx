import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./Routes";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";
import { queryClient } from "./QueryClient";

export default function App() {
  return (
    <Suspense fallback={<Spin />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
}
