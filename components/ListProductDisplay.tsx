import { map } from "lodash";
import CardProduct from "@/lib/pattern/share/CardProduct";

export default function ListProductDisplay({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <>
      {map(products, (product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </>
  );
}
