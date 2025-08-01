import { mockUserScore } from "@/constants/event";
import { RText } from "@/lib/by/Div";
import { Trophy } from "lucide-react";
import React from "react";

interface LeaderboardProps {
  leaders: IEventScore[];
  currentUser?: IEventScore;
  maxDisplay?: number;
}



const getRankColor = (rank: number) => {
  if (rank === 1) return "bg-yellow-300 text-yellow-800 border-yellow-400";
  if (rank === 2) return "bg-gray-300 text-gray-800 border-gray-400";
  if (rank === 3) return "bg-amber-500  border-amber-600";
  return "bg-stone-100 text-stone-600 border-stone-300";
};

const getPillSize = (rank: number) => {
  if (rank <= 3) return "py-2 px-4 text-sm";
  return "py-1.5 px-3 text-xs";
};

export default function Leaderboard({ 
  leaders, 
  currentUser = mockUserScore, 
  maxDisplay = 5 
}: LeaderboardProps) {
  return (
    <div className="border-white bg-pink-100 border-4 rounded-xl w-full max-w-sm mx-auto p-4 shadow-lg text-stone-800">
      <button className="game-button w-full mb-4">
        <div className="flex items-center justify-center gap-2"><span>
          Leaderboard <Trophy className="w-5 h-5" /></span></div>
      </button>

      <ul className="space-y-2">
        {leaders.slice(0, maxDisplay).map((entry) => (
          <li
            key={entry.rank}
            className={`flex items-center justify-between rounded-full border px-3 ${
              getPillSize(Number(entry.rank))
            } shadow-sm ${getRankColor(Number(entry.rank))}`}
          >
            {/* Left: Name */}
            <div className="truncate max-w-[60%] font-medium">{entry.user.name}</div>

            {/* Right: Score + Rank */}
            <div className="flex items-center gap-2">
              <span className="text-green-700 font-semibold text-sm ml-4">
                {entry.score.toLocaleString()}
              </span>
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white border text-xs font-bold">
                {entry.rank}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Current User */}
      {currentUser && (
        <div className="pt-4">
          <RText className="w-full text-center mb-2">Me </RText>
          <div className="flex items-center justify-between rounded-full bg-white px-4 py-2 shadow-sm border border-stone-300">
            <div>
              <p className="font-semibold">
                {currentUser.user.name} 
                {currentUser.rank && ` (#${currentUser.rank})`}
              </p>
              <p className="text-sm text-primary font-medium">
                {currentUser.score.toLocaleString()}
              </p>
              {!currentUser.is_eligible_for_rewards && (
                <p className="text-xs text-gray-500">Not eligible for rewards</p>
              )}
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold text-xs">
              {currentUser.rank || "?"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
