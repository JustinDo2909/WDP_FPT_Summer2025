"use client";

import { Block, Box, Card, Row, RText } from "@/lib/by/Div";
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

const img =
  "https://static.vecteezy.com/system/resources/previews/015/485/938/non_2x/cosmetics-shop-with-skincare-and-makeup-products-free-vector.jpg";

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
    onMixComplete,
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
    }
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
    <div className="relative w-full mx-auto">
      {/* Clinic Background */}
      <div
        className="relative max-h-screen overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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

            <Block className="text-center ">
              <RText className="text-6xl font-bold font-sans text-purple-700 drop-shadow-md">
                {voucher?.score}
              </RText>
              <RText className="text-sm text-gray-600 font-medium tracking-wider uppercase mt-1">
                total points
              </RText>
            </Block>
            {voucher?.is_new_high_score && (
              <Box className="mt-2 text-center">
                <RText className="text-sm text-green-600 font-semibold">
                  New High Score!
                </RText>
              </Box>
            )}

            {voucher && voucher.success && (
              <Card className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-400 shadow-xl rounded-2xl px-5 py-4 my-6 flex items-center justify-between gap-4">
                <Box className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-yellow-300 shadow-md" />
                <Box className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-yellow-300 shadow-md" />

                {voucher.reward ? (
                  <>
                    <Box className="flex-1 text-left">
                      <RText className="text-base font-bold text-yellow-800">
                        🎉 Congratulations!
                      </RText>

                      <RText className="text-sm text-gray-600 mt-1">
                        {voucher.reward.discountValue}
                      </RText>

                      <RText className="text-xs italic text-gray-500 mt-1">
                        Reward will be saved to your profile.
                      </RText>
                    </Box>

                    <Box className="text-right min-w-[90px]">
                      <RText className="text-3xl font-black text-orange-600">
                        {voucher.reward?.discountType === "AMOUNT"
                          ? `₫${voucher.reward.discountValue?.toLocaleString()}`
                          : "%"}
                      </RText>
                      <RText className="text-sm text-yellow-700 font-semibold">
                        OFF
                      </RText>
                    </Box>
                  </>
                ) : voucher.voucher_already_received ? (
                  <Box className="flex-1 text-left">
                    <RText className="text-base font-bold text-yellow-800">
                      Notification
                    </RText>

                    <RText className="text-sm text-gray-600 mt-1">
                      {voucher.message}
                    </RText>
                  </Box>
                ) : (
                  <Box className="flex-1 text-left">
                    <RText className="text-base font-bold text-yellow-800">
                      Notification
                    </RText>

                    <RText className="text-sm text-gray-600 mt-1">
                      {voucher.message}
                    </RText>
                  </Box>
                )}
              </Card>
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
