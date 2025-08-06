"use client";

import {
  gameProducts,
  gameMaskIngredients,
  npcProfiles,
} from "@/constants/intershift-game";
import { SceneName } from "@/types/intershift";
import { useState, useCallback } from "react";

//#region Constants
const customers: NPCProfile[] = npcProfiles;
const products: GameProduct[] = gameProducts;
const maskIngredients: MaskIngredient[] = gameMaskIngredients;
//#endregion

//#region Hook
export const useGameState = () => {
  //#region State
  const [gameState, setGameState] = useState<GameState>({
    currentCustomer: undefined,
    selectedProductTypes: [],
    selectedProducts: [],
    profit: 0,
    meter: 0,
    currentDialogue: "",
    customersServed: 0,
    waitingForFeedback: [],
    showMaskCrafting: false,
    showNextCustomer: false,
    gameScene: SceneName.CUSTOMER_INTERFACE,
  });
  //#endregion

  //#region Helpers
  // Wrapper for setGameState to log state changes
  const setGameStateWithLogging = useCallback(
    (newState: GameState | ((prev: GameState) => GameState)) => {
      setGameState((prev) => {
        const updatedState =
          typeof newState === "function" ? newState(prev) : newState;
        console.log("Game State Change:", {
          previousState: prev,
          newState: updatedState,
          timestamp: new Date().toISOString(),
        });
        return updatedState;
      });
    },
    [],
  );
  //#endregion

  //#region Product Type Selection
  const selectProductType = useCallback((type: string) => {
    setGameStateWithLogging((prev) => {
      if (
        prev.selectedProductTypes.includes(type) ||
        prev.selectedProductTypes.length >= (prev.currentCustomer?.steps || 5)
      ) {
        return prev;
      }
      return {
        ...prev,
        selectedProductTypes: [...prev.selectedProductTypes, type],
      };
    });
  }, []);

  const removeProductType = useCallback((type: string) => {
    setGameStateWithLogging((prev) => ({
      ...prev,
      selectedProductTypes: prev.selectedProductTypes.filter((t) => t !== type),
    }));
  }, []);
  //#endregion

  //#region Customer Management
  const getRandomCustomer = useCallback(() => {
    const availableCustomers = customers.filter(
      (c) => c.id !== gameState.currentCustomer?.id,
    );
    console.log(
      "Selecting random customer, excluding ID:",
      gameState.currentCustomer?.id,
    );
    return availableCustomers[
      Math.floor(Math.random() * availableCustomers.length)
    ];
  }, [gameState.currentCustomer]);

  const startNewCustomer = useCallback(() => {
    const newCustomer = getRandomCustomer();
    console.log("New customer selected:", newCustomer);
    setGameStateWithLogging((prev) => ({
      ...prev,
      currentCustomer: newCustomer,
      selectedProducts: [],
      selectedProductTypes: [],
      showNextCustomer: false,
      meter: 0,
      currentDialogue: newCustomer.concern_line,
      gameScene: SceneName.CUSTOMER_INTERFACE,
      showMaskCrafting: false,
    }));
  }, [getRandomCustomer]);
  //#endregion

  //#region Product Selection
  const selectProduct = useCallback((product: GameProduct) => {
    setGameStateWithLogging((prev) => {
      const alreadySelected = prev.selectedProducts.some(
        (p) => p.id === product.id,
      );
      if (prev.selectedProducts.length >= 5 || alreadySelected) return prev;

      return {
        ...prev,
        selectedProducts: [...prev.selectedProducts, product],
      };
    });
  }, []);

  const removeProduct = useCallback((productId: number) => {
    setGameStateWithLogging((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((p) => p.id !== productId),
    }));
  }, []);
  //#endregion

  //#region Products Evaluation
  const evaluateProducts = useCallback(
    (customer: NPCProfile, selected: GameProduct[]) => {
      if (selected.length < 3) return false;

      const selectedIngredients = selected.flatMap((p) => p.ingredients);
      const requiredMatches = customer.case.requiredIngredients.filter((req) =>
        selectedIngredients.includes(req),
      ).length;

      const avoidedAll = customer.case.avoidIngredients.every(
        (avoid) => !selectedIngredients.includes(avoid),
      );

      const successThreshold = Math.ceil(
        customer.case.requiredIngredients.length * 0.6,
      );
      return requiredMatches >= successThreshold && avoidedAll;
    },
    [],
  );
  //#endregion

  //#region Routine Evaluation
  const evaluateRoutine = useCallback(
    (customer: NPCProfile, selected: string[]) => {
      if (selected.length < customer.steps) return false;

      const requiredMatches = customer.case.requiredProducts.filter((req) =>
        selected.includes(req),
      ).length;

      const successThreshold = Math.ceil(
        customer.case.requiredProducts.length * 0.6,
      );
      return requiredMatches >= successThreshold;
    },
    [],
  );
  //#endregion

  //#region Routine Submission
  const submitRoutine = useCallback(
    (customer: NPCProfile) => {
      // const customer = gameState.currentCustomer;
      const types = gameState.selectedProductTypes;
      console.log("customer", customer);
      console.log("gamestate", gameState);
      if (!customer || types.length < 3) return;

      const success = evaluateRoutine(customer, gameState.selectedProductTypes);

      setGameStateWithLogging((prev) => ({
        ...prev,
        meter: success ? 1 : 0,
        gameScene: SceneName.CUSTOMER_INTERFACE,
        customersServed: prev.customersServed + 1,
      }));

      setGameScene(SceneName.CHOOSING_PRODUCTS);
    },
    [
      gameState.currentCustomer,
      gameState.selectedProductTypes,
      evaluateRoutine,
    ],
  );
  //#endregion

  //#region Products Submission
  const submitProducts = useCallback(() => {
    const customer = gameState.currentCustomer;
    if (!customer || gameState.selectedProducts.length < 3) return;

    const success = evaluateProducts(customer, gameState.selectedProducts);
    const routineCost = gameState.selectedProducts.reduce((sum) => sum + 50, 0); // Add price to GameProduct type if needed
    const feedbackMessage = customer.thanks_line;

    setGameStateWithLogging((prev) => ({
      ...prev,
      meter: success ? prev.meter + 1 : prev.meter,
      waitingForFeedback: [...prev.waitingForFeedback, customer],
      profit: success
        ? prev.profit + Math.floor(routineCost * 1.2)
        : prev.profit + Math.floor(routineCost),
      customersServed: prev.customersServed + 1,
      showNextCustomer: !success || prev.meter < 1 ? true : false,
      showMaskCrafting: success && prev.meter === 1,
      currentDialogue: feedbackMessage,
    }));

    setTimeout(() => {
      setGameStateWithLogging((prev) => ({
        ...prev,
        gameScene: SceneName.CUSTOMER_INTERFACE,
      }));
    }, 500);
  }, [gameState.currentCustomer, gameState.selectedProducts, evaluateProducts]);
  //#endregion

  //#region Products Submission
  const onMixComplete = useCallback(
    (success: boolean, bonus: number) => {
      const customer = gameState.currentCustomer;
      if (!customer) return;

      const feedbackMessage = customer.thanks_line;

      setGameStateWithLogging((prev) => ({
        ...prev,
        profit: success ? prev.profit + bonus : prev.profit,
        customersServed: prev.customersServed + 1,
        showNextCustomer: !success || prev.meter < 1 ? true : false,
        showMaskCrafting: success && prev.meter === 1,
        currentDialogue: feedbackMessage,
      }));

      setTimeout(() => {
        setGameStateWithLogging((prev) => ({
          ...prev,
          gameScene: SceneName.CUSTOMER_INTERFACE,
        }));
      }, 500);
    },
    [gameState.currentCustomer],
  );
  //#endregion

  //#region Mask Crafting
  const craftMask = useCallback(
    (ingredients: MaskIngredient[]) => {
      const customer = gameState.currentCustomer;
      if (!customer || ingredients.length !== 3) return;

      const ingredientNames = ingredients.map((i) => i.name);
      const matches = customer.case.requiredIngredients.filter((req) =>
        ingredientNames.includes(req),
      ).length;

      const bonus = matches * 25;
      setGameStateWithLogging((prev) => ({
        ...prev,
        profit: prev.profit + bonus,
        showMaskCrafting: false,
      }));

      return bonus;
    },
    [gameState.currentCustomer],
  );
  //#endregion

  //#region Navigation
  const nextCustomer = useCallback(() => {
    startNewCustomer();
  }, [startNewCustomer]);

  const setGameScene = useCallback((scene: SceneName) => {
    setGameStateWithLogging((prev) => ({ ...prev, gameScene: scene }));
  }, []);
  //#endregion

  //#region Return
  return {
    gameState,
    products,
    maskIngredients,
    startNewCustomer,
    selectProduct,
    removeProduct,
    submitRoutine,
    submitProducts,
    craftMask,
    nextCustomer,
    setGameScene,
    selectProductType,
    removeProductType,
    onMixComplete,
  };
  //#endregion
};
//#endregion
