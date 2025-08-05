export interface IResponseCalculate {
  success?: boolean;
  reward?: IReward;
  message?: string;
}
export interface IReward {
  id?: string;
  event_id?: string;
  min_correct?: number;
  discount_value?: number;
  type?: string;
}

export interface IResponseEventRewards {
  success?: boolean;
  eventRewards?: Array<IEventRewards>;
}
export type IEventRewards = {
  id?: string;
  event_id?: string;
  min_correct?: number;
  discount_value?: number;
  type?: string;
};

export interface IResponseQuestions {
  success?: boolean;
  questions?: Array<IQuestions>;
}
export type IQuestionOptions = {
  content?: string;
  is_correct?: boolean;
};
export type IQuestions = {
  id?: string;
  event_id?: string;
  content?: string;
  image_url?: null;
  questionOptions?: Array<IQuestionOptions>;
};
