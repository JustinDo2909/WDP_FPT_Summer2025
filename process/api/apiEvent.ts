import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customFetchBase";

export const apiEvent = createApi({
  baseQuery: customBaseQuery, // Assumes cookies are handled here
  reducerPath: "apiEvent",
  tagTypes: ["Quiz", "Reward", "PlayStatus", "Events"],
  endpoints: (build) => ({
    //region getEvent
    getEvents: build.query<IEvent[], void>({
      query: () => ({
        url: `events/get`,
        method: "GET",
      }),
      transformResponse: (response: EventsResponse) => response.events || {},
      providesTags: ["Events"],
    }),
    //region getEventByID
    getEventByID: build.query<IEvent, { eventId: string }>({
      query: (eventId) => ({
        url: `/events/get/${eventId}`,
        method: "GET",
      }),
      transformResponse: (response: EventResponse) => response.event || {},
      providesTags: ["Events"],
    }),
    // endregion

    //#region getRandomQuiz
    getQuestions: build.query<IQuestionResponse, { eventId: string }>({
      query: ({ eventId }) => ({
        url: `events/${eventId}/questions/random`,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),
    //#endregion

    //#region getReward
    getRewardHooks: build.query<EventRewardResponse, { eventId: string }>({
      query: ({ eventId }) => ({
        url: `events/${eventId}/rewards`,
        method: "GET",
      }),
      providesTags: ["Reward"],
    }),
    //#endregion

    //#region calculateReward
    calculateReward: build.mutation<
      EventReward,
      { eventId: string; correct_answers: number }
    >({
      query: ({ eventId, correct_answers }) => ({
        url: `events/${eventId}/calculate-reward`,
        method: "POST",
        body: { correct_answers },
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
  useGetEventsQuery,
  useGetEventByIDQuery,
  useGetQuestionsQuery,
  useGetRewardHooksQuery,
  useCalculateRewardMutation,
  usePlayEventMutation,
} = apiEvent;
