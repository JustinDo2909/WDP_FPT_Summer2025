import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";
import { ghnApi } from "./apiGHN";
import { chatbotApi } from "./apiChatBot";
import { apiAuth } from "./apiAuth";
import { apiCart } from "./apiCart";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    [ghnApi.reducerPath]: ghnApi.reducer,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiCart.reducerPath]: apiCart.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      ghnApi.middleware,
      chatbotApi.middleware,
      apiAuth.middleware,
      apiCart.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
