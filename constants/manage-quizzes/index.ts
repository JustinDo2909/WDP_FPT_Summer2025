export interface QuizQuestion {
  id: string;
  content: string;
  image?: string;
  timeLimit: number; // seconds
  points: number;
  options: QuizOption[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  order?: number; // for ordering in a game
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  color?: "red" | "blue" | "yellow" | "green";
}

export interface QuizGame {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  questions: QuizQuestion[];
  mode: "individual" | "team";
  type: "live" | "anytime";
  status: "draft" | "active" | "completed" | "disabled";
  createdAt: string;
  updatedAt: string;
  startDate?: string;
  endDate?: string;
  coverImage?: string;
  totalPoints: number;
}

export interface QuizPlayer {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  totalPoints: number;
  gamesPlayed: number;
  lastPlayed: string;
}

export interface QuizGameResult {
  id: string;
  gameId: string;
  playerId: string;
  playerName: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  completedAt: string;
  answers: QuizPlayerAnswer[];
}

export interface QuizPlayerAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpent: number; // seconds
  pointsEarned: number;
}

export interface QuizImage {
  id: string;
  url: string;
  name: string;
  uploadedAt: string;
  usedCount: number;
}
export interface QuizAnalytics {
  totalQuestions: number;
  totalGames: number;
  totalPlayers: number;
  totalPlays: number;
  averageScore: number;
  mostDifficultQuestion: string;
  mostPopularGame: string;
  topPlayers: QuizPlayer[];
  recentActivity: {
    type: "question_created" | "game_created" | "game_played";
    description: string;
    timestamp: Date;
  }[];
}

export const sampleTags = [
  "skincare",
  "makeup",
  "haircare",
  "fragrance",
  "supplements",
  "brand",
  "product",
  "ingredients",
  "routine",
  "seasonal",
];

export const sampleQuestions: QuizQuestion[] = [
  {
    id: "q-001",
    content: "Which ingredient is best for hydrating dry skin?",
    image: "/placeholder.svg?height=300&width=400",
    timeLimit: 20,
    points: 100,
    options: [
      {
        id: "opt-001-1",
        text: "Hyaluronic Acid",
        isCorrect: true,
        color: "red",
      },
      {
        id: "opt-001-2",
        text: "Salicylic Acid",
        isCorrect: false,
        color: "blue",
      },
      { id: "opt-001-3", text: "Retinol", isCorrect: false, color: "yellow" },
      { id: "opt-001-4", text: "Vitamin C", isCorrect: false, color: "green" },
    ],
    tags: ["skincare", "ingredients"],
    createdAt: "2024-05-15T10:30:00Z",
    updatedAt: "2024-05-15T10:30:00Z",
  },
  {
    id: "q-002",
    content:
      "Which of these brands is known for its 'Advanced Night Repair' serum?",
    image: "/placeholder.svg?height=300&width=400",
    timeLimit: 15,
    points: 150,
    options: [
      { id: "opt-002-1", text: "L'Oréal", isCorrect: false, color: "red" },
      { id: "opt-002-2", text: "Estée Lauder", isCorrect: true, color: "blue" },
      { id: "opt-002-3", text: "Clinique", isCorrect: false, color: "yellow" },
      { id: "opt-002-4", text: "Lancôme", isCorrect: false, color: "green" },
    ],
    tags: ["brand", "skincare"],
    createdAt: "2024-05-16T14:20:00Z",
    updatedAt: "2024-05-16T14:20:00Z",
  },
  {
    id: "q-003",
    content: "What is the recommended order for applying skincare products?",
    image: "/placeholder.svg?height=300&width=400",
    timeLimit: 30,
    points: 200,
    options: [
      {
        id: "opt-003-1",
        text: "Moisturizer, Serum, Cleanser",
        isCorrect: false,
        color: "red",
      },
      {
        id: "opt-003-2",
        text: "Cleanser, Moisturizer, Serum",
        isCorrect: false,
        color: "blue",
      },
      {
        id: "opt-003-3",
        text: "Cleanser, Serum, Moisturizer",
        isCorrect: true,
        color: "yellow",
      },
      {
        id: "opt-003-4",
        text: "Serum, Cleanser, Moisturizer",
        isCorrect: false,
        color: "green",
      },
    ],
    tags: ["skincare", "routine"],
    createdAt: "2024-05-17T09:15:00Z",
    updatedAt: "2024-05-17T09:15:00Z",
  },
  {
    id: "q-004",
    content: "Which of these is NOT a common makeup primer base?",
    timeLimit: 20,
    points: 100,
    options: [
      { id: "opt-004-1", text: "Silicone", isCorrect: false, color: "red" },
      { id: "opt-004-2", text: "Water", isCorrect: false, color: "blue" },
      { id: "opt-004-3", text: "Oil", isCorrect: false, color: "yellow" },
      { id: "opt-004-4", text: "Alcohol", isCorrect: true, color: "green" },
    ],
    tags: ["makeup", "ingredients"],
    createdAt: "2024-05-18T16:45:00Z",
    updatedAt: "2024-05-18T16:45:00Z",
  },
  {
    id: "q-005",
    content: "Which hair type is most prone to frizz?",
    image: "/placeholder.svg?height=300&width=400",
    timeLimit: 15,
    points: 100,
    options: [
      { id: "opt-005-1", text: "Straight", isCorrect: false, color: "red" },
      { id: "opt-005-2", text: "Wavy", isCorrect: false, color: "blue" },
      { id: "opt-005-3", text: "Curly", isCorrect: true, color: "yellow" },
      { id: "opt-005-4", text: "Fine", isCorrect: false, color: "green" },
    ],
    tags: ["haircare"],
    createdAt: "2024-05-19T11:30:00Z",
    updatedAt: "2024-05-19T11:30:00Z",
  },
];

