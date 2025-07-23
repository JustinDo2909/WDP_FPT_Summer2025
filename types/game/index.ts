export {};
declare global {
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
    id?: string;
    event_id?: string;
    min_correct?: number;
    max_correct?: number;
    voucher_quantity?: number;
    discount_value?: number;
    type?: "AMOUNT" | "PERCENT";
  };

  interface IResponseCalculate {
    success?: boolean;
    reward?: EventReward;
    message?: string;
  }

  type EventRewardResponse = {
    success: boolean;
    eventRewards: EventReward[];
  };

  export interface IPlayResponse {
    success?: boolean;
    status?: string;
    message?: string;
  }
  //endregion
  interface GameItem {
    id: number;
    x: number;
    y: number;
    type: "vitamin" | "harmful" | "multiplier";
    name?: string;
    multiplier?: number;
    color: string;
    speed: number;
    points: number;
    imageUrl: string;
  }

  interface Basket {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface PowerUp {
    type: "multiplier";
    value: number;
    timeLeft: number;
  }

  interface GameMode {
    name: string;
    description: string;
    settings: {
      vitaminChance: number;
      harmfulChance: number;
      multiplierChance: number;
      spawnRate: number;
      itemSpeed: { min: number; max: number };
      basketSpeed: number;
      gameTime: number;
      basketSize: { width: number; height: number };
    };
  }

  interface GameLogic {
    score: number;
    timeLeft: number;
    powerUp: PowerUp | null;
    basket: Basket;
    gameItems: GameItem[];
    CANVAS_WIDTH: number;
    CANVAS_HEIGHT: number;
    gameLoopRef: React.MutableRefObject<number>;
    updateGame: () => void;
  }
}
