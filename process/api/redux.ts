import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import cartSlice from "../store/cartSlice";
import { api } from "./api";
import { apiAddress } from "./apiAddress";
import { apiAuth } from "./apiAuth";
import { apiCart } from "./apiCart";
import { chatbotApi } from "./apiChatBot";
import { ghnApi } from "./apiGHN";
import { apiOrders } from "./apiOrders";
import { userApi } from "./apiUser";
import { apiEvent } from "./apiEvent";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    [ghnApi.reducerPath]: ghnApi.reducer,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiCart.reducerPath]: apiCart.reducer,

    [apiAddress.reducerPath]: apiAddress.reducer,
    [apiOrders.reducerPath]: apiOrders.reducer,
    [apiEvent.reducerPath]: apiEvent.reducer,
    cart: cartSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
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

      apiAddress.middleware,
      apiOrders.middleware,
      userApi.middleware,
      apiCart.middleware,
      apiEvent.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
