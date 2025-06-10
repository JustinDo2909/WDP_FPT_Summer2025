import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  Event,
  Question,
  EventReward,
  EventsResponse,
  EventResponse,
  QuestionsResponse,
  RewardsResponse,
  ApiResponse,
  CreateEventRequest,
  UpdateEventRequest,
  CreateQuestionRequest,
  UpdateQuestionRequest,
  CreateRewardRequest,
  UpdateRewardRequest,
} from "@/types/event";
import customBaseQuery from "./customFetchBase";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Event", "Question", "Reward"],
  endpoints: (builder) => ({
    // Event endpoints
    getAllEvents: builder.query<Event[], void>({
      query: () => "/events/get",
      transformResponse: (response: EventsResponse) => response.events,
      providesTags: ["Event"],
    }),

    getEventById: builder.query<Event, string>({
      query: (id) => `/events/get/${id}`,
      transformResponse: (response: EventResponse) => response.event,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    createEvent: builder.mutation<ApiResponse, CreateEventRequest>({
      query: (eventData) => ({
        url: "/events/add",
        method: "POST",
        body: eventData,
      }),
      invalidatesTags: ["Event"],
    }),

    updateEvent: builder.mutation<ApiResponse, UpdateEventRequest>({
      query: ({ id, ...eventData }) => ({
        url: `/events/update/${id}`,
        method: "PUT",
        body: eventData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Event", id },
        "Event",
      ],
    }),

    deleteEvent: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event", "Question", "Reward"],
    }),

    // Question endpoints
    getQuestionsByEventId: builder.query<Question[], string>({
      query: (eventId) => `/events/${eventId}/questions`,
      transformResponse: (response: QuestionsResponse) => response.questions,
      providesTags: (result, error, eventId) => [
        { type: "Question", id: eventId },
        "Question",
      ],
    }),

    createQuestion: builder.mutation<ApiResponse, CreateQuestionRequest>({
      query: ({ event_id, ...questionData }) => ({
        url: `/events/${event_id}/questions/add`,
        method: "POST",
        body: questionData,
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Question", id: event_id },
        "Question",
      ],
    }),

    updateQuestion: builder.mutation<ApiResponse, UpdateQuestionRequest>({
      query: ({ id, event_id, ...questionData }) => ({
        url: `/events/${event_id}/questions/update/${id}`,
        method: "PUT",
        body: questionData,
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Question", id: event_id },
        "Question",
      ],
    }),

    deleteQuestion: builder.mutation<
      ApiResponse,
      { id: string; event_id: string }
    >({
      query: ({ id, event_id }) => ({
        url: `/events/${event_id}/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Question", id: event_id },
        "Question",
      ],
    }),

    // Reward endpoints
    getRewardsByEventId: builder.query<EventReward[], string>({
      query: (eventId) => `/events/${eventId}/rewards`,
      transformResponse: (response: RewardsResponse) => response.eventRewards,
      providesTags: (result, error, eventId) => [
        { type: "Reward", id: eventId },
        "Reward",
      ],
    }),

    createReward: builder.mutation<ApiResponse, CreateRewardRequest>({
      query: ({ event_id, ...rewardData }) => ({
        url: `/events/${event_id}/rewards/add`,
        method: "POST",
        body: rewardData,
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Reward", id: event_id },
        "Reward",
      ],
    }),

    updateReward: builder.mutation<ApiResponse, UpdateRewardRequest>({
      query: ({ id, event_id, ...rewardData }) => ({
        url: `/events/${event_id}/rewards/update/${id}`,
        method: "PUT",
        body: rewardData,
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Reward", id: event_id },
        "Reward",
      ],
    }),

    deleteReward: builder.mutation<
      ApiResponse,
      { id: string; event_id: string }
    >({
      query: ({ id, event_id }) => ({
        url: `/events/${event_id}/rewards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { event_id }) => [
        { type: "Reward", id: event_id },
        "Reward",
      ],
    }),
  }),
});

export const {
  // Event hooks
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,

  // Question hooks
  useGetQuestionsByEventIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,

  // Reward hooks
  useGetRewardsByEventIdQuery,
  useCreateRewardMutation,
  useUpdateRewardMutation,
  useDeleteRewardMutation,
} = eventApi;
