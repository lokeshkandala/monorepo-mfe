import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
export function Products() {
  return (
    <div>
      products
      <Outlet />
    </div>
  );
}
