"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { RotateCcw, Star, Trophy, Clock, Target, Sparkles } from "lucide-react";

interface Card {
  id: number;
  name: string;
  emoji: string;
  color: string;
  benefit: string;
  usage: string;
  uniqueId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // Skincare product data, using useMemo to avoid recreation
  const products = useMemo<Card[]>(
    () => [
      {
        id: 1,
        name: "Cleanser",
        emoji: "🧴",
        color: "from-blue-400 to-blue-600",
        benefit: "Gently cleanses skin",
        usage: "Morning & Night",
        uniqueId: "",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 2,
        name: "Toner",
        emoji: "💧",
        color: "from-cyan-400 to-cyan-600",
        benefit: "Balances skin pH",
        usage: "After cleansing",
        uniqueId: "",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 3,
        name: "Vitamin C Serum",
        emoji: "🍊",
        color: "from-orange-400 to-orange-600",
        benefit: "Antioxidant, brightens skin",
        usage: "Morning",
        uniqueId: "",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 4,
        name: "Moisturizer",
        emoji: "🥥",
        color: "from-green-400 to-green-600",
        benefit: "Deeply hydrates skin",
        usage: "Morning & Night",
        uniqueId: "",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 5,
        name: "Sunscreen",
        emoji: "☀️",
        color: "from-yellow-400 to-yellow-600",
        benefit: "Protects skin from UV rays",
        usage: "Morning",
        uniqueId: "",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 6,
        name: "Face Mask",
        emoji: "🎭",
        color: "from-purple-400 to-purple-600",
        benefit: "Intense hydration",
        usage: "2-3 times/week",
        uniqueId: "",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 7,
        name: "Retinol Serum",
        emoji: "🌙",
        color: "from-indigo-400 to-indigo-600",
        benefit: "Anti-aging, reduces wrinkles",
        usage: "Night",
        uniqueId: "",
        isFlipped: false,
        isMatched: false,
      },
      {
        id: 8,
        name: "Eye Cream",
        emoji: "👁️",
        color: "from-pink-400 to-pink-600",
        benefit: "Cares for eye area",
        usage: "Morning & Night",
        uniqueId: "",
        isFlipped: false,
        isMatched: false,
      },
    ],
    [],
  );

  // Create deck
  const createDeck = useCallback(() => {
    const deck: Card[] = [];
    products.forEach((product) => {
      for (let i = 0; i < 2; i++) {
        deck.push({
          ...product,
          uniqueId: `${product.id}-${i}`,
          isFlipped: false,
          isMatched: false,
        });
      }
    });
    return deck.sort(() => Math.random() - 0.5);
  }, [products]);

  // Initialize game
  const initGame = useCallback(() => {
    const newDeck = createDeck();
    setCards(newDeck);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
    setGameStarted(false);
    setTimeElapsed(0);
  }, [createDeck]);

  // Call initGame when component mounts
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTimeElapsed((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Handle card click
  const handleCardClick = (clickedCard: Card) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (
      clickedCard.isFlipped ||
      flippedCards.length === 2 ||
      clickedCard.isMatched
    ) {
      return;
    }

    // Flip card immediately
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.uniqueId === clickedCard.uniqueId
          ? { ...card, isFlipped: true }
          : card,
      ),
    );

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    // Check if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);

