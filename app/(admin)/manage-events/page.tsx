"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Calendar,
  Trophy,
  HelpCircle,
  Users,
  Gift,
  Plus,
  X,
} from "lucide-react";
import { StatsCard, MiniStatsCard } from "@/components/admin/StatsCard";
import CustomTable from "@/components/CustomTable";
import { EventModal } from "@/components/admin/Event/Event-modal";
import { QuestionModal } from "@/components/admin/Event/Question-modal";
import { RewardModal } from "@/components/admin/Event/Reward-modal";
import { EventRewardModal } from "@/components/admin/Event/EventReward-modal";
import type { Event, Question, EventReward } from "@/types/event";
import { RText, Yard, Core, Container, Area } from "@/lib/by/Div";

import {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetQuestionsByEventIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetRewardsByEventIdQuery,
  useCreateRewardMutation,
  useUpdateRewardMutation,
  useDeleteRewardMutation,
} from "@/process/api/api";

import {
  calculateEventStats,
  calculateQuestionStats,
  calculateRewardStats,
} from "@/components/admin/Event/seg/utils";

export default function EventManagement() {
  const [activeTab, setActiveTab] = useState<"events" | "rewards">("events");
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [showEventQuestions, setShowEventQuestions] = useState<string | null>(
    null,
  );

  const [eventModal, setEventModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit",
    event: null as Event | null,
  });
  const [questionModal, setQuestionModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit",
    question: null as Question | null,
  });
  const [rewardModal, setRewardModal] = useState({
    isOpen: false,
    mode: "create" as "create" | "edit",
    reward: null as EventReward | null,
  });
  const [eventRewardModal, setEventRewardModal] = useState({
    isOpen: false,
  });

  // API hooks with optimized skipping logic
  const { data: events = [], isLoading: eventsLoading } = useGetAllEventsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: 30, // Cache for 30 seconds
    },
  );

  const { data: questions = [] } = useGetQuestionsByEventIdQuery(
    showEventQuestions!,
    {
      skip: !showEventQuestions,
      refetchOnMountOrArgChange: 30,
    },
  );

  const { data: rewards = [] } = useGetRewardsByEventIdQuery(selectedEventId!, {
    skip: !selectedEventId || activeTab !== "rewards",
    refetchOnMountOrArgChange: 30,
  });

  // Optimized effect for setting initial selectedEventId
  useEffect(() => {
    if (events.length > 0 && !selectedEventId && activeTab === "rewards") {
      setSelectedEventId(events[0].id);
    }
  }, [events.length, selectedEventId, activeTab]); // More specific dependencies

  // Optimized effect for tab switching
  useEffect(() => {
    if (activeTab === "rewards" && showEventQuestions) {
      setShowEventQuestions(null);
    }
  }, [activeTab]); // Remove showEventQuestions from dependencies to prevent unnecessary reruns

  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [createQuestion] = useCreateQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [createReward] = useCreateRewardMutation();
  const [updateReward] = useUpdateRewardMutation();
  const [deleteReward] = useDeleteRewardMutation();

  // Memoized computed values
  const filteredRewards = useMemo(
    () => (selectedEventId ? rewards : []),
    [selectedEventId, rewards],
  );

  const allQuestions = useMemo(() => [], []); // Empty array if not needed

  const eventStats = useMemo(() => calculateEventStats(events), [events]);

  const questionStats = useMemo(
    () => calculateQuestionStats(allQuestions, events),
    [allQuestions, events],
  );

  const rewardStats = useMemo(() => calculateRewardStats(rewards), [rewards]);

  // Memoized stat values
  const { totalEvents, activeEvents } = eventStats;
  const { totalQuestions } = questionStats;
  const { totalRewards } = rewardStats;

  // Memoized table columns
  const eventColumns = useMemo(
    () => [
      {
        key: "title" as keyof Event,
        label: "Title",
        sortable: true,
      },
      {
        key: "description" as keyof Event,
        label: "Description",
        render: (event: Event) => (
          <Yard className="max-w-xs truncate" title={event.description}>
            {event.description}
          </Yard>
        ),
      },
      {
        key: "start_time" as keyof Event,
        label: "Start Time",
        render: (event: Event) =>
          new Date(event.start_time).toLocaleDateString(),
        sortable: true,
      },
      {
        key: "end_time" as keyof Event,
        label: "End Time",
        render: (event: Event) => new Date(event.end_time).toLocaleDateString(),
        sortable: true,
      },
      {
        key: "type" as keyof Event,
        label: "Type",
        render: (event: Event) => (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {event.type}
          </span>
        ),
        sortable: true,
      },
      {
        key: "is_active" as keyof Event,
        label: "Status",
        render: (event: Event) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              event.is_active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {event.is_active ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        key: "questions" as keyof Event,
        label: "Questions",
        render: (event: Event) =>
          event.type === "QUIZ" ? (
            <button
              onClick={() => setShowEventQuestions(event.id)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View questions
            </button>
          ) : (
            <span className="text-gray-400 text-sm"></span>
          ),
      },
    ],
    [],
  );

  const questionColumns = useMemo(
    () => [
      {
        key: "content" as keyof Question,
        label: "Question",
        render: (question: Question) => (
          <Yard className="max-w-md truncate" title={question.content}>
            {question.content}
          </Yard>
        ),
      },
      {
        key: "questionOptions" as keyof Question,
        label: "Correct Answer",
        render: (question: Question) => {
          const correctOption = question.questionOptions.find(
            (opt) => opt.is_correct,
          );
          return (
            <Yard className="max-w-xs truncate text-green-600 font-medium">
              {correctOption?.content || "N/A"}
            </Yard>
          );
        },
      },
      {
        key: "image_url" as keyof Question,
        label: "Has Image",
        render: (question: Question) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              question.image_url
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {question.image_url ? "Yes" : "No"}
          </span>
        ),
      },
    ],
    [],
  );

  const rewardColumns = useMemo(
    () => [
      {
        key: "min_correct" as keyof EventReward,
        label: "Min Correct",
        sortable: true,
      },
      {
        key: "max_correct" as keyof EventReward,
        label: "Max Correct",
        sortable: true,
      },
      {
        key: "voucher_quantity" as keyof EventReward,
        label: "Voucher Qty",
        sortable: true,
      },
      {
        key: "discount_value" as keyof EventReward,
        label: "Reward Value",
        render: (reward: EventReward) => (
          <span className="font-medium text-green-600">
            {reward.type === "AMOUNT"
              ? `${reward.discount_value.toLocaleString()} VND`
              : `${reward.discount_value}%`}
          </span>
        ),
        sortable: true,
      },
      {
        key: "type" as keyof EventReward,
        label: "Type",
        render: (reward: EventReward) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              reward.type === "AMOUNT"
                ? "bg-blue-100 text-blue-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {reward.type === "AMOUNT" ? "Fixed Amount" : "Percentage"}
          </span>
        ),
      },
    ],
    [],
  );

  // Optimized event handlers with useCallback
  const handleEventSave = useCallback(
    async (eventData: Partial<Event>) => {
      try {
        if (eventModal.mode === "create") {
          await createEvent({
            title: eventData.title || "",
            description: eventData.description || "",
            start_time: eventData.start_time || "",
            end_time: eventData.end_time || "",
            type: eventData.type || "QUIZ",
            is_active: eventData.is_active ?? true,
          }).unwrap();
        } else if (eventModal.event) {
          await updateEvent({
            id: eventModal.event.id,
            title: eventData.title,
            description: eventData.description,
            start_time: eventData.start_time,
            end_time: eventData.end_time,
            type: eventData.type,
            is_active: eventData.is_active,
          }).unwrap();
        }
        setEventModal({ isOpen: false, mode: "create", event: null });
      } catch (error) {
        console.error("Error saving event:", error);
        alert("Error saving event. Please try again.");
      }
    },
    [eventModal.mode, eventModal.event, createEvent, updateEvent],
  );

  const handleQuestionSave = useCallback(
    async (questionData: Partial<Question>) => {
      try {
        if (questionModal.mode === "create") {
          await createQuestion({
            event_id: questionData.event_id || "",
            content: questionData.content || "",
            image_url: questionData.image_url,
            questionOptions: questionData.questionOptions || [],
          }).unwrap();
        } else if (questionModal.question) {
          await updateQuestion({
            id: questionModal.question.id,
            event_id: questionModal.question.event_id,
            content: questionData.content,
            image_url: questionData.image_url,
            questionOptions: questionData.questionOptions,
          }).unwrap();
        }
        setQuestionModal({ isOpen: false, mode: "create", question: null });
      } catch (error) {
        console.error("Error saving question:", error);
        alert("Error saving question. Please try again.");
      }
    },
    [
      questionModal.mode,
      questionModal.question,
      createQuestion,
      updateQuestion,
    ],
  );

  const handleRewardSave = useCallback(
    async (rewardData: Partial<EventReward>) => {
      try {
        if (rewardModal.mode === "create") {
          await createReward({
            event_id: rewardData.event_id || "",
            min_correct: rewardData.min_correct || 0,
            max_correct: rewardData.max_correct || rewardData.min_correct || 0,
            voucher_quantity: rewardData.voucher_quantity || 100,
            discount_value: rewardData.discount_value || 0,
            type: rewardData.type || "AMOUNT",
          }).unwrap();
        } else if (rewardModal.reward) {
          await updateReward({
            id: rewardModal.reward.id,
            event_id: rewardModal.reward.event_id,
            min_correct: rewardData.min_correct,
            discount_value: rewardData.discount_value,
            type: rewardData.type,
          }).unwrap();
        }
        setRewardModal({ isOpen: false, mode: "create", reward: null });
      } catch (error) {
        console.error("Error saving reward:", error);
        alert("Error saving reward. Please try again.");
      }
    },
    [rewardModal.mode, rewardModal.reward, createReward, updateReward],
  );

  const handleEventRewardSave = useCallback(
    async (rewardData: {
      event_id: string;
      min_correct: number;
      max_correct: number;
      voucher_quantity: number;
      discount_value: number;
      type: "AMOUNT" | "PERCENT";
    }) => {
      try {
        await createReward({
          event_id: rewardData.event_id,
          min_correct: rewardData.min_correct,
          max_correct: rewardData.max_correct,
          voucher_quantity: rewardData.voucher_quantity,
          discount_value: rewardData.discount_value,
          type: rewardData.type,
        }).unwrap();
        setEventRewardModal({ isOpen: false });
        alert("Event reward created successfully!");
      } catch (error) {
        console.error("Error creating event reward:", error);
        alert("Error creating event reward. Please try again.");
      }
    },
    [createReward]
  );

  const tabConfig = useMemo(
    () => [
      { key: "events", label: "Events", icon: Calendar },
      { key: "rewards", label: "Rewards", icon: Gift },
    ],
    [],
  );

  // Event handlers for delete operations
  const handleDeleteQuestion = useCallback(
    async (question: Question) => {
      if (confirm("Are you sure you want to delete this question?")) {
        try {
          await deleteQuestion({
            id: question.id,
            event_id: question.event_id,
          }).unwrap();
        } catch (error) {
          console.error("Error deleting question:", error);
          alert("Error deleting question. Please try again.");
        }
      }
    },
    [deleteQuestion],
  );

  const handleDeleteEvent = useCallback(
    async (event: Event) => {
      if (confirm("Are you sure you want to delete this event?")) {
        try {
          await deleteEvent(event.id).unwrap();
        } catch (error) {
          console.error("Error deleting event:", error);
          alert("Error deleting event. Please try again.");
        }
      }
    },
    [deleteEvent],
  );

  const handleDeleteReward = useCallback(
    async (reward: EventReward) => {
      if (confirm("Are you sure you want to delete this reward?")) {
        try {
          await deleteReward({
            id: reward.id,
            event_id: reward.event_id,
          }).unwrap();
        } catch (error) {
          console.error("Error deleting reward:", error);
          alert("Error deleting reward. Please try again.");
        }
      }
    },
    [deleteReward],
  );

  // Memoized export handler
  const handleExport = useCallback(() => {
    const csv = events
      .map(
        (e) =>
          `${e.title},${e.description},${e.start_time},${e.end_time},${e.is_active}`,
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.csv";
    a.click();
    URL.revokeObjectURL(url); // Clean up
  }, [events]);

  if (eventsLoading) {
    return (
      <Core className="flex flex-col h-full bg-gray-50">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4">
          <RText className="text-lg font-semibold text-gray-700">
            Event Management
          </RText>
        </header>
        <Container className="max-w-7xl mx-auto space-y-6 p-6">
          <RText>Loading...</RText>
        </Container>
      </Core>
    );
  }

  return (
    <Core className="flex flex-col h-full bg-gray-50">
      <header className="flex h-16 items-center justify-between border-b bg-white px-4">
        <RText className="text-lg font-semibold text-gray-700">
          Event Management
        </RText>
      </header>
      <Container className="flex-1 overflow-auto p-6 space-y-6">
        {/* Header */}
        <Area>
          <RText className="text-gray-600">
            Manage your events, questions, and rewards
          </RText>
        </Area>

        {/* Stats Cards */}
        <Yard className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Events"
            value={totalEvents}
            icon={Calendar}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Active Events"
            value={activeEvents}
            icon={Users}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <StatsCard
            title="Total Questions"
            value={totalQuestions}
            icon={HelpCircle}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <StatsCard
            title="Total Rewards"
            value={totalRewards}
            icon={Trophy}
            iconColor="text-yellow-600"
            iconBgColor="bg-yellow-100"
          />
        </Yard>

        {/* Mini Stats */}
        <Yard className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MiniStatsCard
            value={activeEvents}
            label="Active"
            valueColor="text-blue-600"
          />
          <MiniStatsCard
            value={totalEvents - activeEvents}
            label="Inactive"
            valueColor="text-purple-600"
          />
          <MiniStatsCard
            value={questions.length}
            label="Questions"
            valueColor="text-green-600"
          />
          <MiniStatsCard
            value={filteredRewards.length}
            label="Rewards"
            valueColor="text-red-600"
          />
        </Yard>

        {/* Tab Navigation */}
        <Yard className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabConfig.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as "events" | "rewards")}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </Yard>

        {/* Event Filter for Rewards */}
        {activeTab === "rewards" && (
          <Yard className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <Yard className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Filter by Event
              </label>
              <RText className="text-xs text-gray-500">
                Found {rewards.length} rewards for selected event
              </RText>
            </Yard>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </Yard>
        )}

        {/* Event Questions Section */}
        {showEventQuestions && (
          <Yard className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Yard className="p-6 border-b border-gray-200 flex items-center justify-between">
              <Yard>
                <RText className="text-lg font-semibold text-gray-800">
                  Questions for:{" "}
                  {events.find((e) => e.id === showEventQuestions)?.title}
                </RText>
                <RText className="text-sm text-gray-500 mt-1">
                  Found {questions.length} questions for this event
                </RText>
              </Yard>
              <Yard className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setQuestionModal({
                      isOpen: true,
                      mode: "create",
                      question: null,
                    })
                  }
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Question
                </button>
                <button
                  onClick={() => setShowEventQuestions(null)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </Yard>
            </Yard>

            <CustomTable
              data={questions}
              columns={questionColumns}
              headerTitle=""
              showSearch={false}
              onUpdate={(question) =>
                setQuestionModal({ isOpen: true, mode: "edit", question })
              }
              onDelete={handleDeleteQuestion}
            />
          </Yard>
        )}

        {/* Content based on active tab */}
        {!showEventQuestions && activeTab === "events" && (
          <Yard className="space-y-4">
            {/* Custom Header with Two Buttons */}
            <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Yard className="flex justify-between items-start mb-4">
                <Yard>
                  <h2 className="text-lg font-semibold text-gray-800">
                    All Events
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Click on &apos;View questions&apos; to manage event
                    questions
                  </p>
                </Yard>
                <Yard className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setEventModal({
                        isOpen: true,
                        mode: "create",
                        event: null,
                      })
                    }
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Event
                  </button>
                  <button
                    onClick={() => setEventRewardModal({ isOpen: true })}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors"
                  >
                    <Gift className="w-4 h-4" />
                    Add Event Reward
                  </button>
                </Yard>
              </Yard>
            </Yard>

            <CustomTable
              data={events}
              columns={eventColumns}
              onUpdate={(event) =>
                setEventModal({ isOpen: true, mode: "edit", event })
              }
              onDelete={handleDeleteEvent}
              showExport={true}
              onExport={handleExport}
              showSearch={true}
            />
          </Yard>
        )}

        {!showEventQuestions && activeTab === "rewards" && selectedEventId && (
          <CustomTable
            data={rewards}
            columns={rewardColumns}
            headerTitle="Event Rewards"
            description="Configure rewards based on correct answers"
            onAddItem={() =>
              setRewardModal({ isOpen: true, mode: "create", reward: null })
            }
            onUpdate={(reward) =>
              setRewardModal({ isOpen: true, mode: "edit", reward })
            }
            onDelete={handleDeleteReward}
          />
        )}

        {!showEventQuestions && activeTab === "rewards" && !selectedEventId && (
          <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <RText className="text-gray-500">
              Please select an event to view and manage rewards
            </RText>
          </Yard>
        )}
      </Container>
      {/* Modals */}
      <EventModal
        isOpen={eventModal.isOpen}
        onClose={() => setEventModal({ ...eventModal, isOpen: false })}
        onSave={handleEventSave}
        event={eventModal.event}
        mode={eventModal.mode}
      />

      <QuestionModal
        isOpen={questionModal.isOpen}
        onClose={() => setQuestionModal({ ...questionModal, isOpen: false })}
        onSave={handleQuestionSave}
        question={questionModal.question}
        mode={questionModal.mode}
        eventId={showEventQuestions || ""}
      />

      <RewardModal
        isOpen={rewardModal.isOpen}
        onClose={() => setRewardModal({ ...rewardModal, isOpen: false })}
        onSave={handleRewardSave}
        reward={rewardModal.reward}
        mode={rewardModal.mode}
        eventId={selectedEventId}
      />

      <EventRewardModal
        isOpen={eventRewardModal.isOpen}
        onClose={() => setEventRewardModal({ isOpen: false })}
        onSave={handleEventRewardSave}
        events={events}
      />
    </Core>
  );
}
