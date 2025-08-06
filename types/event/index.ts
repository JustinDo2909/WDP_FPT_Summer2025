export interface Event {
  id: string;
  title: string;
  description: string;
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

// New Leaderboard Reward Types
export interface LeaderboardRewardVoucherTemplate {
  id: string;
  discount_value: number;
  type: "PERCENT" | "AMOUNT";
  user_limit: number;
  user_count: number;
  voucherProducts: Array<{
    product: {
      id: string;
      title: string;
      image_url: string;
    };
  }>;
}

export interface LeaderboardReward {
  id: string;
  event_id: string;
  rank_from: number;
  rank_to: number;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
  voucherTemplates: LeaderboardRewardVoucherTemplate[];
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

// New Leaderboard Reward Form Data
export interface LeaderboardRewardFormData {
  title: string;
  rank_from: number;
  rank_to: number;
  description: string;
}

export interface UpdateLeaderboardRewardFormData {
  rank_from?: number;
  rank_to?: number;
  title?: string;
  description?: string;
  is_active?: boolean;
}

export interface AddVoucherTemplateToRewardRequest {
  discount_value: number;
  type: "PERCENT" | "AMOUNT";
  productIds: string[];
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

// New Leaderboard Reward API Request Types
export interface CreateLeaderboardRewardRequest {
  title: string;
  rank_from: number;
  rank_to: number;
  description: string;
}

export interface UpdateLeaderboardRewardRequest {
  rank_from?: number;
  rank_to?: number;
  title?: string;
  description?: string;
  is_active?: boolean;
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

// New Leaderboard Reward Response Types
export interface LeaderboardRewardsResponse {
  success: boolean;
  rewards: LeaderboardReward[];
}

export interface LeaderboardRewardResponse {
  success: boolean;
  reward: LeaderboardReward;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
}

// Leaderboard Types
export interface LeaderboardUser {
  id: string;
  name: string;
  email: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: LeaderboardUser;
  score: number;
  completion_time: number | null;
  completed_at: string;
  is_eligible_for_reward: boolean;
  rewards: LeaderboardReward[];
}

export interface LeaderboardData {
  event: {
    id: string;
    title: string;
    milestone_score: number;
    is_active: boolean;
  };
  leaderboard: LeaderboardEntry[];
  total_participants: number;
  rewards: LeaderboardReward[];
}

export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardData;
}
