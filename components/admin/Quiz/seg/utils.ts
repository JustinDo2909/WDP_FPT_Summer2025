"use client";

import type React from "react";

import { useState, useCallback } from "react";
import {
  type QuizQuestion,
  type QuizGame,
  type QuizPlayer,
  type QuizGameResult,
  type QuizImage,
  type QuizOption,
  type QuizAnalytics,
  sampleQuestions,
  sampleGames,
  samplePlayers,
  sampleGameResults,
  sampleImages,
  sampleTags,
  sampleAnalytics,
} from "@/constants/manage-quizzes/index";

// Question management
export const useQuestionManagement = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(sampleQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<QuizQuestion | null>(
    null
  );
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(sampleTags);

  // Filter questions based on search term and tags
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => question.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setIsQuestionModalOpen(true);
  };

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setIsQuestionModalOpen(true);
  };

  const handlePreviewQuestion = (question: QuizQuestion) => {
    setSelectedQuestion(question);
    setIsPreviewModalOpen(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      setSelectedQuestion(question);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteQuestion = () => {
    if (selectedQuestion) {
      setQuestions((prev) => prev.filter((q) => q.id !== selectedQuestion.id));
      setIsDeleteModalOpen(false);
      setSelectedQuestion(null);
    }
  };

  const handleSubmitQuestion = (questionData: QuizQuestion) => {
    if (editingQuestion) {
      // Update existing question
      setQuestions((prev) =>
        prev.map((q) => (q.id === questionData.id ? questionData : q))
      );
    } else {
      // Add new question
      const newQuestion = {
        ...questionData,
        id: `q-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }
    setIsQuestionModalOpen(false);
    setEditingQuestion(null);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddTag = (newTag: string) => {
    if (newTag && !availableTags.includes(newTag)) {
      setAvailableTags((prev) => [...prev, newTag]);
    }
  };

  const handleReorderQuestions = (reorderedQuestions: QuizQuestion[]) => {
    setQuestions(reorderedQuestions);
  };

  return {
    questions,
    filteredQuestions,
    selectedQuestion,
    isQuestionModalOpen,
    isDeleteModalOpen,
    isPreviewModalOpen,
    editingQuestion,
    searchTerm,
    setSearchTerm,
    selectedTags,
    availableTags,
    handleAddQuestion,
    handleEditQuestion,
    handlePreviewQuestion,
    handleDeleteQuestion,
    confirmDeleteQuestion,
    handleSubmitQuestion,
    handleTagChange,
    handleAddTag,
    handleReorderQuestions,
    setIsQuestionModalOpen,
    setIsPreviewModalOpen,
    setIsDeleteModalOpen,
  };
};

// Game management
export const useGameManagement = () => {
  const [games, setGames] = useState<QuizGame[]>(sampleGames);
  const [selectedGame, setSelectedGame] = useState<QuizGame | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<QuizGame | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Filter games based on search term and status
  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || game.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddGame = () => {
    setEditingGame(null);
    setIsGameModalOpen(true);
  };

  const handleEditGame = (game: QuizGame) => {
    setEditingGame(game);
    setIsGameModalOpen(true);
  };

  const handlePreviewGame = (game: QuizGame) => {
    setSelectedGame(game);
    setIsPreviewModalOpen(true);
  };

  const handleDeleteGame = (gameId: string) => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      setSelectedGame(game);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteGame = () => {
    if (selectedGame) {
      setGames((prev) => prev.filter((g) => g.id !== selectedGame.id));
      setIsDeleteModalOpen(false);
      setSelectedGame(null);
    }
  };

  const handleSubmitGame = (gameData: QuizGame) => {
    if (editingGame) {
      // Update existing game
      setGames((prev) =>
        prev.map((g) => (g.id === gameData.id ? gameData : g))
      );
    } else {
      // Add new game
      const newGame = {
        ...gameData,
        id: `game-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setGames((prev) => [...prev, newGame]);
    }
    setIsGameModalOpen(false);
    setEditingGame(null);
  };

  const handleToggleGameStatus = (gameId: string) => {
    setGames((prev) =>
      prev.map((game) => {
        if (game.id === gameId) {
          const newStatus = game.status === "active" ? "disabled" : "active";
          return {
            ...game,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return game;
      })
    );
  };

  return {
    games,
    filteredGames,
    selectedGame,
    isGameModalOpen,
    isDeleteModalOpen,
    isPreviewModalOpen,
    editingGame,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleAddGame,
    handleEditGame,
    handlePreviewGame,
    handleDeleteGame,
    confirmDeleteGame,
    handleSubmitGame,
    handleToggleGameStatus,
    setIsGameModalOpen,
    setIsPreviewModalOpen,
    setIsDeleteModalOpen,
  };
};

// Image management
export const useImageManagement = () => {
  const [images, setImages] = useState<QuizImage[]>(sampleImages);
  const [selectedImage, setSelectedImage] = useState<QuizImage | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter images based on search term
  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadImage = () => {
    setIsUploadModalOpen(true);
  };

  const handleDeleteImage = (imageId: string) => {
    const image = images.find((img) => img.id === imageId);
    if (image) {
      setSelectedImage(image);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDeleteImage = () => {
    if (selectedImage) {
      setImages((prev) => prev.filter((img) => img.id !== selectedImage.id));
      setIsDeleteModalOpen(false);
      setSelectedImage(null);
    }
  };

  const handleSubmitImage = (imageData: QuizImage) => {
    const newImage = {
      ...imageData,
      id: `img-${Date.now().toString(36)}`,
      uploadedAt: new Date().toISOString(),
      usedCount: 0,
    };
    setImages((prev) => [...prev, newImage]);
    setIsUploadModalOpen(false);
  };

  return {
    images,
    filteredImages,
    selectedImage,
    isUploadModalOpen,
    isDeleteModalOpen,
    searchTerm,
    setSearchTerm,
    handleUploadImage,
    handleDeleteImage,
    confirmDeleteImage,
    handleSubmitImage,
    setIsUploadModalOpen,
    setIsDeleteModalOpen,
  };
};

// Player management
export const usePlayerManagement = () => {
  const [players, setPlayers] = useState<QuizPlayer[]>(samplePlayers);
  const [gameResults, setGameResults] =
    useState<QuizGameResult[]>(sampleGameResults);
  const [selectedPlayer, setSelectedPlayer] = useState<QuizPlayer | null>(null);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter players based on search term
  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPlayer = (playerId: string) => {
    const player = players.find((p) => p.id === playerId);
    if (player) {
      setSelectedPlayer(player);
      setIsPlayerModalOpen(true);
    }
  };

  const getPlayerResults = (playerId: string) => {
    return gameResults.filter((result) => result.playerId === playerId);
  };

  const getPlayerGameHistory = (playerId: string) => {
    const results = getPlayerResults(playerId);
    return results.map((result) => ({
      gameId: result.gameId,
      score: result.score,
      correctAnswers: result.correctAnswers,
      wrongAnswers: result.wrongAnswers,
      completedAt: result.completedAt,
    }));
  };

  return {
    players,
    filteredPlayers,
    selectedPlayer,
    isPlayerModalOpen,
    searchTerm,
    setSearchTerm,
    handleViewPlayer,
    getPlayerResults,
    getPlayerGameHistory,
    setIsPlayerModalOpen,
  };
};

// Analytics
export const useQuizAnalytics = () => {
  const [games] = useState<QuizGame[]>(sampleGames);
  const [gameResults] = useState<QuizGameResult[]>(sampleGameResults);
  const [questions] = useState<QuizQuestion[]>(sampleQuestions);
  const [players] = useState<QuizPlayer[]>(samplePlayers);

  // Calculate overall statistics
  const calculateOverallStats = () => {
    const totalGames = games.length;
    const totalPlayers = players.length;
    const totalQuestions = questions.length;
    const totalPointsAwarded = gameResults.reduce(
      (sum, result) => sum + result.score,
      0
    );
    const totalAnswers = gameResults.reduce(
      (sum, result) => sum + result.correctAnswers + result.wrongAnswers,
      0
    );
    const correctAnswers = gameResults.reduce(
      (sum, result) => sum + result.correctAnswers,
      0
    );
    const averageScore =
      gameResults.length > 0 ? totalPointsAwarded / gameResults.length : 0;

    return {
      totalGames,
      totalPlayers,
      totalQuestions,
      totalPointsAwarded,
      totalAnswers,
      correctAnswers,
      averageScore,
      correctRate: totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0,
    };
  };

  // Calculate game statistics
  const calculateGameStats = (gameId: string) => {
    const gameResults = sampleGameResults.filter(
      (result) => result.gameId === gameId
    );
    const totalPlayers = gameResults.length;
    const totalPoints = gameResults.reduce(
      (sum, result) => sum + result.score,
      0
    );
    const correctAnswers = gameResults.reduce(
      (sum, result) => sum + result.correctAnswers,
      0
    );
    const wrongAnswers = gameResults.reduce(
      (sum, result) => sum + result.wrongAnswers,
      0
    );
    const totalAnswers = correctAnswers + wrongAnswers;

    return {
      totalPlayers,
      totalPoints,
      correctAnswers,
      wrongAnswers,
      correctRate: totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0,
      averageScore: totalPlayers > 0 ? totalPoints / totalPlayers : 0,
    };
  };

  // Calculate question statistics
  const calculateQuestionStats = (questionId: string) => {
    // Find all answers for this question across all game results
    const answers = gameResults.flatMap((result) =>
      result.answers.filter((answer) => answer.questionId === questionId)
    );

    const totalAnswers = answers.length;
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    const averageTime =
      totalAnswers > 0
        ? answers.reduce((sum, answer) => sum + answer.timeSpent, 0) /
          totalAnswers
        : 0;

    return {
      totalAnswers,
      correctAnswers,
      wrongAnswers: totalAnswers - correctAnswers,
      correctRate: totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0,
      averageTime,
    };
  };

  // Get most difficult questions
  const getMostDifficultQuestions = (limit = 5) => {
    const questionStats = questions.map((question) => {
      const stats = calculateQuestionStats(question.id);
      return {
        question,
        ...stats,
      };
    });

    // Sort by correct rate (ascending)
    return questionStats
      .filter((stats) => stats.totalAnswers > 0) // Only include questions that have been answered
      .sort((a, b) => a.correctRate - b.correctRate)
      .slice(0, limit);
  };

  // Get top players
  const getTopPlayers = (limit = 5) => {
    return [...players]
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit);
  };

  return {
    calculateOverallStats,
    calculateGameStats,
    calculateQuestionStats,
    getMostDifficultQuestions,
    getTopPlayers,
  };
};

// Question form management
export interface QuestionFormData {
  content: string;
  image?: string;
  timeLimit: string;
  points: string;
  options: {
    text: string;
    isCorrect: boolean;
    color: "red" | "blue" | "yellow" | "green";
  }[];
  tags: string[];
}

export const useQuestionForm = (editQuestion?: QuizQuestion | null) => {
  const defaultOptions = [
    { text: "", isCorrect: false, color: "red" as const },
    { text: "", isCorrect: false, color: "blue" as const },
    { text: "", isCorrect: false, color: "yellow" as const },
    { text: "", isCorrect: false, color: "green" as const },
  ];

  const [formData, setFormData] = useState<QuestionFormData>({
    content: editQuestion?.content || "",
    image: editQuestion?.image || "",
    timeLimit: editQuestion?.timeLimit?.toString() || "20",
    points: editQuestion?.points?.toString() || "100",
    options:
      editQuestion?.options.map((opt) => ({
        text: opt.text,
        isCorrect: opt.isCorrect,
        color: opt.color || "red",
      })) || defaultOptions,
    tags: editQuestion?.tags || [],
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleOptionChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const newOptions = [...prev.options];
      newOptions[index] = { ...newOptions[index], [field]: value };

      // If setting this option as correct, set others to false
      if (field === "isCorrect" && value === true) {
        newOptions.forEach((opt, i) => {
          if (i !== index) {
            newOptions[i] = { ...newOptions[i], isCorrect: false };
          }
        });
      }

      return { ...prev, options: newOptions };
    });

    if (errors.options) {
      setErrors((prev) => ({ ...prev, options: "" }));
    }
  };

  const handleTagChange = (tag: string) => {
    setFormData((prev) => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  };

  const validateForm = () => {
    const errors: any = {};

    if (!formData.content.trim()) {
      errors.content = "Question content is required";
    }

    if (
      !formData.timeLimit ||
      isNaN(Number(formData.timeLimit)) ||
      Number(formData.timeLimit) <= 0
    ) {
      errors.timeLimit = "Valid time limit is required";
    }

    if (
      !formData.points ||
      isNaN(Number(formData.points)) ||
      Number(formData.points) <= 0
    ) {
      errors.points = "Valid points value is required";
    }

    // Check if at least one option is marked as correct
    const hasCorrectOption = formData.options.some((opt) => opt.isCorrect);
    if (!hasCorrectOption) {
      errors.options = "At least one option must be marked as correct";
    }

    // Check if all options have text
    const emptyOptions = formData.options.some((opt) => !opt.text.trim());
    if (emptyOptions) {
      errors.options = errors.options || "All options must have text";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: QuizQuestion) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateForm();
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    const questionData: QuizQuestion = {
      id: editQuestion?.id || `q-${Date.now().toString(36)}`,
      content: formData.content,
      image: formData.image,
      timeLimit: Number(formData.timeLimit),
      points: Number(formData.points),
      options: formData.options.map((opt, index) => ({
        id:
          editQuestion?.options[index]?.id ||
          `opt-${Date.now().toString(36)}-${index}`,
        text: opt.text,
        isCorrect: opt.isCorrect,
        color: opt.color,
      })),
      tags: formData.tags,
      createdAt: editQuestion?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await onSubmit(questionData);
    } catch (error) {
      console.error("Error submitting question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleOptionChange,
    handleTagChange,
    handleSubmit,
  };
};

// Game form management
export interface GameFormData {
  title: string;
  description: string;
  duration: string;
  questions: QuizQuestion[];
  mode: "individual" | "team";
  type: "live" | "anytime";
  startDate?: string;
  endDate?: string;
  coverImage?: string;
}

export const useGameForm = (
  editGame?: QuizGame | null,
  availableQuestions: QuizQuestion[] = []
) => {
  const [formData, setFormData] = useState<GameFormData>({
    title: editGame?.title || "",
    description: editGame?.description || "",
    duration: editGame?.duration?.toString() || "5",
    questions: editGame?.questions || [],
    mode: editGame?.mode || "individual",
    type: editGame?.type || "anytime",
    startDate: editGame?.startDate || "",
    endDate: editGame?.endDate || "",
    coverImage: editGame?.coverImage || "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>(
    editGame?.questions.map((q) => q.id) || []
  );

  // Filter available questions based on search term
  const filteredQuestions = availableQuestions.filter(
    (question) =>
      question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleQuestionSelection = (questionId: string) => {
    setSelectedQuestionIds((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });

    // Update questions in form data
    const selectedQuestions = availableQuestions.filter(
      (q) => selectedQuestionIds.includes(q.id) || q.id === questionId
    );

    setFormData((prev) => ({
      ...prev,
      questions: selectedQuestions.filter(
        (q) => selectedQuestionIds.includes(q.id) || q.id === questionId
      ),
    }));

    if (errors.questions) {
      setErrors((prev) => ({ ...prev, questions: "" }));
    }
  };

  const handleReorderQuestions = (reorderedQuestions: QuizQuestion[]) => {
    setFormData((prev) => ({
      ...prev,
      questions: reorderedQuestions,
    }));
  };

  const validateForm = () => {
    const errors: any = {};

    if (!formData.title.trim()) {
      errors.title = "Game title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Game description is required";
    }

    if (
      !formData.duration ||
      isNaN(Number(formData.duration)) ||
      Number(formData.duration) <= 0
    ) {
      errors.duration = "Valid duration is required";
    }

    if (formData.questions.length === 0) {
      errors.questions = "At least one question must be selected";
    }

    if (formData.type === "live") {
      if (!formData.startDate) {
        errors.startDate = "Start date is required for live games";
      }

      if (!formData.endDate) {
        errors.endDate = "End date is required for live games";
      }

      if (
        formData.startDate &&
        formData.endDate &&
        new Date(formData.startDate) >= new Date(formData.endDate)
      ) {
        errors.endDate = "End date must be after start date";
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSubmit: (data: QuizGame) => void
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateForm();
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Calculate total points
    const totalPoints = formData.questions.reduce(
      (sum, q) => sum + q.points,
      0
    );

    const gameData: QuizGame = {
      id: editGame?.id || `game-${Date.now().toString(36)}`,
      title: formData.title,
      description: formData.description,
      duration: Number(formData.duration),
      questions: formData.questions,
      mode: formData.mode,
      type: formData.type,
      status: editGame?.status || "draft",
      createdAt: editGame?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      coverImage: formData.coverImage,
      totalPoints,
    };

    try {
      await onSubmit(gameData);
    } catch (error) {
      console.error("Error submitting game:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    searchTerm,
    setSearchTerm,
    selectedQuestionIds,
    filteredQuestions,
    handleInputChange,
    handleQuestionSelection,
    handleReorderQuestions,
    handleSubmit,
  };
};

// Utility functions
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status: string) => {
  const colors = {
    draft: "bg-gray-100 text-gray-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    disabled: "bg-red-100 text-red-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const getOptionColor = (color: string) => {
  const colors = {
    red: "bg-red-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-white",
    green: "bg-green-500 text-white",
  };
  return colors[color as keyof typeof colors] || "bg-gray-500 text-white";
};

// Import/Export functions
export const exportQuestionsToCSV = (questions: QuizQuestion[]) => {
  // Create CSV header
  const headers = [
    "Question ID",
    "Content",
    "Image URL",
    "Time Limit",
    "Points",
    "Option 1",
    "Option 1 Correct",
    "Option 2",
    "Option 2 Correct",
    "Option 3",
    "Option 3 Correct",
    "Option 4",
    "Option 4 Correct",
    "Tags",
  ];

  // Create CSV rows
  const rows = questions.map((question) => [
    question.id,
    `"${question.content.replace(/"/g, '""')}"`,
    question.image || "",
    question.timeLimit,
    question.points,
    `"${question.options[0]?.text.replace(/"/g, '""') || ""}"`,
    question.options[0]?.isCorrect ? "TRUE" : "FALSE",
    `"${question.options[1]?.text.replace(/"/g, '""') || ""}"`,
    question.options[1]?.isCorrect ? "TRUE" : "FALSE",
    `"${question.options[2]?.text.replace(/"/g, '""') || ""}"`,
    question.options[2]?.isCorrect ? "TRUE" : "FALSE",
    `"${question.options[3]?.text.replace(/"/g, '""') || ""}"`,
    question.options[3]?.isCorrect ? "TRUE" : "FALSE",
    `"${question.tags.join(", ")}"`,
  ]);

  // Combine header and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create and download the CSV file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `quiz_questions_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseCSVQuestions = (csvContent: string): QuizQuestion[] => {
  // Split CSV into rows
  const rows = csvContent.split("\n");

  // Extract header and data rows
  const header = rows[0].split(",");
  const dataRows = rows.slice(1);

  // Parse each row into a question object
  return dataRows.map((row, rowIndex) => {
    const values = parseCSVRow(row);

    // Create options array
    const options: QuizOption[] = [
      {
        id: `opt-import-${rowIndex}-1`,
        text: values[5]?.replace(/^"|"$/g, "").replace(/""/g, '"') || "",
        isCorrect: values[6]?.toUpperCase() === "TRUE",
        color: "red",
      },
      {
        id: `opt-import-${rowIndex}-2`,
        text: values[7]?.replace(/^"|"$/g, "").replace(/""/g, '"') || "",
        isCorrect: values[8]?.toUpperCase() === "TRUE",
        color: "blue",
      },
      {
        id: `opt-import-${rowIndex}-3`,
        text: values[9]?.replace(/^"|"$/g, "").replace(/""/g, '"') || "",
        isCorrect: values[10]?.toUpperCase() === "TRUE",
        color: "yellow",
      },
      {
        id: `opt-import-${rowIndex}-4`,
        text: values[11]?.replace(/^"|"$/g, "").replace(/""/g, '"') || "",
        isCorrect: values[12]?.toUpperCase() === "TRUE",
        color: "green",
      },
    ];

    // Parse tags
    const tagsString =
      values[13]?.replace(/^"|"$/g, "").replace(/""/g, '"') || "";
    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    return {
      id: `q-import-${Date.now().toString(36)}-${rowIndex}`,
      content: values[1]?.replace(/^"|"$/g, "").replace(/""/g, '"') || "",
      image: values[2] || undefined,
      timeLimit: Number.parseInt(values[3]) || 20,
      points: Number.parseInt(values[4]) || 100,
      options,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
};

// Helper function to parse CSV row handling quoted values
const parseCSVRow = (row: string): string[] => {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      // Toggle quote state
      inQuotes = !inQuotes;
      current += char;
    } else if (char === "," && !inQuotes) {
      // End of field
      result.push(current);
      current = "";
    } else {
      // Add character to current field
      current += char;
    }
  }

  // Add the last field
  result.push(current);

  return result;
};

export function useQuizManagement() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(sampleQuestions);
  const [games, setGames] = useState<QuizGame[]>(sampleGames);
  const [players, setPlayers] = useState<QuizPlayer[]>(samplePlayers);
  const [analytics, setAnalytics] = useState<QuizAnalytics>(sampleAnalytics);
  const [loading, setLoading] = useState(false);

  // Question management
  const addQuestion = useCallback(
    (question: Omit<QuizQuestion, "id" | "createdAt" | "updatedAt">) => {
      const newQuestion: QuizQuestion = {
        ...question,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setQuestions((prev) => [...prev, newQuestion]);
    },
    []
  );

  const updateQuestion = useCallback(
    (id: string, updates: Partial<QuizQuestion>) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === id ? { ...q, ...updates, updatedAt: new Date() } : q
        )
      );
    },
    []
  );

  const deleteQuestion = useCallback((id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    // Also remove from games
    setGames((prev) =>
      prev.map((game) => ({
        ...game,
        questions: game.questions.filter((qId) => qId !== id),
      }))
    );
  }, []);

  // Game management
  const addGame = useCallback(
    (
      game: Omit<
        QuizGame,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "totalPlayers"
        | "totalPlays"
        | "averageScore"
      >
    ) => {
      const newGame: QuizGame = {
        ...game,
        id: Date.now().toString(),
        totalPlayers: 0,
        totalPlays: 0,
        averageScore: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setGames((prev) => [...prev, newGame]);
    },
    []
  );

  const updateGame = useCallback((id: string, updates: Partial<QuizGame>) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, ...updates, updatedAt: new Date() } : g
      )
    );
  }, []);

  const deleteGame = useCallback((id: string) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const toggleGameStatus = useCallback((id: string) => {
    setGames((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, isActive: !g.isActive, updatedAt: new Date() } : g
      )
    );
  }, []);

  // Player management
  const getPlayerStats = useCallback(
    (playerId: string) => {
      return players.find((p) => p.id === playerId);
    },
    [players]
  );

  // Analytics
  const refreshAnalytics = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const updatedAnalytics: QuizAnalytics = {
        totalQuestions: questions.length,
        totalGames: games.length,
        totalPlayers: players.length,
        totalPlays: games.reduce((sum, game) => sum + game.totalPlays, 0),
        averageScore:
          games.reduce((sum, game) => sum + game.averageScore, 0) /
            games.length || 0,
        mostDifficultQuestion: questions[0]?.question || "",
        mostPopularGame:
          games.sort((a, b) => b.totalPlays - a.totalPlays)[0]?.title || "",
        topPlayers: players
          .sort((a, b) => b.totalScore - a.totalScore)
          .slice(0, 5),
        recentActivity: analytics.recentActivity,
      };
      setAnalytics(updatedAnalytics);
      setLoading(false);
    }, 1000);
  }, [questions, games, players, analytics.recentActivity]);

  // Import/Export
  const exportQuestions = useCallback(() => {
    const csvContent = [
      [
        "Question",
        "Answer 1",
        "Answer 2",
        "Answer 3",
        "Answer 4",
        "Correct Answer",
        "Time Limit",
        "Points",
        "Tags",
        "Category",
      ],
      ...questions.map((q) => [
        q.question,
        q.answers[0].text,
        q.answers[1].text,
        q.answers[2].text,
        q.answers[3].text,
        q.answers.findIndex((a) => a.isCorrect) + 1,
        q.timeLimit,
        q.points,
        q.tags.join(";"),
        q.category,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz-questions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [questions]);

  const importQuestions = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split("\n");
      const headers = lines[0].split(",");

      const importedQuestions = lines
        .slice(1)
        .map((line, index) => {
          const values = line.split(",");
          if (values.length < 10) return null;

          const correctAnswerIndex = Number.parseInt(values[5]) - 1;
          const answers = [
            {
              id: `${Date.now()}-${index}-1`,
              text: values[1],
              isCorrect: correctAnswerIndex === 0,
              color: "red" as const,
            },
            {
              id: `${Date.now()}-${index}-2`,
              text: values[2],
              isCorrect: correctAnswerIndex === 1,
              color: "blue" as const,
            },
            {
              id: `${Date.now()}-${index}-3`,
              text: values[3],
              isCorrect: correctAnswerIndex === 2,
              color: "yellow" as const,
            },
            {
              id: `${Date.now()}-${index}-4`,
              text: values[4],
              isCorrect: correctAnswerIndex === 3,
              color: "green" as const,
            },
          ];

          return {
            id: `${Date.now()}-${index}`,
            question: values[0],
            answers,
            timeLimit: Number.parseInt(values[6]) || 30,
            points: Number.parseInt(values[7]) || 100,
            tags: values[8] ? values[8].split(";") : [],
            category: values[9] || "General",
            difficulty: "medium" as const,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        })
        .filter(Boolean) as QuizQuestion[];

      setQuestions((prev) => [...prev, ...importedQuestions]);
    };
    reader.readAsText(file);
  }, []);

  return {
    // Data
    questions,
    games,
    players,
    analytics,
    loading,

    // Question methods
    addQuestion,
    updateQuestion,
    deleteQuestion,

    // Game methods
    addGame,
    updateGame,
    deleteGame,
    toggleGameStatus,

    // Player methods
    getPlayerStats,

    // Analytics methods
    refreshAnalytics,

    // Import/Export methods
    exportQuestions,
    importQuestions,
  };
}
