import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";
import { ghnApi } from "./apiGHN";
import { chatbotApi } from "./apiChatBot";
import { apiAuth } from "./apiAuth";
import { apiCart } from "./apiCart";
import { apiProduct } from "./apiProduct";
import { metaApi } from "./apiMeta";
import { orderApi } from "./apiOrder";
import cartSlice from "../store/cartSlice";
import { apiAddress } from "./apiAddress";
import { apiOrders } from "./apiOrders";


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    [ghnApi.reducerPath]: ghnApi.reducer,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiCart.reducerPath]: apiCart.reducer,
    [apiProduct.reducerPath]: apiProduct.reducer,
    [metaApi.reducerPath]: metaApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [apiAddress.reducerPath]: apiAddress.reducer,
    [apiOrders.reducerPath]: apiOrders.reducer,
    cart: cartSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      ghnApi.middleware,
      chatbotApi.middleware,
      apiAuth.middleware,
      apiCart.middleware,
      apiProduct.middleware,
      metaApi.middleware,
      orderApi.middleware,
      apiAddress.middleware,
      apiOrders.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
