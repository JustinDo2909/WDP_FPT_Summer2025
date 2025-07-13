import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";

export const apiEvent = createApi({
  baseQuery: customBaseQuery, // Assumes cookies are handled here
  reducerPath: "apiEvent",
  tagTypes: ["Quiz", "Reward"],
  endpoints: (build) => ({
    //#region getRandomQuiz
    getQuestions: build.query<IQuestionResponse, void>({
      query: () => ({
        url: "events/1/questions/random",
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
    //#endregion

    //#region getReward
    getRewardHooks: build.query<EventRewardResponse, void>({
      query: () => ({
        url: "events/1/rewards",
        method: "GET",
      }),
      providesTags: ["Reward"],
    }),
    //#endregion
  }),
});

export const { useGetQuestionsQuery, useGetRewardHooksQuery } = apiEvent;
