// Use the type for cartItems
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [] as ICartLineItem[],
  },
  reducers: {
    setCartItems(state, action: PayloadAction<ICartLineItem[]>) {
      state.cartItems = action.payload;
    },
  },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice;
