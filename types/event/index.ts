export interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string;
  start_time: string;
  end_time: string;
  type: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  questions?: Question[];
  rewards?: EventReward[];
}

export interface QuestionOption {
  id: string;
  content: string;
  is_correct: boolean;
  question_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  event_id: string;
  content: string;
  image_url?: string;
  createdAt: string;
  updatedAt: string;
  questionOptions: QuestionOption[];
  event?: Event;
}

export interface EventReward {
  id: string;
  event_id: string;
  min_correct: number;
  max_correct: number;
  voucher_quantity: number;
  discount_value: number;
  type: "AMOUNT" | "PERCENT";
  createdAt: string;
  updatedAt: string;
  event?: Event;
}

// Form Data Types for Components
export interface EventFormData {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface QuestionFormData {
  content: string;
  image_url?: string;
  questionOptions: Array<{
    content: string;
    is_correct: boolean;
  }>;
}

export interface RewardFormData {
  min_correct: number;
  discount_value: number;
  type: "AMOUNT" | "PERCENT";
}

// API Request Types
export interface CreateEventRequest {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  type: string;
  is_active: boolean;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: string;
}

export interface CreateQuestionRequest {
  event_id: string;
  content: string;
  image_url?: string;
  questionOptions: Array<{
    content: string;
    is_correct: boolean;
  }>;
}

export interface UpdateQuestionRequest extends Partial<CreateQuestionRequest> {
  id: string;
}

export interface CreateRewardRequest {
  event_id: string;
  min_correct: number;
  max_correct: number;
  voucher_quantity: number;
  discount_value: number;
  type: "AMOUNT" | "PERCENT";
}

export interface UpdateRewardRequest extends Partial<CreateRewardRequest> {
  id: string;
}

// Response Types
export interface EventsResponse {
  success: boolean;
  events: Event[];
}

export interface EventResponse {
  success: boolean;
  event: Event;
}

export interface QuestionsResponse {
  success: boolean;
  questions: Question[];
}

export interface RewardsResponse {
  success: boolean;
  eventRewards: EventReward[];
}

export interface ApiResponse {
  success: boolean;
  message?: string;
}