export const sampleGames: QuizGame[] = [
  {
    id: "game-001",
    title: "Skincare Basics Quiz",
    description: "Test your knowledge about skincare ingredients and routines",
    duration: 5, // 5 minutes
    questions: [sampleQuestions[0], sampleQuestions[2]],
    mode: "individual",
    type: "anytime",
    status: "active",
    createdAt: "2024-05-20T10:00:00Z",
    updatedAt: "2024-05-20T10:00:00Z",
    totalPoints: 300,
  },
  {
    id: "game-002",
    title: "Beauty Brands Challenge",
    description: "How well do you know your favorite beauty brands?",
    duration: 10, // 10 minutes
    questions: [sampleQuestions[1], sampleQuestions[3], sampleQuestions[4]],
    mode: "individual",
    type: "live",
    status: "completed",
    createdAt: "2024-05-21T14:30:00Z",
    updatedAt: "2024-05-21T14:30:00Z",
    startDate: "2024-05-25T18:00:00Z",
    endDate: "2024-05-25T18:15:00Z",
    totalPoints: 350,
  },
  {
    id: "game-003",
    title: "Hair Care Essentials",
    description: "Learn about hair care products and treatments",
    duration: 7, // 7 minutes
    questions: [sampleQuestions[4], sampleQuestions[0]],
    mode: "team",
    type: "anytime",
    status: "draft",
    createdAt: "2024-05-22T09:45:00Z",
    updatedAt: "2024-05-22T09:45:00Z",
    totalPoints: 200,
  },
];

export const samplePlayers: QuizPlayer[] = [
  {
    id: "player-001",
    userId: "user-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "/placeholder.svg?height=50&width=50",
    totalPoints: 850,
    gamesPlayed: 5,
    lastPlayed: "2024-05-25T18:15:00Z",
  },
  {
    id: "player-002",
    userId: "user-002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    avatar: "/placeholder.svg?height=50&width=50",
    totalPoints: 620,
    gamesPlayed: 3,
    lastPlayed: "2024-05-24T14:20:00Z",
  },
  {
    id: "player-003",
    userId: "user-003",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    avatar: "/placeholder.svg?height=50&width=50",
    totalPoints: 1240,
    gamesPlayed: 8,
    lastPlayed: "2024-05-25T18:15:00Z",
  },
];

