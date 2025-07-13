export {};

declare global {
  type ProductQueryParams = {
    category?: string;
    brand?: string;
    page?: number;
    skinType?: string;
    limit?: number;
    sort?: string;
    title?: string;
    sale?: string;
  };

  type PaginatedResponse<T, N extends string> = Record<N, T[]> & {
    pagination: PaginationMeta;
    success: boolean;
  };

  type PaginationMeta = {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };

  //region Event
  type QuizQuestion = {
    id: string;
    event_id: string;
    content: string;
    image_url: string;
    questionOptions: IAnswerOptions[];
  };

  interface IAnswerOptions {
    content: string;
    is_correct: boolean;
  }

  type IQuestionResponse = {
    success: boolean;
    questions: QuizQuestion[];
  };

  type EventReward = {
    id: string;
    event_id: string;
    min_correct: number;
    max_correct: number;
    voucher_quantity: number;
    discount_value: number;
    type: "AMOUNT" | "PERCENT";
  };

  type EventRewardResponse = {
    success: boolean;
    eventRewards: EventReward[];
  };
  //endregion
}