      if (newFlippedCards[0].id === newFlippedCards[1].id) {
        // Match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.uniqueId === newFlippedCards[0].uniqueId ||
              card.uniqueId === newFlippedCards[1].uniqueId
                ? { ...card, isMatched: true, isFlipped: true }
                : card,
            ),
          );

          setMatchedCards((prev) => [
            ...prev,
            newFlippedCards[0].uniqueId,
            newFlippedCards[1].uniqueId,
          ]);
          setFlippedCards([]);

          // Check for game win
          if (matchedCards.length + 2 === products.length * 2) {
            setGameWon(true);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.uniqueId === newFlippedCards[0].uniqueId ||
              card.uniqueId === newFlippedCards[1].uniqueId
                ? { ...card, isFlipped: false }
                : card,
            ),
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreRating = () => {
    const minMoves = products.length;
    if (moves <= minMoves + 2) return { rating: 3, text: "Outstanding!" };
    if (moves <= minMoves + 5) return { rating: 2, text: "Good!" };
    return { rating: 1, text: "Needs Improvement!" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-pink-500 w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Memory Game - Skincare Routine
            </h1>
            <Sparkles className="text-pink-500 w-8 h-8 ml-2" />
          </div>
          <p className="text-gray-600">
            Match identical skincare products to complete the routine!
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center space-x-6 mb-6">
          <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-100">
            <div className="flex items-center">
              <Target className="text-blue-500 w-5 h-5 mr-2" />
              <span className="text-gray-600">Moves: </span>
              <span className="font-bold text-blue-600">{moves}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-100">
            <div className="flex items-center">
              <Clock className="text-green-500 w-5 h-5 mr-2" />
              <span className="text-gray-600">Time: </span>
              <span className="font-bold text-green-600">
                {formatTime(timeElapsed)}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-100">
            <div className="flex items-center">
              <Star className="text-yellow-500 w-5 h-5 mr-2" />
              <span className="text-gray-600">Matches: </span>
              <span className="font-bold text-yellow-600">
                {matchedCards.length / 2}/{products.length}
              </span>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              className={`
                w-full aspect-square rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-lg
                ${card.isMatched ? "ring-4 ring-green-400" : ""}
                ${flippedCards.length === 2 && !card.isFlipped && !card.isMatched ? "cursor-not-allowed opacity-50" : ""}
              `}
            >
              {card.isFlipped || card.isMatched ? (
                <div
                  className={`
                  w-full h-full rounded-xl bg-gradient-to-br ${card.color} 
                  flex flex-col items-center justify-center text-white p-2 transition-all duration-300
                  ${card.isMatched ? "ring-4 ring-green-400 ring-offset-2" : ""}
                `}
                >
                  <div className="text-4xl mb-2">{card.emoji}</div>
                  <div className="text-xs font-semibold text-center leading-tight">
                    {card.name}
                  </div>
                  {card.isMatched && (
                    <div className="absolute top-1 right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center hover:from-pink-500 hover:to-purple-600 transition-all duration-300 hover:shadow-xl">
                  <div className="text-white text-4xl">✨</div>
                  <div className="absolute inset-0 bg-white bg-opacity-20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Win Modal */}
        {gameWon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <Trophy className="text-yellow-500 w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Congratulations!
              </h2>
              <p className="text-gray-600 mb-4">
                You completed the skincare routine!
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Time:</span>
                    <div className="font-bold text-blue-600">
                      {formatTime(timeElapsed)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Moves:</span>
                    <div className="font-bold text-green-600">{moves}</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-center">
                    {[...Array(getScoreRating().rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 w-5 h-5 fill-current"
                      />
                    ))}
                    {[...Array(3 - getScoreRating().rating)].map((_, i) => (
                      <Star key={i} className="text-gray-300 w-5 h-5" />
                    ))}
                    <span className="ml-2 font-semibold text-yellow-600">
                      {getScoreRating().text}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={initGame}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="text-center mb-8">
          <button
            onClick={initGame}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-full border border-gray-200 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center mx-auto"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </button>
        </div>

        {/* Product Guide */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            📚 Skincare Routine - Order of Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${product.color} flex items-center justify-center mr-4 shadow-md`}
                >
                  <span className="text-xl">{product.emoji}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600">{product.benefit}</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {product.usage}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-gray-800 mb-2">💡 Tips:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                • Order: Cleanser → Toner → Serum → Moisturizer → Sunscreen
              </li>
              <li>• Use Vitamin C in the morning, Retinol at night</li>
              <li>• Always apply sunscreen when going outside</li>
              <li>• Use face mask 2-3 times/week</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
