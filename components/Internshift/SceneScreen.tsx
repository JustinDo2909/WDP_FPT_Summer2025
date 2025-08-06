"use client";

import { Row, RText } from "@/lib/by/Div";
import { useGameState } from "./seg/useGameState";
import CustomerInteraction from "./scenes/CustomerInteraction";
import ChoosingProducts from "./scenes/ChoosingProducts";
import { useEffect } from "react";
import { SceneName } from "@/types/intershift";
import { Coins, Star } from "lucide-react";
import { range } from "lodash";
// Import more scenes when ready
// import ChoosingProducts from "./scenes/ChoosingProducts";
// import MaskMixing from "./scenes/MaskMixing";
// import PimplePopping from "./scenes/PimplePopping";

const img = "https://i.ibb.co/LDBrKZsh/cosmetics-shop.jpg";

export const SceneScreen = () => {
  const gameStateApi = useGameState();
  const {
    gameState,
    startNewCustomer,
    selectProduct,
    removeProduct,
    setGameScene,
    selectProductType,
    removeProductType,
    submitRoutine,
  } = gameStateApi;

  // Call startNewCustomer when the component mounts
  useEffect(() => {
    if (!gameState.currentCustomer) {
      console.log("No current customer, starting new customer...");
      startNewCustomer();
    }
  }, [startNewCustomer, gameState.currentCustomer]);

  useEffect(() => {
    console.log("Current customer:", gameState.currentCustomer);
  }, [gameState.currentCustomer]);

  const renderGameUI = () => {
    console.log(gameState.gameScene);
    console.log(gameState.currentCustomer);
    if (
      gameState.gameScene === SceneName.CUSTOMER_INTERFACE &&
      gameState.currentCustomer
    ) {
      return (
        <CustomerInteraction
          customer={gameState.currentCustomer}
          gameState={gameState}
          selectProductType={selectProductType}
          removeProductType={removeProductType}
          submitRoutine={submitRoutine}
        />
      );
    }
    if (gameState.gameScene === SceneName.CHOOSING_PRODUCTS) {
      return (
        <ChoosingProducts
          selectedProductTypes={gameState.selectedProductTypes}
          selectedProducts={gameState.selectedProducts}
          selectProduct={selectProduct}
          removeProduct={removeProduct}
          currentCustomer={gameState.currentCustomer}
          setGameScene={setGameScene}
        />
      );
    }
    // case SceneName.MASK_MIXING:
    //   return <MaskMixing ... />;
    // case SceneName.PIMPLE_POPPING:
    //   return <PimplePopping ... />;
    return <div className="text-white p-6">Scene not found</div>;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Clinic Background */}
      <div
        className="relative min-h-[600px] overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <div className="relative z-10 p-6 w-full h-full min-h-[600px]">
          <div className="top-8 absolute left-8 flex space-x-4">
            <Row className="bg-white rounded-full p-2 flex items-center">
              <Coins size={18} fill={"yellow"} stroke="orange" />
              <RText className="mx-2">{gameState.profit}</RText>
            </Row>
            <Row className="bg-white rounded-full p-2 flex items-center space-x-1">
              <RText className="mx-2">Effectiveness</RText>
              {range(2).map((i) => (
                <Star
                  key={i}
                  size={24}
                  fill={gameState.meter > i ? "yellow" : "#D4d4d4"}
                  stroke={gameState.meter > i ? "yellow" : "#d4d4d4"}
                />
              ))}
            </Row>
          </div>
          {renderGameUI()}
        </div>
      </div>

      {/* Footer */}
      <div className="h-10 bg-gray-800 flex items-center">
        <RText className="text-white font-raleway ml-6">Internshift</RText>
      </div>
    </div>
  );
};
