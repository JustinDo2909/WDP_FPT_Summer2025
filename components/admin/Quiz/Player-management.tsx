"use client";
import {
  Search,
  User,
  Trophy,
  Calendar,
  TrendingUp,
  Award,
} from "lucide-react";
import { Area, RText, Yard, Container } from "@/lib/by/Div";
import {
  usePlayerManagement,
  formatDate,
  formatDateTime,
} from "@/components/admin/Quiz/seg/utils";

export function PlayerManagement() {
  const {
    filteredPlayers,
    selectedPlayer,
    isPlayerModalOpen,
    searchTerm,
    setSearchTerm,
    handleViewPlayer,
    getPlayerGameHistory,
    setIsPlayerModalOpen,
  } = usePlayerManagement();

  return (
    <Container className="space-y-6">
      {/* Header */}
      <Area className="flex justify-between items-center">
        <Yard>
          <RText className="text-2xl font-bold text-gray-900">
            Player Management
          </RText>
          <RText className="text-gray-600">
            Monitor player performance and engagement
          </RText>
        </Yard>
      </Area>

      {/* Search */}
      <Yard className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search players by name or email..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </Yard>

      {/* Players List */}
      <Container className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Container className="px-6 py-4 border-b border-gray-200">
          <RText className="text-lg font-semibold text-gray-900">
            Players ({filteredPlayers.length})
          </RText>
        </Container>

        <Area className="divide-y divide-gray-200">
          {filteredPlayers.length === 0 ? (
            <Container className="p-6 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <RText className="text-gray-500">
                {searchTerm
                  ? "No players found matching your search."
                  : "No players registered yet."}
              </RText>
            </Container>
          ) : (
            filteredPlayers.map((player) => (
              <Container
                key={player.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <Area className="flex items-center justify-between">
                  <Area className="flex items-center gap-4">
                    <img
                      src={
                        player.avatar || "/placeholder.svg?height=50&width=50"
                      }
                      alt={player.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=50&width=50&text=Avatar";
                      }}
                    />
                    <Yard>
                      <RText className="font-medium text-gray-900">
                        {player.name}
                      </RText>
                      <RText className="text-sm text-gray-500">
                        {player.email}
                      </RText>
                    </Yard>
                  </Area>

                  <Area className="flex items-center gap-6">
                    <Yard className="text-center">
                      <RText className="text-lg font-bold text-purple-600">
                        {player.totalPoints.toLocaleString()}
                      </RText>
                      <RText className="text-xs text-gray-500">Points</RText>
                    </Yard>

                    <Yard className="text-center">
                      <RText className="text-lg font-bold text-blue-600">
                        {player.gamesPlayed}
                      </RText>
                      <RText className="text-xs text-gray-500">Games</RText>
                    </Yard>

                    <Yard className="text-center">
                      <RText className="text-sm text-gray-600">
                        {formatDate(player.lastPlayed)}
                      </RText>
                      <RText className="text-xs text-gray-500">
                        Last Played
                      </RText>
                    </Yard>

                    <button
                      onClick={() => handleViewPlayer(player.id)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      View Details
                    </button>
                  </Area>
                </Area>
              </Container>
            ))
          )}
        </Area>
      </Container>

      {/* Player Detail Modal */}
      {isPlayerModalOpen && selectedPlayer && (
        <Container className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Container className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <Container className="p-6 border-b border-gray-200">
              <Area className="flex justify-between items-start">
                <Area className="flex items-center gap-4">
                  <img
                    src={
                      selectedPlayer.avatar ||
                      "/placeholder.svg?height=60&width=60"
                    }
                    alt={selectedPlayer.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=60&width=60&text=Avatar";
                    }}
                  />
                  <Yard>
                    <RText className="text-2xl font-bold text-gray-900">
                      {selectedPlayer.name}
                    </RText>
                    <RText className="text-gray-600">
                      {selectedPlayer.email}
                    </RText>
                  </Yard>
                </Area>
                <button
                  onClick={() => setIsPlayerModalOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </Area>
            </Container>

            {/* Player Stats */}
            <Container className="p-6 border-b border-gray-200">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Player Statistics
              </RText>
              <Area className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Container className="bg-purple-50 p-4 rounded-lg">
                  <Area className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    <RText className="text-sm font-medium text-purple-800">
                      Total Points
                    </RText>
                  </Area>
                  <RText className="text-2xl font-bold text-purple-600">
                    {selectedPlayer.totalPoints.toLocaleString()}
                  </RText>
                </Container>

                <Container className="bg-blue-50 p-4 rounded-lg">
                  <Area className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <RText className="text-sm font-medium text-blue-800">
                      Games Played
                    </RText>
                  </Area>
                  <RText className="text-2xl font-bold text-blue-600">
                    {selectedPlayer.gamesPlayed}
                  </RText>
                </Container>

                <Container className="bg-green-50 p-4 rounded-lg">
                  <Area className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <RText className="text-sm font-medium text-green-800">
                      Avg Score
                    </RText>
                  </Area>
                  <RText className="text-2xl font-bold text-green-600">
                    {selectedPlayer.gamesPlayed > 0
                      ? Math.round(
                          selectedPlayer.totalPoints /
                            selectedPlayer.gamesPlayed
                        )
                      : 0}
                  </RText>
                </Container>

                <Container className="bg-orange-50 p-4 rounded-lg">
                  <Area className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <RText className="text-sm font-medium text-orange-800">
                      Last Active
                    </RText>
                  </Area>
                  <RText className="text-sm font-bold text-orange-600">
                    {formatDate(selectedPlayer.lastPlayed)}
                  </RText>
                </Container>
              </Area>
            </Container>

            {/* Game History */}
            <Container className="p-6">
              <RText className="text-lg font-semibold text-gray-900 mb-4">
                Game History
              </RText>

              {(() => {
                const gameHistory = getPlayerGameHistory(selectedPlayer.id);
                return gameHistory.length === 0 ? (
                  <RText className="text-gray-500 text-center py-8">
                    No games played yet.
                  </RText>
                ) : (
                  <Area className="space-y-3">
                    {gameHistory.map((game, index) => (
                      <Container
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <Area className="flex justify-between items-center">
                          <Yard>
                            <RText className="font-medium text-gray-900">
                              Game #{index + 1}
                            </RText>
                            <RText className="text-sm text-gray-500">
                              {formatDateTime(game.completedAt)}
                            </RText>
                          </Yard>
                          <Area className="flex items-center gap-6">
                            <Yard className="text-center">
                              <RText className="text-lg font-bold text-purple-600">
                                {game.score}
                              </RText>
                              <RText className="text-xs text-gray-500">
                                Score
                              </RText>
                            </Yard>
                            <Yard className="text-center">
                              <RText className="text-lg font-bold text-green-600">
                                {game.correctAnswers}
                              </RText>
                              <RText className="text-xs text-gray-500">
                                Correct
                              </RText>
                            </Yard>
                            <Yard className="text-center">
                              <RText className="text-lg font-bold text-red-600">
                                {game.wrongAnswers}
                              </RText>
                              <RText className="text-xs text-gray-500">
                                Wrong
                              </RText>
                            </Yard>
                            <Yard className="text-center">
                              <RText className="text-sm font-medium text-gray-600">
                                {game.correctAnswers + game.wrongAnswers > 0
                                  ? Math.round(
                                      (game.correctAnswers /
                                        (game.correctAnswers +
                                          game.wrongAnswers)) *
                                        100
                                    )
                                  : 0}
                                %
                              </RText>
                              <RText className="text-xs text-gray-500">
                                Accuracy
                              </RText>
                            </Yard>
                          </Area>
                        </Area>
                      </Container>
                    ))}
                  </Area>
                );
              })()}
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
}
