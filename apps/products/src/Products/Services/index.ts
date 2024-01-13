import { ProductInfo, ProductsResponse } from "Shared/Types";

export const getProducts = (): Promise<ProductsResponse> =>
  fetch("https://dummyjson.com/products").then((res) => res.json());

export const getProduct = (id: number): Promise<ProductInfo> =>
  fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json());
