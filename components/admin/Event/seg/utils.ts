import type {
  Event,
  Question,
  EventReward,
  QuestionOption,
} from "@/types/event";

// Table Logic Functions
export const filterTableData = <T>(
  data: T[],
  columns: Array<{ key: keyof T; label: string }>,
  searchTerm: string,
  activeFilters: { [key: string]: string }
): T[] => {
  return data.filter((row) => {
    const matchesSearch = columns.some((col) =>
      String(row[col.key] ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const matchesFilters = Object.entries(activeFilters).every(
      ([key, value]) => {
        if (!value) return true;
        return String(row[key as keyof T]) === value;
      }
    );

    return matchesSearch && matchesFilters;
  });
};

export const sortTableData = <T>(
  data: T[],
  sortConfig: { key: keyof T; direction: "asc" | "desc" } | null
): T[] => {
  if (!sortConfig) return data;

  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const paginateData = <T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): { paginatedData: T[]; totalPages: number } => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return { paginatedData, totalPages };
};

export const handleTableSort = <T>(
  currentSortConfig: { key: keyof T; direction: "asc" | "desc" } | null,
  key: keyof T
): { key: keyof T; direction: "asc" | "desc" } => {
  if (currentSortConfig?.key === key) {
    return {
      key,
      direction: currentSortConfig.direction === "asc" ? "desc" : "asc",
    };
  }
  return { key, direction: "asc" };
};

export const handleTableFilter = (
  activeFilters: { [key: string]: string },
  key: string,
  value: string
): { [key: string]: string } => {
  return { ...activeFilters, [key]: value };
};

// Event Logic Functions
export const validateEventForm = (formData: {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  type: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.title.trim()) {
    errors.push("Title is required");
  }

  if (!formData.description.trim()) {
    errors.push("Description is required");
  }

  if (!formData.start_time) {
    errors.push("Start time is required");
  }

  if (!formData.end_time) {
    errors.push("End time is required");
  }

  if (formData.start_time && formData.end_time) {
    const startDate = new Date(formData.start_time);
    const endDate = new Date(formData.end_time);

    if (startDate >= endDate) {
      errors.push("End time must be after start time");
    }

    if (startDate < new Date()) {
      errors.push("Start time cannot be in the past");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const formatEventData = (formData: {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  type: string;
  is_active: boolean;
}): Partial<Event> => {
  return {
    ...formData,
    start_time: new Date(formData.start_time).toISOString(),
    end_time: new Date(formData.end_time).toISOString(),
  };
};

export const createNewEvent = (eventData: Partial<Event>): Event => {
  return {
    ...eventData,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  } as Event;
};

export const updateEvent = (
  events: Event[],
  eventId: string,
  eventData: Partial<Event>
): Event[] => {
  return events.map((e) => (e.id === eventId ? { ...e, ...eventData } : e));
};

export const deleteEvent = (events: Event[], eventId: string): Event[] => {
  return events.filter((e) => e.id !== eventId);
};

// Question Logic Functions
export const validateQuestionForm = (formData: {
  content: string;
  questionOptions: QuestionOption[];
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.content.trim()) {
    errors.push("Question content is required");
  }

  // Check if all options have content
  const emptyOptions = formData.questionOptions.filter(
    (opt) => !opt.content.trim()
  );
  if (emptyOptions.length > 0) {
    errors.push("All answer options must have content");
  }

  // Check if exactly one answer is correct
  const correctAnswers = formData.questionOptions.filter(
    (opt) => opt.is_correct
  );
  if (correctAnswers.length !== 1) {
    errors.push("Exactly one answer must be marked as correct");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const createNewQuestion = (
  questionData: Partial<Question>
): Question => {
  return {
    ...questionData,
    id: Date.now().toString(),
  } as Question;
};

export const updateQuestion = (
  questions: Question[],
  questionId: string,
  questionData: Partial<Question>
): Question[] => {
  return questions.map((q) =>
    q.id === questionId ? { ...q, ...questionData } : q
  );
};

export const deleteQuestion = (
  questions: Question[],
  questionId: string
): Question[] => {
  return questions.filter((q) => q.id !== questionId);
};

export const getQuestionsByEventId = (
  questions: Question[],
  eventId: string
): Question[] => {
  return questions.filter((q) => q.event_id === eventId);
};

export const shuffleQuestions = (questions: Question[]): Question[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getCorrectAnswer = (
  question: Question
): QuestionOption | undefined => {
  return question.questionOptions.find((opt) => opt.is_correct);
};

// Reward Logic Functions
export const validateRewardForm = (formData: {
  min_correct: number;
  discount_value: number;
  type: "AMOUNT" | "PERCENT";
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (formData.min_correct < 0) {
    errors.push("Minimum correct answers cannot be negative");
  }

  if (formData.discount_value <= 0) {
    errors.push("Discount value must be greater than 0");
  }

  if (formData.type === "PERCENT" && formData.discount_value > 100) {
    errors.push("Percentage discount cannot exceed 100%");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const createNewReward = (
  rewardData: Partial<EventReward>
): EventReward => {
  return {
    ...rewardData,
    id: Date.now().toString(),
  } as EventReward;
};

export const updateReward = (
  rewards: EventReward[],
  rewardId: string,
  rewardData: Partial<EventReward>
): EventReward[] => {
  return rewards.map((r) => (r.id === rewardId ? { ...r, ...rewardData } : r));
};

export const deleteReward = (
  rewards: EventReward[],
  rewardId: string
): EventReward[] => {
  return rewards.filter((r) => r.id !== rewardId);
};

export const getRewardsByEventId = (
  rewards: EventReward[],
  eventId: string
): EventReward[] => {
  return rewards.filter((r) => r.event_id === eventId);
};

export const calculateEventReward = (
  rewards: EventReward[],
  correctAnswers: number
): EventReward | null => {
  // Sort rewards by min_correct in descending order to get the highest applicable reward
  const sortedRewards = rewards
    .filter((reward) => correctAnswers >= reward.min_correct)
    .sort((a, b) => b.min_correct - a.min_correct);

  return sortedRewards[0] || null;
};

export const formatRewardValue = (reward: EventReward): string => {
  if (reward.type === "AMOUNT") {
    return `${reward.discount_value.toLocaleString()} VND`;
  }
  return `${reward.discount_value}%`;
};

// Statistics Logic Functions
export const calculateEventStats = (events: Event[]) => {
  const totalEvents = events.length;
  const activeEvents = events.filter((e) => e.is_active).length;
  const inactiveEvents = totalEvents - activeEvents;

  return {
    totalEvents,
    activeEvents,
    inactiveEvents,
  };
};

export const calculateQuestionStats = (
  questions: Question[],
  events: Event[]
) => {
  const totalQuestions = questions.length;
  const questionsByEvent = events.map((event) => ({
    eventId: event.id,
    eventTitle: event.title,
    questionCount: questions.filter((q) => q.event_id === event.id).length,
  }));

  return {
    totalQuestions,
    questionsByEvent,
  };
};

export const calculateRewardStats = (rewards: EventReward[]) => {
  const totalRewards = rewards.length;
  const amountRewards = rewards.filter((r) => r.type === "AMOUNT").length;
  const percentageRewards = rewards.filter((r) => r.type === "PERCENT").length;

  const averageMinCorrect =
    rewards.length > 0
      ? rewards.reduce((sum, r) => sum + r.min_correct, 0) / rewards.length
      : 0;

  return {
    totalRewards,
    amountRewards,
    percentageRewards,
    averageMinCorrect: Math.round(averageMinCorrect),
  };
};

// Date and Time Utilities
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateTimeForInput = (dateString: string): string => {
  return dateString.slice(0, 16);
};

export const isEventActive = (event: Event): boolean => {
  const now = new Date();
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);

  return event.is_active && now >= startTime && now <= endTime;
};

export const getEventStatus = (
  event: Event
): "upcoming" | "active" | "ended" | "inactive" => {
  if (!event.is_active) return "inactive";

  const now = new Date();
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);

  if (now < startTime) return "upcoming";
  if (now > endTime) return "ended";
  return "active";
};

// Game Logic Functions
export const playEvent = (
  questions: Question[],
  answers: { questionId: string; selectedOption: string }[]
) => {
  let correctCount = 0;
  const results = answers.map((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return { questionId: answer.questionId, isCorrect: false };

    const correctOption = question.questionOptions.find(
      (opt) => opt.is_correct
    );
    const isCorrect = correctOption?.content === answer.selectedOption;

    if (isCorrect) correctCount++;

    return {
      questionId: answer.questionId,
      selectedOption: answer.selectedOption,
      correctOption: correctOption?.content,
      isCorrect,
    };
  });

  return {
    correctCount,
    totalQuestions: questions.length,
    percentage: Math.round((correctCount / questions.length) * 100),
    results,
  };
};

// Export all functions as a single object for easier importing
export const EventManagementLogic = {
  // Table functions
  filterTableData,
  sortTableData,
  paginateData,
  handleTableSort,
  handleTableFilter,

  // Event functions
  validateEventForm,
  formatEventData,
  createNewEvent,
  updateEvent,
  deleteEvent,

  // Question functions
  validateQuestionForm,
  createNewQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByEventId,
  shuffleQuestions,
  getCorrectAnswer,

  // Reward functions
  validateRewardForm,
  createNewReward,
  updateReward,
  deleteReward,
  getRewardsByEventId,
  calculateEventReward,
  formatRewardValue,

  // Statistics functions
  calculateEventStats,
  calculateQuestionStats,
  calculateRewardStats,

  // Utility functions
  formatDateTime,
  formatDateTimeForInput,
  isEventActive,
  getEventStatus,
  playEvent,
};
