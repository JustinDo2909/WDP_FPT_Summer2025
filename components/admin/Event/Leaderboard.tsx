"use client";

import { Trophy, Medal, Crown, Clock, Gift } from "lucide-react";
import { Area, RText, Yard, Core, Container } from "@/lib/by/Div";
import { useGetEventLeaderboardQuery } from "@/process/api/api";
import type { Event } from "@/types/event";

interface LeaderboardProps {
  events: Event[];
  selectedEventId: string;
  onEventSelect: (eventId: string) => void;
}

export function Leaderboard({ selectedEventId }: LeaderboardProps) {
  const {
    data: leaderboardData,
    isLoading,
    error,
  } = useGetEventLeaderboardQuery(selectedEventId, {
    skip: !selectedEventId,
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 text-gray-400 font-bold">{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2)
      return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3)
      return "bg-gradient-to-r from-amber-500 to-amber-700 text-white";
    return "bg-white border border-gray-200";
  };

  const formatCompletionTime = (time: number | null) => {
    if (!time) return "N/A";
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <Core className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Container className="p-6">
          <Area className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <RText className="ml-3 text-gray-500">Loading leaderboard...</RText>
          </Area>
        </Container>
      </Core>
    );
  }

  if (error) {
    return (
      <Core className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Container className="p-6">
          <Area className="text-center py-12">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <RText className="text-gray-500">
              Failed to load leaderboard data
            </RText>
          </Area>
        </Container>
      </Core>
    );
  }

  if (!leaderboardData?.data) {
    return (
      <Core className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Container className="p-6">
          <Area className="text-center py-12">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <RText className="text-gray-500">
              No leaderboard data available
            </RText>
          </Area>
        </Container>
      </Core>
    );
  }

  const { event, leaderboard } = leaderboardData.data;

  return (
    <Core className="space-y-6">
      {/* Event Info */}
      <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <Area className="flex items-center justify-between mb-4">
          <Yard>
            <RText className="text-xl font-bold text-gray-900">
              {event.title}
            </RText>
            <RText className="text-sm text-gray-500">
              Milestone Score: {event.milestone_score}
            </RText>
          </Yard>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.is_active
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {event.is_active ? "Active" : "Inactive"}
          </span>
        </Area>
      </Yard>

      {/* Leaderboard Table */}
      <Yard className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Container className="p-6 border-b border-gray-200">
          <RText className="text-lg font-semibold text-gray-900">
            Leaderboard
          </RText>
          <RText className="text-sm text-gray-500 mt-1">
            Top performers in {event.title}
          </RText>
        </Container>

        <Yard className="p-6">
          {leaderboard.length === 0 ? (
            <Area className="text-center py-12">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <RText className="text-gray-500">No participants yet</RText>
            </Area>
          ) : (
            <Yard className="space-y-4">
              {leaderboard.map((entry) => (
                <Yard
                  key={`${entry.user.id}-${entry.rank}`}
                  className={`p-6 rounded-lg ${getRankColor(entry.rank)} transition-all hover:shadow-md`}
                >
                  <Area className="flex items-center justify-between mb-4">
                    <Area className="flex items-center space-x-4">
                      <Yard className="flex items-center justify-center w-10 h-10">
                        {getRankIcon(entry.rank)}
                      </Yard>
                      <Yard>
                        <RText
                          className={`font-semibold text-lg ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-900"}`}
                        >
                          {entry.user.name}
                        </RText>
                        <RText
                          className={`text-sm ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-600"}`}
                        >
                          {entry.user.email}
                        </RText>
                      </Yard>
                    </Area>
                    <Yard className="text-right">
                      <RText
                        className={`text-2xl font-bold ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-900"}`}
                      >
                        {entry.score} pts
                      </RText>
                      <RText
                        className={`text-sm ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-600"}`}
                      >
                        Rank #{entry.rank}
                      </RText>
                    </Yard>
                  </Area>

                  {/* Additional Details */}
                  <Area className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Yard className="flex items-center space-x-2">
                      <Clock
                        className={`w-4 h-4 ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-500"}`}
                      />
                      <RText
                        className={`text-sm ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-600"}`}
                      >
                        Time: {formatCompletionTime(entry.completion_time)}
                      </RText>
                    </Yard>
                    <Yard className="flex items-center space-x-2">
                      <RText
                        className={`text-sm ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-600"}`}
                      >
                        Completed: {formatDate(entry.completed_at)}
                      </RText>
                    </Yard>
                    <Yard className="flex items-center space-x-2">
                      <Gift
                        className={`w-4 h-4 ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-500"}`}
                      />
                      <RText
                        className={`text-sm ${entry.rank <= 3 ? "text-white drop-shadow-sm" : "text-gray-600"}`}
                      >
                        {entry.is_eligible_for_reward
                          ? "Eligible for rewards"
                          : "Not eligible"}
                      </RText>
                    </Yard>
                  </Area>
                </Yard>
              ))}
            </Yard>
          )}
        </Yard>
      </Yard>
    </Core>
  );
}
