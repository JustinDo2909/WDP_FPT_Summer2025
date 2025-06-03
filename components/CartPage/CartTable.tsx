import { Container} from "@/lib/by/Div";
import { CartItem } from "./CartItem";
import { map } from "lodash";

export const CartTable = ({ items }: { items: ICartLineItem[] }) => {
  return (
    <Container className="md:col-span-3 space-y-2 ">
      {/* <Row className="flex justify-between px-10">
        <RText className="text-right ">Product</RText>
        <RText className="text-right ">Subtotal</RText>
      </Row> */}
      {map(items, (item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </Container>
  );
};
