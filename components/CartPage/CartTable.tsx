import { Container} from "@/lib/by/Div";
import { CartItem } from "./CartItem";
import { map } from "lodash";
import { createVoucherMap } from "../CheckoutPage/seg/createVoucherMap";

export const CartTable = ({
  items,
  isSimple = false,
  voucher
}: {
  items: ICartLineItem[];
  isSimple?: boolean;
  voucher?: IVoucher;
}) => {
  const voucherMap = voucher ? createVoucherMap(voucher, items) : {};

  const finalItems = map(items, (item) => ({
    ...item,
    savings: voucherMap[item.id] ?? 0,
  }));

  return (
    <Container className="md:col-span-3 space-y-2">
      {map(finalItems, (item) => (
        <CartItem
          key={item.id}
          item={item}
          isSimple={isSimple}
          savings={item.savings} 
        />
      ))}
    </Container>
  );
};

