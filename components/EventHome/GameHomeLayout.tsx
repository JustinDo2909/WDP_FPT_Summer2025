"use client";
import React, { useState } from "react";
import Leaderboard from "./Leaderboard";
import VoucherRewards from "./VoucherRewards";
import InventoryModal from "./InventoryModal";
import RulesModal from "./RulesModal";
import { ArrowLeft, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { Area, Block, RText, Section } from "@/lib/by/Div";

const DEFAULTS = {
  title: "Game",
  playButton: `Start`,
  inventoryButton: "My Winnings",
  rulesButton: "Rules",
};

export default function GameHomeLayout({
  children,
  title = DEFAULTS.title,
  playButtonText = DEFAULTS.playButton,
  inventoryButtonText = DEFAULTS.inventoryButton,
  rulesButtonText = DEFAULTS.rulesButton,
  eventData,
}: {
  children?: React.ReactNode;
  title?: string;
  playButtonText?: string;
  inventoryButtonText?: string;
  rulesButtonText?: string;
  eventData?: ILeaderBoardData;
}) {
  const [showInventory, setShowInventory] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const router = useRouter();
  console.log(eventData);

  return (
    <Area
      className="relative min-h-screen flex flex-col justify-between items-stretch"
      style={{
        backgroundImage: "url('/internshift-bg-placeholder.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "pink",
      }}
    >
      <button
        className="game-button absolute top-8 left-12 z-10 w-12 p-0"
        onClick={() => router.back()}
      >
        <Block className="p-0">
          <span className="!px-0">
            {" "}
            <ArrowLeft size={20} strokeWidth={3} />
          </span>
        </Block>
      </button>
      {/* Left: Leaderboard */}
      <Section className="absolute top-24 left-8 z-10">
        <Leaderboard leaders={eventData?.leaderboard || []} />
      </Section>

      {/* Right: Voucher Rewards */}
      <Section className="absolute top-24 right-8 z-10">
        <VoucherRewards rewards={eventData?.rewards ?? []} />
      </Section>

      {/* Center: Game Title */}
      <Section className="flex flex-1 items-center justify-center">
        <RText className="text-5xl font-extrabold text-white text-center drop-shadow-lg">
          {title}
        </RText>
      </Section>

      {/* Footer: Buttons */}
      <Section className="w-full absolute bottom-0 left-0 flex items-center justify-center space-x-10 px-8 py-6 z-20">
        {/* Rules Button */}
        <button
          className="game-button px-6 py-3 text-lg font-semibold"
          onClick={() => setShowRules(true)}
        >
          <Block>
            <span> {rulesButtonText}</span>
          </Block>
        </button>

        {/* Play Button */}
        <button
          className="game-button"
          // style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Block>
            <span className="text-xl mx-4 flex items-center">
              {" "}
              {playButtonText} <Play fill="black" size={20} className="mb-1" />
            </span>
          </Block>
        </button>

        {/* Inventory Button */}
        <button
          className="game-button px-6 py-3 text-lg font-semibold"
          onClick={() => setShowInventory(true)}
        >
          <Block>
            <span> {inventoryButtonText}</span>
          </Block>
        </button>
      </Section>

      {/* Modals */}
      <InventoryModal
        open={showInventory}
        onClose={() => setShowInventory(false)}
      />
      <RulesModal open={showRules} onClose={() => setShowRules(false)} />

      {/* Children (if any) */}
      <Section className="flex flex-1 items-center justify-center">
        {children}
      </Section>
    </Area>
  );
}
