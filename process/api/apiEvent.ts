import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";
import { playEvent } from "@/components/admin/Event/seg/utils";

export const apiEvent = createApi({
  baseQuery: customBaseQuery, // Assumes cookies are handled here
  reducerPath: "apiEvent",
  tagTypes: ["Quiz", "Reward", "PlayStatus"],
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

    //#region calculateReward
    calculateReward: build.mutation<EventReward, { correct_answers: number }>({
      query: (body) => ({
        url: "events/1/calculate-reward",
        method: "POST",
        body,
      }),
      transformResponse: (response: IResponseCalculate) =>
        response.reward || {},
      invalidatesTags: ["Reward"],
    }),
    //#endregion

    //#region playEvent
    playEvent: build.mutation<IPlayResponse, void>({
      query: () => ({
        url: `events/play`,
        method: "POST",
      }),
      transformResponse: (response: IPlayResponse) => response,
      invalidatesTags: [{ type: "PlayStatus" }],
    }),
    //endregion
  }),
});

export const {
  useGetQuestionsQuery,
  useGetRewardHooksQuery,
  useCalculateRewardMutation,
  usePlayEventMutation,
} = apiEvent;
