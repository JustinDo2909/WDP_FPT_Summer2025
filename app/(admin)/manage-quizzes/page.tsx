// "use client";

// import type React from "react";
// import { useState } from "react";
// import {
//   Plus,
//   Search,
//   Download,
//   Upload,
//   Play,
//   Pause,
//   Eye,
//   Edit,
//   Trash2,
//   Users,
//   Trophy,
//   Clock,
// } from "lucide-react";
// import { useQuizManagement } from "@/components/admin/Quiz/seg/utils";
// import { useQuestionManagement } from "@/components/admin/Quiz/seg/utils";
// import CustomTable from "@/components/CustomTable";
// import { StatsCard } from "@/components/admin/StatsCard";
// import { QuestionForm } from "@/components/admin/Quiz/Question-form";
// import { GameForm } from "@/components/admin/Quiz/Game-form";
// import { QuestionPreview } from "@/components/admin/Quiz/Question-preview";
// import { GamePreview } from "@/components/admin/Quiz/Game-preview";
// import { AnalyticsDashboard } from "@/components/admin/Quiz/Analytics-dashboard";
// import { ImageGallery } from "@/components/admin/Quiz/Image-gallery";
// import { PlayerManagement } from "@/components/admin/Quiz/Player-management";

// export default function QuizManagementPage() {
//   const {
//     games,
//     players,
//     analytics,
//     loading,
//     addGame,
//     updateGame,
//     deleteGame,
//     toggleGameStatus,
//     refreshAnalytics,
//     exportQuestions,
//     importQuestions,
//   } = useQuizManagement();

//   const {
//     questions,
//     filteredQuestions,
//     selectedQuestion,
//     isQuestionModalOpen,
//     isDeleteModalOpen,
//     isPreviewModalOpen,
//     editingQuestion,
//     searchTerm,
//     setSearchTerm,
//     selectedTags,
//     availableTags,
//     handleAddQuestion,
//     handleEditQuestion,
//     handlePreviewQuestion,
//     handleDeleteQuestion,
//     confirmDeleteQuestion,
//     handleSubmitQuestion,
//     handleTagChange,
//     handleAddTag,
//     handleReorderQuestions,
//     setIsQuestionModalOpen,
//     setIsPreviewModalOpen,
//     setIsDeleteModalOpen,
//   } = useQuestionManagement();

//   const [activeTab, setActiveTab] = useState<
//     "questions" | "games" | "players" | "analytics" | "images"
//   >("questions");
//   const [showGameForm, setShowGameForm] = useState(false);

//   const [editingGame, setEditingGame] = useState<string | null>(null);

//   const [previewGame, setPreviewGame] = useState<string | null>(null);

//   const filteredGames = games.filter(
//     (g) =>
//       g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       g.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const questionColumns = [
//     { key: "question", label: "Question", sortable: true },
//     { key: "category", label: "Category", sortable: true },
//     { key: "difficulty", label: "Difficulty", sortable: true },
//     { key: "points", label: "Points", sortable: true },
//     { key: "tags", label: "Tags", sortable: false },
//     { key: "actions", label: "Actions", sortable: false },
//   ];

//   const gameColumns = [
//     { key: "title", label: "Game Title", sortable: true },
//     { key: "questions", label: "Questions", sortable: true },
//     { key: "gameMode", label: "Mode", sortable: true },
//     { key: "totalPlayers", label: "Players", sortable: true },
//     { key: "averageScore", label: "Avg Score", sortable: true },
//     { key: "status", label: "Status", sortable: true },
//     { key: "actions", label: "Actions", sortable: false },
//   ];

