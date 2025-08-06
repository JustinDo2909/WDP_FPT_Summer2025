"use client";
import React, { useState } from "react";
import Leaderboard from "./Leaderboard";
import VoucherRewards from "./VoucherRewards";
import InventoryModal from "./InventoryModal";
import RulesModal from "./RulesModal";
import {
  ArrowLeft,
  Play,
  Trophy,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Area, Block, Section } from "@/lib/by/Div";
import { useGetVoucherByEventIdQuery } from "@/process/api/api";

const DEFAULTS = {
  title: "Game",
  playButton: `Start`,
  inventoryButton: "My Winnings",
  rulesButton: "Rules",
};

export default function GameHomeLayout({
  children,
  type,
  playButtonText = DEFAULTS.playButton,
  inventoryButtonText = DEFAULTS.inventoryButton,
  rulesButtonText = DEFAULTS.rulesButton,
  backgroundImage,
  eventData,
  event,
}: {
  children?: React.ReactNode;
  title?: string;
  type?: string;
  playButtonText?: string;
  backgroundImage?: string;
  inventoryButtonText?: string;
  rulesButtonText?: string;
  eventData?: ILeaderBoardData;
  event?: IEvent;
}) {
  const [showInventory, setShowInventory] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const { data } = useGetVoucherByEventIdQuery(eventData?.event.id ?? "");
  const router = useRouter();

  const toggleLeaderboard = () => {
    setShowLeaderboard((prev) => !prev);
    if (showRewards) setShowRewards(false); // Close Rewards if open
  };

  // Handler to toggle Rewards and close Leaderboard
  const toggleRewards = () => {
    setShowRewards((prev) => !prev);
    if (showLeaderboard) setShowLeaderboard(false); // Close Leaderboard if open
  };

  return (
    <Area
      className="min-h-screen flex p-4 gap-5"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "pink",
      }}
    >
      {/* Left Sidebar - Back Button & Leaderboard */}
      <Section
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          showLeaderboard ? "w-60" : "w-16"
        }`}
      >
        {/* Back Button */}
        <Block className="mb-4">
          <button
            className="game-button w-12 p-0"
            onClick={() => router.back()}
          >
            <Block className="p-0">
              <span className="!px-0">
                <ArrowLeft size={20} strokeWidth={3} />
              </span>
            </Block>
          </button>
        </Block>

        {/* Leaderboard Toggle Button */}
        <Section className="mb-4 ">
          <button
            className={`game-button p-0  ${showLeaderboard ? "w-full" : ""}`}
            onClick={toggleLeaderboard}
          >
            <Block className="flex items-center justify-center gap-2  p-3">
              {showLeaderboard ? (
                <>
                  <ChevronLeft className="w-5 h-5" />
                  <span className="!p-0">Leaderboard</span>
                  <Trophy className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </Block>
          </button>
        </Section>

        {/* Leaderboard Content */}
        <Section
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showLeaderboard ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          }`}
        >
          {showLeaderboard && (
            <Block>
              <Leaderboard
                leaders={eventData?.leaderboard || []}
                user_rank={eventData?.user_rank}
                hideToggleButton={true}
              />
            </Block>
          )}
        </Section>
      </Section>

      {/* Center Content - Title, Children, Footer */}
      <Section className="flex-1 flex flex-col justify-between items-center">
        {/* Game Title */}
        {/* <Block className="flex items-center justify-center">
          <RText className="text-5xl font-extrabold text-white text-center drop-shadow-lg">
            {title}
          </RText>
        </Block> */}

        {/* Children Content */}
        <Section className="w-full flex flex-1 items-center justify-center">
          {children}
        </Section>

        {/* Footer Buttons */}
        <Section className="w-full flex items-center justify-center space-x-10 px-8">
          {/* Rules Button */}
          <button
            className="game-button px-6 py-3 text-lg font-semibold"
            onClick={() => setShowRules(true)}
          >
            <Block>
              <span>{rulesButtonText}</span>
            </Block>
          </button>

          {/* Play Button */}
          {type !== "DEFENDER" && type !== "DROP" && (
            <button className="game-button">
              <Block>
                <span className="text-xl mx-4 flex items-center">
                  {playButtonText}
                  <Play fill="black" size={20} className="ml-2 mb-1" />
                </span>
              </Block>
            </button>
          )}

          {/* Inventory Button */}
          <button
            className="game-button px-6 py-3 text-lg font-semibold"
            onClick={() => setShowInventory(true)}
          >
            <Block>
              <span>{inventoryButtonText}</span>
            </Block>
          </button>
        </Section>
      </Section>

      {/* Right Sidebar - Rewards */}
      <Section
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          showRewards ? "w-60" : "w-16"
        }`}
      >
        {/* Rewards Toggle Button */}
        <Block className="mb-4">
          <button
            className={`game-button p-0  ${showRewards ? "w-full" : ""}`}
            onClick={toggleRewards}
          >
            <Block className="flex items-center justify-center gap-2 p-3 ">
              {showRewards ? (
                <>
                  <Star className="w-5 h-5" />
                  <span className="!p-0">Rank Rewards</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Star className="w-5 h-5" />
                </>
              )}
            </Block>
          </button>
        </Block>

        {/* Rewards Content */}
        <Block
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showRewards ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
          }`}
        >
          {showRewards && event && (
            <div>
              <VoucherRewards
                event={event}
                rewards={eventData?.rewards ?? []}
                hideToggleButton={true}
              />
            </div>
          )}
        </Block>
      </Section>

      {/* Modals */}
      <InventoryModal
        open={showInventory}
        onClose={() => setShowInventory(false)}
        vouchers={data?.vouchers}
      />
      <RulesModal open={showRules} onClose={() => setShowRules(false)} />
    </Area>
  );
}
