"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Trophy,
  Target,
  AlertTriangle,
} from "lucide-react";
import { Area, RText, Yard, Container } from "@/lib/by/Div";
import { useQuizAnalytics } from "@/components/admin/Quiz/seg/utils";

export function AnalyticsDashboard() {
  const { calculateOverallStats, getMostDifficultQuestions, getTopPlayers } =
    useQuizAnalytics();
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const overallStats = calculateOverallStats();
  const difficultQuestions = getMostDifficultQuestions(5);
  const topPlayers = getTopPlayers(5);

  return (
    <Container className="space-y-6">
      {/* Header */}
      <Area className="flex justify-between items-center">
        <Yard>
          <RText className="text-2xl font-bold text-gray-900">
            Quiz Analytics
          </RText>
          <RText className="text-gray-600">
            Overview of quiz performance and player engagement
          </RText>
        </Yard>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="all">All time</option>
        </select>
      </Area>

      {/* Overview Stats */}
      <Area className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Container className="bg-white p-6 rounded-lg border border-gray-200">
          <Area className="flex items-center justify-between">
            <Yard>
              <RText className="text-sm font-medium text-gray-600">
                Total Games
              </RText>
              <RText className="text-2xl font-bold text-gray-900">
                {overallStats.totalGames}
              </RText>
            </Yard>
            <Yard className="p-3 bg-blue-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </Yard>
          </Area>
          <RText className="text-sm text-green-600 mt-2">
            +12% from last period
          </RText>
        </Container>

        <Container className="bg-white p-6 rounded-lg border border-gray-200">
          <Area className="flex items-center justify-between">
            <Yard>
              <RText className="text-sm font-medium text-gray-600">
                Active Players
              </RText>
              <RText className="text-2xl font-bold text-gray-900">
                {overallStats.totalPlayers}
              </RText>
            </Yard>
            <Yard className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </Yard>
          </Area>
          <RText className="text-sm text-green-600 mt-2">
            +8% from last period
          </RText>
        </Container>

        <Container className="bg-white p-6 rounded-lg border border-gray-200">
          <Area className="flex items-center justify-between">
            <Yard>
              <RText className="text-sm font-medium text-gray-600">
                Points Awarded
              </RText>
              <RText className="text-2xl font-bold text-gray-900">
                {overallStats.totalPointsAwarded.toLocaleString()}
              </RText>
            </Yard>
            <Yard className="p-3 bg-yellow-100 rounded-full">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </Yard>
          </Area>
          <RText className="text-sm text-green-600 mt-2">
            +15% from last period
          </RText>
        </Container>

        <Container className="bg-white p-6 rounded-lg border border-gray-200">
          <Area className="flex items-center justify-between">
            <Yard>
              <RText className="text-sm font-medium text-gray-600">
                Correct Rate
              </RText>
              <RText className="text-2xl font-bold text-gray-900">
                {overallStats.correctRate.toFixed(1)}%
              </RText>
            </Yard>
            <Yard className="p-3 bg-purple-100 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </Yard>
          </Area>
          <RText className="text-sm text-red-600 mt-2">
            -2% from last period
          </RText>
        </Container>
      </Area>

      {/* Charts Row */}
      <Area className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Container className="bg-white p-6 rounded-lg border border-gray-200">
          <Area className="flex items-center justify-between mb-4">
            <RText className="text-lg font-semibold text-gray-900">
              Performance Trends
            </RText>
            <TrendingUp className="w-5 h-5 text-gray-500" />
          </Area>

          {/* Placeholder for chart */}
          <Yard className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <RText className="text-gray-500">
              Performance chart would go here
            </RText>
          </Yard>

          <Area className="mt-4 grid grid-cols-3 gap-4 text-center">
            <Yard>
              <RText className="text-sm text-gray-600">Avg Score</RText>
              <RText className="text-lg font-semibold text-gray-900">
                {overallStats.averageScore.toFixed(0)}
              </RText>
            </Yard>
            <Yard>
              <RText className="text-sm text-gray-600">Total Answers</RText>
              <RText className="text-lg font-semibold text-gray-900">
                {overallStats.totalAnswers}
              </RText>
            </Yard>
            <Yard>
              <RText className="text-sm text-gray-600">Questions</RText>
              <RText className="text-lg font-semibold text-gray-900">
                {overallStats.totalQuestions}
              </RText>
            </Yard>
          </Area>
        </Container>

        {/* Player Engagement */}
        <Container className="bg-white p-6 rounded-lg border border-gray-200">
          <Area className="flex items-center justify-between mb-4">
            <RText className="text-lg font-semibold text-gray-900">
              Player Engagement
            </RText>
            <Users className="w-5 h-5 text-gray-500" />
          </Area>

          {/* Placeholder for chart */}
          <Yard className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <RText className="text-gray-500">
              Engagement chart would go here
            </RText>
          </Yard>

          <Area className="mt-4 space-y-2">
            <Area className="flex justify-between">
              <RText className="text-sm text-gray-600">
                Daily Active Players
              </RText>
              <RText className="text-sm font-medium text-gray-900">
                {Math.round(overallStats.totalPlayers * 0.3)}
              </RText>
            </Area>
            <Area className="flex justify-between">
              <RText className="text-sm text-gray-600">
                Avg Session Duration
              </RText>
              <RText className="text-sm font-medium text-gray-900">
                8.5 min
              </RText>
            </Area>
            <Area className="flex justify-between">
              <RText className="text-sm text-gray-600">Return Rate</RText>
              <RText className="text-sm font-medium text-gray-900">68%</RText>
            </Area>
          </Area>
        </Container>
      </Area>

      {/* Detailed Analytics */}
      <Area className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Difficult Questions */}
        <Container className="bg-white p-6 rounded-lg border border-gray-200">
          <Area className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <RText className="text-lg font-semibold text-gray-900">
              Most Difficult Questions
            </RText>
          </Area>

          <Area className="space-y-3">
            {difficultQuestions.length === 0 ? (
              <RText className="text-gray-500 text-center py-4">
                No question data available
              </RText>
            ) : (
              difficultQuestions.map((item, index) => (
                <Container
                  key={item.question.id}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <Area className="flex items-start justify-between">
                    <Yard className="flex-1">
                      <RText className="font-medium text-gray-900 mb-1">
                        {item.question.content.length > 60
                          ? `${item.question.content.substring(0, 60)}...`
                          : item.question.content}
                      </RText>
                      <Area className="flex items-center gap-4 text-sm text-gray-500">
                        <RText>{item.totalAnswers} answers</RText>
                        <RText>{item.question.points} pts</RText>
                        <Area className="flex gap-1">
                          {item.question.tags.slice(0, 2).map((tag) => (
                            <Yard
                              key={tag}
                              className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </Yard>
                          ))}
                        </Area>
                      </Area>
                    </Yard>
                    <Yard className="ml-3 text-right">
                      <RText className="text-lg font-bold text-red-600">
                        {item.correctRate.toFixed(1)}%
                      </RText>
                      <RText className="text-xs text-gray-500">correct</RText>
                    </Yard>
                  </Area>
                </Container>
              ))
            )}
          </Area>
        </Container>

        {/* Top Players */}
        <Container className="bg-white p-6 rounded-lg border border-gray-200">
          <Area className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <RText className="text-lg font-semibold text-gray-900">
              Top Players
            </RText>
          </Area>

          <Area className="space-y-3">
            {topPlayers.map((player, index) => (
              <Container key={player.id} className="p-3 bg-gray-50 rounded-lg">
                <Area className="flex items-center justify-between">
                  <Area className="flex items-center gap-3">
                    <Yard className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </Yard>
                    <Yard>
                      <RText className="font-medium text-gray-900">
                        {player.name}
                      </RText>
                      <RText className="text-sm text-gray-500">
                        {player.gamesPlayed} games played
                      </RText>
                    </Yard>
                  </Area>
                  <Yard className="text-right">
                    <RText className="text-lg font-bold text-purple-600">
                      {player.totalPoints.toLocaleString()}
                    </RText>
                    <RText className="text-xs text-gray-500">points</RText>
                  </Yard>
                </Area>
              </Container>
            ))}
          </Area>
        </Container>
      </Area>

      {/* Recent Activity */}
      <Container className="bg-white p-6 rounded-lg border border-gray-200">
        <RText className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </RText>

        <Area className="space-y-3">
          {[
            {
              type: "game_completed",
              player: "Sarah Johnson",
              game: "Skincare Basics Quiz",
              score: 250,
              time: "2 hours ago",
            },
            {
              type: "new_player",
              player: "Michael Chen",
              game: null,
              score: null,
              time: "4 hours ago",
            },
            {
              type: "high_score",
              player: "Emily Davis",
              game: "Beauty Brands Challenge",
              score: 350,
              time: "6 hours ago",
            },
          ].map((activity, index) => (
            <Container
              key={index}
              className="p-3 border border-gray-200 rounded-lg"
            >
              <Area className="flex items-center justify-between">
                <Area className="flex items-center gap-3">
                  <Yard
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "game_completed"
                        ? "bg-blue-500"
                        : activity.type === "new_player"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <Yard>
                    <RText className="text-sm text-gray-900">
                      {activity.type === "game_completed" &&
                        `${activity.player} completed ${activity.game}`}
                      {activity.type === "new_player" &&
                        `${activity.player} joined the platform`}
                      {activity.type === "high_score" &&
                        `${activity.player} achieved a high score in ${activity.game}`}
                    </RText>
                    {activity.score && (
                      <RText className="text-xs text-gray-500">
                        {activity.score} points
                      </RText>
                    )}
                  </Yard>
                </Area>
                <RText className="text-xs text-gray-500">{activity.time}</RText>
              </Area>
            </Container>
          ))}
        </Area>
      </Container>
    </Container>
  );
}
