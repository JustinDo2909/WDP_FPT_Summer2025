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
import {
  useCalculateRewardMutation,
  usePlayEventMutation,
} from "@/process/api/apiEvent";

export default function CosmeticCatchGame() {
  const [gameModes] = useState<{ [key: string]: GameMode }>(GAME_MODES);
  const [gameState, setGameState] = useState<
    "menu" | "modeSelect" | "playing" | "gameOver" | "restricted"
  >("menu");
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [playError, setPlayError] = useState<string | null>(null);
  const [reward, setReward] = useState<EventReward | null>(null);

  const { imagesLoaded } = useImageLoader();
  const gameLogic = useGameLogic(
    gameModes,
    selectedMode,
    gameState,
    setGameState
  );

  const [playEvent] = usePlayEventMutation();
  const [calculateReward] = useCalculateRewardMutation();

  const startGame = async (mode: string) => {
    setSelectedMode(mode);
    if (mode === "official") {
      try {
        const result = await playEvent().unwrap();
        if (result.success === true) {
          setGameState("playing");
          return;
        }
      } catch {
        setPlayError(
          "You have already played today! Please come back tomorrow!"
        );
        setGameState("restricted");
        return;
      }
    }
    gameLogic.startGame(mode);
    setGameState("playing");
  };

  const handleEndGame = async () => {
    setGameState("gameOver");
    if (selectedMode === "official") {
      try {
        const result = await calculateReward({
          eventId: 2,
          correct_answers: gameLogic.score,
        }).unwrap();
        setReward(result);
      } catch {
        setReward(null);
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

  if (gameState === "modeSelect" || gameState === "restricted") {
    return (
      <ModeSelect
        gameModes={gameModes}
        onStartGame={startGame}
        onBackToMenu={goToMenu}
        restrictedMessage={gameState === "restricted" ? playError : null}
      />
    );
  }

  if (gameState === "gameOver") {
    return (
      <GameOver
        score={gameLogic.score}
        selectedMode={selectedMode}
        currentMode={gameModes[selectedMode] || gameModes.practice}
        reward={selectedMode === "official" ? reward : null}
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
