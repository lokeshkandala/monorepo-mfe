import { useQuery } from "@tanstack/react-query";
import { ProductInfo } from "Shared/Types";
import { Card } from "antd";
import { Await, useLoaderData, useParams } from "react-router-dom";
import { useBlockNavigationStore } from "../Stores";

export function Product() {
  const data = useLoaderData();
  return (
    <Await resolve={(data as any).product} errorElement={<ProductCard />}>
      <ProductCard />
    </Await>
  );
}

const ProductCard = () => {
  const params = useParams();
  const { data } = useQuery<ProductInfo>({
    queryKey: ["products", params.productId],
    enabled: false,
  });
  const { setIsBlocked } = useBlockNavigationStore.getState();
  const isBlocked = useBlockNavigationStore.useIsBlocked();

  return (
    <div style={{ background: "#ECECEC", padding: "30px" }}>
      <Card title={data?.title} bordered={false} style={{ width: 300 }}>
        <p>{data?.brand}</p>
        <p>{data?.description}</p>
        <label>
          Block navigation
          <input
            type="checkbox"
            checked={isBlocked}
            onChange={() => setIsBlocked(!isBlocked)}
          />
        </label>
      </Card>
    </div>
  );
};
