import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "Shared/Types";
import { Table } from "antd";
import { Suspense, useEffect } from "react";
import { Await, Link, Outlet, useLoaderData } from "react-router-dom";
import { getProducts } from "./Services";

const { Column } = Table;
function fetchProducts() {
  console.log("called");
  let result: any;
  let status = "pending";
  let fetching = getProducts()
    // Fetch request has gone well
    .then((success) => {
      status = "fulfilled";

      result = success;
    })
    // Fetch request has failed
    .catch((error) => {
      status = "rejected";

      result = error;
    });

  return function read() {
    if (status === "pending") {
      throw fetching; // Suspend(A way to tell React data is still fetching)
    } else if (status === "rejected") {
      throw result; // Result is an error
    } else if (status === "fulfilled") {
      return result; // Result is a fulfilled promise
    }
  };
}

const productsData = fetchProducts();

export default function ProductsSuspense() {
  return (
    <Suspense fallback={<ProductsList />}>
      <ProductsList />
    </Suspense>
  );
}
function ProductsList() {
  //   const { data, isLoading } = useQuery<ProductsResponse>({
  //     queryKey: ["productsApiData"],
  //     enabled: false,
  //   });
  const data = productsData();
  console.log(data);
  return (
    <div>
      <div style={{ background: "lightblue", padding: "30px" }}>
        <Table dataSource={data?.products}>
          <Column
            title="Id"
            dataIndex="id"
            key="id"
            render={(text) => <Link to={`/products/${text}`}>{text}</Link>}
          />
          <Column title="Title" dataIndex="title" key="title" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
        </Table>
      </div>
      <Outlet />
    </div>
  );
}