export const sampleGameResults: QuizGameResult[] = [
  {
    id: "result-001",
    gameId: "game-001",
    playerId: "player-001",
    playerName: "Sarah Johnson",
    score: 250,
    correctAnswers: 2,
    wrongAnswers: 0,
    completedAt: "2024-05-23T15:30:00Z",
    answers: [
      {
        questionId: "q-001",
        selectedOptionId: "opt-001-1",
        isCorrect: true,
        timeSpent: 12,
        pointsEarned: 100,
      },
      {
        questionId: "q-003",
        selectedOptionId: "opt-003-3",
        isCorrect: true,
        timeSpent: 18,
        pointsEarned: 150, // Bonus for fast answer
      },
    ],
  },
  {
    id: "result-002",
    gameId: "game-001",
    playerId: "player-002",
    playerName: "Michael Chen",
    score: 100,
    correctAnswers: 1,
    wrongAnswers: 1,
    completedAt: "2024-05-23T16:45:00Z",
    answers: [
      {
        questionId: "q-001",
        selectedOptionId: "opt-001-1",
        isCorrect: true,
        timeSpent: 15,
        pointsEarned: 100,
      },
      {
        questionId: "q-003",
        selectedOptionId: "opt-003-2",
        isCorrect: false,
        timeSpent: 25,
        pointsEarned: 0,
      },
    ],
  },
  {
    id: "result-003",
    gameId: "game-002",
    playerId: "player-003",
    playerName: "Emily Davis",
    score: 350,
    correctAnswers: 3,
    wrongAnswers: 0,
    completedAt: "2024-05-25T18:15:00Z",
    answers: [
      {
        questionId: "q-001",
        selectedOptionId: "opt-001-1",
        isCorrect: true,
        timeSpent: 10,
        pointsEarned: 100,
      },
      {
        questionId: "q-003",
        selectedOptionId: "opt-003-3",
        isCorrect: true,
        timeSpent: 20,
        pointsEarned: 150,
      },
      {
        questionId: "q-004",
        selectedOptionId: "opt-004-4",
        isCorrect: true,
        timeSpent: 12,
        pointsEarned: 100,
      },
    ],
  },
];

export const sampleImages: QuizImage[] = [
  {
    id: "img-001",
    url: "/placeholder.svg?height=300&width=400&text=Skincare",
    name: "skincare-ingredients.jpg",
    uploadedAt: "2024-05-15T10:00:00Z",
    usedCount: 2,
  },
  {
    id: "img-002",
    url: "/placeholder.svg?height=300&width=400&text=Brands",
    name: "beauty-brands.jpg",
    uploadedAt: "2024-05-16T14:00:00Z",
    usedCount: 1,
  },
  {
    id: "img-003",
    url: "/placeholder.svg?height=300&width=400&text=Routine",
    name: "skincare-routine.jpg",
    uploadedAt: "2024-05-17T09:00:00Z",
    usedCount: 1,
  },
  {
    id: "img-004",
    url: "/placeholder.svg?height=300&width=400&text=Hair",
    name: "hair-types.jpg",
    uploadedAt: "2024-05-19T11:00:00Z",
    usedCount: 1,
  },
];

export const sampleAnalytics: QuizAnalytics = {
  totalQuestions: 3,
  totalGames: 2,
  totalPlayers: 245,
  totalPlays: 279,
  averageScore: 78.9,
  mostDifficultQuestion: "Thành phần nào giúp chống lão hóa hiệu quả nhất?",
  mostPopularGame: "Skincare Basics Quiz",
  topPlayers: samplePlayers,
  recentActivity: [
    {
      type: "game_played",
      description: "Nguyễn Thị Lan completed Skincare Basics Quiz",
      timestamp: new Date("2024-01-22T10:30:00"),
    },
    {
      type: "question_created",
      description: "New question added: Skincare Routine basics",
      timestamp: new Date("2024-01-22T09:15:00"),
    },
    {
      type: "game_created",
      description: "New game created: Brand Knowledge Challenge",
      timestamp: new Date("2024-01-21T14:20:00"),
    },
  ],
};