//   const questionData = filteredQuestions.map((question) => ({
//     id: question.id,
//     question: (
//       <div className="max-w-xs">
//         <p className="font-medium truncate">{question.question}</p>
//         <p className="text-sm text-gray-500">
//           {question.timeLimit}s •{" "}
//           {question.answers.filter((a) => a.isCorrect).length} correct
//         </p>
//       </div>
//     ),
//     category: (
//       <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
//         {question.category}
//       </span>
//     ),
//     difficulty: (
//       <span
//         className={`px-2 py-1 rounded-full text-xs ${
//           question.difficulty === "easy"
//             ? "bg-green-100 text-green-800"
//             : question.difficulty === "medium"
//               ? "bg-yellow-100 text-yellow-800"
//               : "bg-red-100 text-red-800"
//         }`}
//       >
//         {question.difficulty}
//       </span>
//     ),
//     points: question.points,
//     tags: (
//       <div className="flex flex-wrap gap-1">
//         {question.tags.slice(0, 2).map((tag) => (
//           <span
//             key={tag}
//             className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
//           >
//             {tag}
//           </span>
//         ))}
//         {question.tags.length > 2 && (
//           <span className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
//             +{question.tags.length - 2}
//           </span>
//         )}
//       </div>
//     ),
//     actions: (
//       <div className="flex space-x-2">
//         <button
//           onClick={() => handlePreviewQuestion(question)}
//           className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//           title="Preview"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleEditQuestion(question)}
//           className="p-1 text-green-600 hover:bg-green-50 rounded"
//           title="Edit"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => handleDeleteQuestion(question.id)}
//           className="p-1 text-red-600 hover:bg-red-50 rounded"
//           title="Delete"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//     ),
//   }));

//   const gameData = filteredGames.map((game) => ({
//     id: game.id,
//     title: (
//       <div>
//         <p className="font-medium">{game.title}</p>
//         <p className="text-sm text-gray-500 truncate max-w-xs">
//           {game.description}
//         </p>
//       </div>
//     ),
//     questions: `${game.questions.length} questions`,
//     gameMode: (
//       <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
//         {game.gameMode} • {game.playMode}
//       </span>
//     ),
//     totalPlayers: game.totalPlayers,
//     averageScore: `${game.averageScore.toFixed(1)}%`,
//     status: (
//       <span
//         className={`px-2 py-1 rounded-full text-xs ${
//           game.isActive
//             ? "bg-green-100 text-green-800"
//             : "bg-gray-100 text-gray-800"
//         }`}
//       >
//         {game.isActive ? "Active" : "Inactive"}
//       </span>
//     ),
//     actions: (
//       <div className="flex space-x-2">
//         <button
//           onClick={() => setPreviewGame(game.id)}
//           className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//           title="Preview"
//         >
//           <Eye className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => toggleGameStatus(game.id)}
//           className={`p-1 rounded ${
//             game.isActive
//               ? "text-orange-600 hover:bg-orange-50"
//               : "text-green-600 hover:bg-green-50"
//           }`}
//           title={game.isActive ? "Pause" : "Activate"}
//         >
//           {game.isActive ? (
//             <Pause className="h-4 w-4" />
//           ) : (
//             <Play className="h-4 w-4" />
//           )}
//         </button>
//         <button
//           onClick={() => setEditingGame(game.id)}
//           className="p-1 text-green-600 hover:bg-green-50 rounded"
//           title="Edit"
//         >
//           <Edit className="h-4 w-4" />
//         </button>
//         <button
//           onClick={() => deleteGame(game.id)}
//           className="p-1 text-red-600 hover:bg-red-50 rounded"
//           title="Delete"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//     ),
//   }));

//   const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       importQuestions(file);
//       event.target.value = "";
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Quiz Management</h1>
//           <p className="text-gray-600">
//             Manage questions, games, and track player performance
//           </p>
//         </div>
//         <div className="flex space-x-3">
//           <input
//             type="file"
//             accept=".csv"
//             onChange={handleFileImport}
//             className="hidden"
//             id="import-questions"
//           />
//           <label
//             htmlFor="import-questions"
//             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
//           >
//             <Upload className="h-4 w-4 mr-2" />
//             Import CSV
//           </label>
//           <button
//             onClick={exportQuestions}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatsCard
//           title="Total Questions"
//           value={analytics.totalQuestions.toString()}
//           icon={<Clock className="h-6 w-6" />}
//           trend={{ value: 12, isPositive: true }}
//         />
//         <StatsCard
//           title="Active Games"
//           value={games.filter((g) => g.isActive).length.toString()}
//           icon={<Play className="h-6 w-6" />}
//           trend={{ value: 8, isPositive: true }}
//         />
//         <StatsCard
//           title="Total Players"
//           value={analytics.totalPlayers.toString()}
//           icon={<Users className="h-6 w-6" />}
//           trend={{ value: 15, isPositive: true }}
//         />
//         <StatsCard
//           title="Average Score"
//           value={`${analytics.averageScore.toFixed(1)}%`}
//           icon={<Trophy className="h-6 w-6" />}
//           trend={{ value: 5, isPositive: true }}
//         />
//       </div>

