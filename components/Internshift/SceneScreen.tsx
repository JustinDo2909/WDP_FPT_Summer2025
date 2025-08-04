"use client";

import { Row, RText } from "@/lib/by/Div";
import { useGameState } from "./seg/useGameState";
import CustomerInteraction from "./scenes/CustomerInteraction";
import ChoosingProducts from "./scenes/ChoosingProducts";
import { useEffect, useState } from "react";
import MaskMixing from "./scenes/MaskMixing";
import { SceneName } from "@/types/intershift";
import { Coins, Star } from "lucide-react";
import { range } from "lodash";
import { useCalculateRewardMutation } from "@/process/api/apiEvent";
import { useRouter } from "next/navigation";
// Import more scenes when ready
// import ChoosingProducts from "./scenes/ChoosingProducts";
// import MaskMixing from "./scenes/MaskMixing";
// import PimplePopping from "./scenes/PimplePopping";

const img = "https://i.ibb.co/35vtsM31/cosmetics-shop.jpg";

export const SceneScreen = ({ eventId }: { eventId: string }) => {
  const gameStateApi = useGameState();

  const [showRewardModal, setShowRewardModal] = useState(false);
  const [voucher, setVoucher] = useState<EventReward>();
  const router = useRouter();
  const [calculateReward, { isLoading: isCalculating }] =
    useCalculateRewardMutation();
  const {
    gameState,
    startNewCustomer,
    selectProduct,
    removeProduct,
    setGameScene,
    selectProductType,
    removeProductType,
    submitRoutine,
    submitProducts,
    nextCustomer,
    onMixComplete
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
          setGameScene={setGameScene}
          nextCustomer={nextCustomer}
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
          submitProducts={submitProducts}
        />
      );
    }
    if (
      gameState.gameScene === SceneName.MASK_MIXING &&
      gameState.currentCustomer
    ) {
    if (
      gameState.gameScene === SceneName.MASK_MIXING &&
      gameState.currentCustomer
    ) {
      return (
        <MaskMixing
          customerSkinType={
            gameState.currentCustomer.case.skinType ||
            gameState.currentCustomer.case.caseName
          }
          onMixComplete={(success: boolean, bonus: number) => {
            onMixComplete(success, bonus);
          }}
        />
      );
    }
    // case SceneName.PIMPLE_POPPING:
    //   return <PimplePopping ... />;
    return <div className="text-white p-6">Scene not found</div>;
  };

  const handleEndGame = async () => {
    try {
      const reward = await calculateReward({
        eventId: eventId,
        correct_answers: gameState.profit,
      }).unwrap();
      setVoucher(reward);
      setShowRewardModal(true);
    } catch (err) {
      setVoucher(undefined);
      setShowRewardModal(true);
      console.log(err);
    }
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
      <div className="h-10 bg-gray-800 flex items-center justify-between px-6 relative">
        <RText className="text-white font-raleway">Internshift</RText>
        <button
          className="game-button px-4 py-2 bg-yellow-500 text-white rounded ml-auto"
          onClick={handleEndGame}
          disabled={isCalculating}
        >
          <div>
            <span className="!py-0">
              {isCalculating ? "Calculating..." : "End Game"}
            </span>
          </div>
        </button>
      </div>

      {/* Reward Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-yellow-700">
              Congratulations!
            </h2>
            {voucher ? (
              <>
                <div className="text-lg mb-2">You have won a voucher:</div>
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl px-6 py-4 text-center text-yellow-800 text-xl font-bold mb-4">
                {voucher.reward?.discountValue} {voucher.reward?.discountType === "PERCENT" ? " %" : " đ"}  off
                </div>
              </>
            ) : (
              <div className="text-lg text-gray-700 mb-4">
                You&apos;ve received the max amount of vouchers for today
              </div>
            )}

            {voucher?.score && (
              <div className="text-lg text-gray-700 mb-2">
                Your Score: {voucher.score}
                {voucher.is_new_high_score && " (New High Score!)"}
              </div>
            )}
            <button
              className="game-button px-4 py-2 bg-gray-700 text-white rounded mt-2"
              onClick={() => {
                setShowRewardModal(false);
                router.back();
              }}
            >
              <div>
                <span>Back To Game Screen</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
