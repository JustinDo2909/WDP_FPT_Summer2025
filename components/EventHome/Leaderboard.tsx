import { Block, Column, Group, Row, RText, Section } from "@/lib/by/Div";
import { Trophy } from "lucide-react";
import React from "react";
import Button from "../CustomButton";

interface LeaderboardProps {
  leaders: IEventScore[];
  user_rank?: IUserRank;
  currentUser?: IEventScore;
  maxDisplay?: number;
  hideToggleButton?: boolean;
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
  user_rank,
  maxDisplay = 5,
  hideToggleButton = false,
}: LeaderboardProps) {
  return (
    <Section className="border-white bg-pink-100 border-4 rounded-xl w-full max-w-sm mx-auto p-4 shadow-lg text-stone-800">
      {!hideToggleButton && (
        <Button
          className="game-button w-full mb-4"
          label={
            <Block className="flex items-center justify-center gap-2">
              <RText>
                Leaderboard <Trophy className="w-5 h-5" />
              </RText>
            </Block>
          }
        />
      )}

      <Column className="space-y-2">
        {leaders.slice(0, maxDisplay).map((entry) => (
          <Row
            key={entry.rank}
            className={`flex items-center justify-between rounded-full border px-3 ${getPillSize(
              Number(entry.rank)
            )} shadow-sm ${getRankColor(Number(entry.rank))}`}
          >
            {/* Left: Name */}
            <RText className="truncate max-w-[60%] font-medium">
              {entry.user.name}
            </RText>

            {/* Right: Score + Rank */}
            <Block className="flex items-center gap-2">
              <RText className="text-green-700 font-semibold font-sans text-sm ml-4">
                {entry.score.toLocaleString()}
              </RText>
              <RText className="w-7 h-7 flex items-center justify-center rounded-full bg-white border text-xs font-bold font-sans">
                {entry.rank}
              </RText>
            </Block>
          </Row>
        ))}
      </Column>

      {/* Current User */}
      {user_rank && (
        <Row className="pt-4">
          <RText className="w-full text-center mb-2">Me </RText>
          <Group className="flex items-center justify-between rounded-full bg-white px-4 py-2 shadow-sm border border-stone-300">
            <RText className="font-semibold">{user_rank.name}</RText>
            <Block className="flex justify-center items-center gap-2">
              <RText className="text-sm text-primary font-semibold font-sans">
                {user_rank.score.toLocaleString()}
              </RText>
              <RText className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white  font-bold text-xs">
                {user_rank.rank || "?"}
              </RText>
            </Block>
          </Group>
        </Row>
      )}
    </Section>
  );
}