//       {/* Tabs */}
//       <div className="border-b border-gray-200">
//         <nav className="-mb-px flex space-x-8">
//           {[
//             { id: "questions", label: "Questions", count: questions.length },
//             { id: "games", label: "Games", count: games.length },
//             { id: "players", label: "Players", count: players.length },
//             { id: "analytics", label: "Analytics", count: null },
//             { id: "images", label: "Images", count: null },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id as any)}
//               className={`py-2 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? "border-blue-500 text-blue-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//             >
//               {tab.label}
//               {tab.count !== null && (
//                 <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Tab Content */}
//       {activeTab === "questions" && (
//         <div className="space-y-6">
//           {/* Search and Filters */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <input
//                   type="text"
//                   placeholder="Search questions..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="all">All Categories</option>
//               <option value="Skincare">Skincare</option>
//               <option value="Brands">Brands</option>
//               <option value="Ingredients">Ingredients</option>
//               <option value="Makeup">Makeup</option>
//             </select>
//             <button
//               onClick={() => setShowQuestionForm(true)}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add Question
//             </button>
//           </div>

//           {/* Questions Table */}
//           <CustomTable
//             columns={questionColumns}
//             data={questionData}
//             loading={loading}
//           />
//         </div>
//       )}

//       {activeTab === "games" && (
//         <div className="space-y-6">
//           {/* Search and Add Game */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <input
//                   type="text"
//                   placeholder="Search games..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//             <button
//               onClick={() => setShowGameForm(true)}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Create Game
//             </button>
//           </div>

//           {/* Games Table */}
//           <CustomTable
//             columns={gameColumns}
//             data={gameData}
//             loading={loading}
//           />
//         </div>
//       )}

//       {activeTab === "players" && <PlayerManagement players={players} />}

//       {activeTab === "analytics" && (
//         <AnalyticsDashboard
//           analytics={analytics}
//           onRefresh={refreshAnalytics}
//           loading={loading}
//         />
//       )}

//       {activeTab === "images" && <ImageGallery />}

//       {/* Modals */}
//       {showQuestionForm && (
//         <QuestionForm
//           onClose={() => setShowQuestionForm(false)}
//           onSave={addQuestion}
//         />
//       )}

//       {showGameForm && (
//         <GameForm
//           questions={questions}
//           onClose={() => setShowGameForm(false)}
//           onSave={addGame}
//         />
//       )}

//       {editingQuestion && (
//         <QuestionForm
//           question={questions.find((q) => q.id === editingQuestion)}
//           onClose={() => setEditingQuestion(null)}
//           onSave={(data) => {
//             updateQuestion(editingQuestion, data);
//             setEditingQuestion(null);
//           }}
//         />
//       )}

//       {editingGame && (
//         <GameForm
//           game={games.find((g) => g.id === editingGame)}
//           questions={questions}
//           onClose={() => setEditingGame(null)}
//           onSave={(data) => {
//             updateGame(editingGame, data);
//             setEditingGame(null);
//           }}
//         />
//       )}

//       {previewQuestion && (
//         <QuestionPreview
//           question={questions.find((q) => q.id === previewQuestion)!}
//           onClose={() => setPreviewQuestion(null)}
//         />
//       )}

//       {previewGame && (
//         <GamePreview
//           game={games.find((g) => g.id === previewGame)!}
//           questions={questions}
//           onClose={() => setPreviewGame(null)}
//         />
//       )}
//     </div>
//   );
// }
