"use client";

import { useState } from "react";
import { GAME_MODES } from "@/constants";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useImageLoader } from "@/hooks/useImageLoader";
import LoadingScreen from "./loading";
import GameMenu from "./menu_game";
import ModeSelect from "./selectMode";
import GameOver from "./result";
import GameCanvas from "./GameCanvas";
import { useCalculateRewardMutation } from "@/process/api/apiEvent";
import { useSearchParams } from "next/navigation";

export default function CosmeticCatchGame() {
  const [gameModes] = useState<{ [key: string]: GameMode }>(GAME_MODES);
  const [gameState, setGameState] = useState<
    "menu" | "modeSelect" | "playing" | "gameOver"
  >("menu");
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [rewardData, setRewardData] = useState<EventReward>();

  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");

  const { imagesLoaded } = useImageLoader();
  const gameLogic = useGameLogic(
    gameModes,
    selectedMode,
    gameState,
    setGameState
  );
  const [calculateReward] = useCalculateRewardMutation();

  const startGame = async (mode: string) => {
    setSelectedMode(mode);
    gameLogic.startGame(mode);
    setGameState("playing");
  };

  const handleEndGame = async () => {
    setGameState("gameOver");
    if (selectedMode === "official") {
      try {
        const response = await calculateReward({
          eventId: event_id || "",
          correct_answers: gameLogic.score,
        }).unwrap();
        console.log("Reward data:", response);
        setRewardData(response); // Save the reward data
      } catch (err) {
        console.error("Mutation error:", err);
      }
    }
  };

  const goToModeSelect = () => setGameState("modeSelect");
  const goToMenu = () => setGameState("menu");

  if (!imagesLoaded) {
    return <LoadingScreen />;
  }

  if (gameState === "menu") {
    return <GameMenu onModeSelect={goToModeSelect} />;
  }

  if (gameState === "modeSelect") {
    return (
      <ModeSelect
        gameModes={gameModes}
        onStartGame={startGame}
        onBackToMenu={goToMenu}
      />
    );
  }

  if (gameState === "gameOver") {
    return (
      <GameOver
        rewardInfo={rewardData}
        score={gameLogic.score}
        selectedMode={selectedMode}
        currentMode={gameModes[selectedMode] || gameModes.practice}
        onPlayAgain={() => startGame(selectedMode)}
        onModeSelect={goToModeSelect}
        onBackToMenu={goToMenu}
      />
    );
  }

  return (
    <GameCanvas
      gameLogic={gameLogic}
      selectedMode={selectedMode}
      currentMode={gameModes[selectedMode] || gameModes.practice}
      onEndGame={handleEndGame}
    />
  );
}
