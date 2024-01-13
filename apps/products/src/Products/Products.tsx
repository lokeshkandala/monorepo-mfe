import { useQuery } from "@tanstack/react-query";
import { ProductsResponse } from "Shared/Types";
import { Table } from "antd";
import { Suspense, useEffect } from "react";
import { Await, Link, Outlet, useLoaderData } from "react-router-dom";
import { getProducts } from "./Services";

const { Column } = Table;

export function Products() {
  const data = useLoaderData();
  return (
    <Suspense fallback={<ProductsList />}>
      <Await
        resolve={(data as any).productsApiData}
        errorElement={<ProductsList />}
      >
        <ProductsList />
      </Await>
    </Suspense>
  );
}
function ProductsList() {
  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: ["productsApiData"],
    enabled: false,
  });
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Table loading={isLoading} dataSource={data?.products}>
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
