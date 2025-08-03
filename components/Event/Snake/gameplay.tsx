import React, { useState, useEffect, useCallback, useRef } from "react";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

const CosmeticSnakeGame = () => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const specialItemTimerRef = useRef(null);

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [obstacles, setObstacles] = useState([]);
  const [specialItems, setSpecialItems] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [itemsEaten, setItemsEaten] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [breakerActive, setBreakerActive] = useState(false);
  const [animations, setAnimations] = useState([]);

  // Calculate next level threshold
  const getNextLevelThreshold = useCallback((currentLevel) => {
    return currentLevel * 5;
  }, []);

  // Check if position overlaps with any existing items
  const isPositionOccupied = useCallback((pos, avoidPositions = []) => {
    return avoidPositions.some((item) => {
      if (item.size > 1) {
        // Check overlap with larger items
        for (let dx = 0; dx < item.size; dx++) {
          for (let dy = 0; dy < item.size; dy++) {
            if (pos.x === item.x + dx && pos.y === item.y + dy) return true;
          }
        }
      }
      return pos.x === item.x && pos.y === item.y;
    });
  }, []);

  // Generate random position that doesn't overlap with anything
  const generateRandomPosition = useCallback(
    (avoidPositions = [], itemSize = 1) => {
      let newPos;
      let attempts = 0;
      const maxAttempts = 100;

      do {
        newPos = {
          x: Math.floor(
            Math.random() * (CANVAS_WIDTH / GRID_SIZE - itemSize + 1)
          ),
          y: Math.floor(
            Math.random() * (CANVAS_HEIGHT / GRID_SIZE - itemSize + 1)
          ),
        };
        attempts++;
      } while (
        attempts < maxAttempts &&
        (isPositionOccupied(newPos, avoidPositions) ||
          // Check if the item would overlap with anything considering its size
          (itemSize > 1 &&
            avoidPositions.some((item) => {
              for (let dx = 0; dx < itemSize; dx++) {
                for (let dy = 0; dy < itemSize; dy++) {
                  if (
                    isPositionOccupied(
                      { x: newPos.x + dx, y: newPos.y + dy },
                      avoidPositions
                    )
                  ) {
                    return true;
                  }
                }
              }
              return false;
            })))
      );

      return newPos;
    },
    [isPositionOccupied]
  );

  // Initialize obstacles
  const initializeObstacles = useCallback(() => {
    const newObstacles = [];
    const avoidPositions = [...INITIAL_SNAKE, food];

    for (let i = 0; i < 2; i++) {
      const obstacle = { ...generateRandomPosition(avoidPositions), size: 1 };
      newObstacles.push(obstacle);
      avoidPositions.push(obstacle);
    }
    setObstacles(newObstacles);
  }, [generateRandomPosition, food]);

  // Add obstacles when leveling up
  const addObstacles = useCallback(() => {
    if (obstacles.length >= 24) return;

    const obstacleCount = Math.min(3, 24 - obstacles.length);
    const newObstacles = [];
    const avoidPositions = [...snake, food, ...obstacles, ...specialItems];

    for (let i = 0; i < obstacleCount; i++) {
      const newObstacle = {
        ...generateRandomPosition([...avoidPositions, ...newObstacles]),
        size: 1,
      };
      newObstacles.push(newObstacle);
    }

    setObstacles((prev) => [...prev, ...newObstacles]);
  }, [obstacles, snake, food, specialItems, generateRandomPosition]);

  // Generate special items (max 10 at a time)
  const generateSpecialItem = useCallback(() => {
    if (specialItems.length >= 10) return; // Limit to 10 special items

    const types = ["bonus", "breaker", "big"];
    const type = types[Math.floor(Math.random() * types.length)];
    const avoidPositions = [...snake, food, ...obstacles, ...specialItems];

    let size = 1;
    if (type === "big") {
      size = Math.random() < 0.5 ? 2 : 3;
    }

    const position = generateRandomPosition(avoidPositions, size);

    setSpecialItems((prev) => [
      ...prev,
      {
        ...position,
        type,
        size,
        duration: 600, // 10 seconds at 60fps (10 * 60 frames)
      },
    ]);
  }, [snake, food, obstacles, specialItems, generateRandomPosition]);

  // Start special item timer
  const startSpecialItemTimer = useCallback(() => {
    if (specialItemTimerRef.current) {
      clearTimeout(specialItemTimerRef.current);
    }

    const delay = (5 + Math.random() * 5) * 1000; // 5-10 seconds
    specialItemTimerRef.current = setTimeout(() => {
      generateSpecialItem();
      startSpecialItemTimer();
    }, delay);
  }, [generateSpecialItem]);

  // Add animation effect
  const addAnimation = useCallback((x, y, text, color = "#ff69b4") => {
    const id = Date.now() + Math.random();
    setAnimations((prev) => [...prev, { id, x, y, text, color, frames: 60 }]);

    setTimeout(() => {
      setAnimations((prev) => prev.filter((anim) => anim.id !== id));
    }, 1000);
  }, []);

  // Check collision
  const checkCollision = useCallback((head, positions) => {
    return positions.find((pos) => {
      if (pos.size > 1) {
        // Check collision with larger items
        for (let dx = 0; dx < pos.size; dx++) {
          for (let dy = 0; dy < pos.size; dy++) {
            if (head.x === pos.x + dx && head.y === pos.y + dy) return pos;
          }
        }
        return null;
      }
      return head.x === pos.x && head.y === pos.y ? pos : null;
    });
  }, []);

  // Draw item images using canvas
  const drawItem = useCallback((ctx, x, y, size, type) => {
    const pixelX = x * GRID_SIZE;
    const pixelY = y * GRID_SIZE;
    const itemSize = size * GRID_SIZE;

    switch (type) {
      case "food":
        // Lipstick 💄
        ctx.fillStyle = "#dc143c";
        ctx.fillRect(pixelX + 2, pixelY + 4, itemSize - 4, itemSize - 8);
        ctx.fillStyle = "#ff69b4";
        ctx.fillRect(pixelX + 4, pixelY + 2, itemSize - 8, 6);
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(pixelX + 3, pixelY + 12, itemSize - 6, 4);
        break;

      case "bonus":
        // Perfume bottle 🧴
        ctx.fillStyle = "#9370db";
        ctx.fillRect(pixelX + 3, pixelY + 6, itemSize - 6, itemSize - 8);
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(pixelX + 5, pixelY + 3, itemSize - 10, 6);
        ctx.fillStyle = "#ff69b4";
        ctx.fillRect(pixelX + 6, pixelY + 1, itemSize - 12, 4);
        break;

      case "breaker":
        // Hammer/Tool 🔨
        ctx.fillStyle = "#8b4513";
        ctx.fillRect(pixelX + 2, pixelY + 8, itemSize - 4, 8);
        ctx.fillStyle = "#c0c0c0";
        ctx.fillRect(pixelX + 4, pixelY + 2, itemSize - 8, 8);
        ctx.fillStyle = "#ff4500";
        ctx.font = "bold 8px Arial";
        ctx.textAlign = "center";
        ctx.fillText("💥", pixelX + itemSize / 2, pixelY + itemSize / 2 + 2);
        ctx.textAlign = "left";
        break;

      case "big":
        // Makeup palette 🎨
        ctx.fillStyle = "#4b0082";
        ctx.fillRect(pixelX, pixelY, itemSize, itemSize);
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(pixelX + 2, pixelY + 2, itemSize - 4, itemSize - 4);

        // Add palette colors
        const colors = [
          "#ff69b4",
          "#ff1493",
          "#dc143c",
          "#9370db",
          "#00ff00",
          "#ffff00",
          "#ff8c00",
          "#8a2be2",
        ];
        const colorsPerRow = size;
        const colorSize = Math.floor((itemSize - 8) / colorsPerRow);

        for (let i = 0; i < colors.length && i < size * size; i++) {
          const row = Math.floor(i / colorsPerRow);
          const col = i % colorsPerRow;
          const colorX = pixelX + 4 + col * colorSize;
          const colorY = pixelY + 4 + row * colorSize;

          ctx.fillStyle = colors[i];
          ctx.fillRect(colorX, colorY, colorSize - 1, colorSize - 1);
        }
        break;

      case "obstacle":
        // Makeup compact 💼
        ctx.fillStyle = "#8b4513";
        ctx.fillRect(pixelX, pixelY, itemSize, itemSize);
        ctx.fillStyle = "#daa520";
        ctx.fillRect(pixelX + 2, pixelY + 2, itemSize - 4, itemSize - 4);
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(pixelX + 4, pixelY + 6, itemSize - 8, 4);
        // Add mirror effect
        ctx.fillStyle = "#e6e6fa";
        ctx.fillRect(pixelX + 6, pixelY + 4, itemSize - 12, 2);
        break;
    }
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameOver || !gameStarted) return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };

      head.x += direction.x;
      head.y += direction.y;

      // Wall collision
      if (
        head.x < 0 ||
        head.x >= CANVAS_WIDTH / GRID_SIZE ||
        head.y < 0 ||
        head.y >= CANVAS_HEIGHT / GRID_SIZE
      ) {
        setGameOver(true);
        return currentSnake;
      }

      // Self collision
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return currentSnake;
      }

      // Obstacle collision
      const hitObstacle = checkCollision(head, obstacles);
      if (hitObstacle) {
        if (breakerActive) {
          // Break obstacle
          setObstacles((prev) => prev.filter((obs) => obs !== hitObstacle));
          setScore((prev) => prev + 50);
          addAnimation(
            head.x * GRID_SIZE,
            head.y * GRID_SIZE,
            "+50",
            "#ffd700"
          );
          setBreakerActive(false);
        } else {
          setGameOver(true);
          return currentSnake;
        }
      }

      newSnake.unshift(head);
      let shouldGrow = false;

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setItemsEaten((prev) => prev + 1);
        shouldGrow = true;

        // Generate new food position
        const avoidPositions = [...newSnake, ...obstacles, ...specialItems];
        setFood({ ...generateRandomPosition(avoidPositions), size: 1 });
      }

      // Special item collision
      const hitSpecialItem = checkCollision(head, specialItems);
      if (hitSpecialItem) {
        let points = 0;
        let message = "";

        switch (hitSpecialItem.type) {
          case "bonus":
            points = 25;
            message = "+25 BONUS!";
            break;
          case "breaker":
            setBreakerActive(true);
            message = "BREAKER ACTIVE!";
            addAnimation(
              head.x * GRID_SIZE,
              head.y * GRID_SIZE,
              message,
              "#ff4500"
            );
            break;
          case "big":
            points = hitSpecialItem.size === 2 ? 30 : 50;
            message = `+${points} BIG!`;
            shouldGrow = true;
            setItemsEaten((prev) => prev + 1);
            break;
        }

        if (points > 0) {
          setScore((prev) => prev + points);
          addAnimation(
            head.x * GRID_SIZE,
            head.y * GRID_SIZE,
            message,
            "#ff69b4"
          );
        }

        // Remove the special item when eaten (all special items disappear when eaten)
        setSpecialItems((prev) =>
          prev.filter((item) => item !== hitSpecialItem)
        );
      }

      // Check for level up
      const currentThreshold = getNextLevelThreshold(level);
      if (itemsEaten >= currentThreshold) {
        setLevel((prev) => prev + 1);
        addObstacles();
        addAnimation(
          head.x * GRID_SIZE,
          head.y * GRID_SIZE,
          "LEVEL UP!",
          "#00ff00"
        );
      }

      // Remove tail if not growing
      if (!shouldGrow) {
        newSnake.pop();
      }

      return newSnake;
    });

    // Update special items duration (10 seconds = 600 frames at ~60fps)
    setSpecialItems((prev) =>
      prev
        .map((item) => ({ ...item, duration: item.duration - 1 }))
        .filter((item) => item.duration > 0)
    );

    // Update animations
    setAnimations((prev) =>
      prev
        .map((anim) => ({ ...anim, frames: anim.frames - 1 }))
        .filter((anim) => anim.frames > 0)
    );
  }, [
    direction,
    gameOver,
    gameStarted,
    food,
    obstacles,
    specialItems,
    score,
    itemsEaten,
    level,
    checkCollision,
    generateRandomPosition,
    addObstacles,
    addAnimation,
    breakerActive,
    getNextLevelThreshold,
  ]);

  // Handle key press (support both arrow keys and WASD)
  const handleKeyPress = useCallback(
    (e) => {
      if (!gameStarted || gameOver) return;

      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "arrowdown":
        case "s":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "arrowleft":
        case "a":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "arrowright":
        case "d":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    },
    [direction, gameStarted, gameOver]
  );

  // Start game
  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 15, y: 15, size: 1 });
    setScore(0);
    setLevel(1);
    setItemsEaten(0);
    setGameOver(false);
    setGameStarted(true);
    setBreakerActive(false);
    setSpecialItems([]);
    setAnimations([]);
    initializeObstacles();
    startSpecialItemTimer();
  };

  // Drawing function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background
    ctx.fillStyle = "#ffe6f0";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw snake (makeup brush theme)
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Head - brush tip
        ctx.fillStyle = breakerActive ? "#ff4500" : "#ff69b4";
        ctx.fillRect(
          segment.x * GRID_SIZE,
          segment.y * GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE
        );
        ctx.fillStyle = "#fff";
        ctx.fillRect(
          segment.x * GRID_SIZE + 5,
          segment.y * GRID_SIZE + 5,
          4,
          4
        );
        ctx.fillRect(
          segment.x * GRID_SIZE + 11,
          segment.y * GRID_SIZE + 5,
          4,
          4
        );
      } else {
        // Body - brush handle
        ctx.fillStyle = "#ff1493";
        ctx.fillRect(
          segment.x * GRID_SIZE,
          segment.y * GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE
        );
      }
    });

    // Draw food using custom drawing function
    drawItem(ctx, food.x, food.y, 1, "food");

    // Draw obstacles using custom drawing function
    obstacles.forEach((obstacle) => {
      drawItem(ctx, obstacle.x, obstacle.y, 1, "obstacle");
    });

    // Draw special items using custom drawing function
    specialItems.forEach((item) => {
      drawItem(ctx, item.x, item.y, item.size, item.type);
    });

    // Draw animations
    animations.forEach((anim) => {
      ctx.fillStyle = anim.color;
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      const alpha = anim.frames / 60;
      ctx.globalAlpha = alpha;
      ctx.fillText(
        anim.text,
        anim.x + GRID_SIZE / 2,
        anim.y - 10 + (60 - anim.frames) * 0.5
      );
      ctx.globalAlpha = 1;
      ctx.textAlign = "left";
    });
  }, [
    snake,
    food,
    obstacles,
    specialItems,
    animations,
    breakerActive,
    drawItem,
  ]);

  // Game effects
  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(gameLoop, 150);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameLoop, gameStarted, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    return () => {
      if (specialItemTimerRef.current) {
        clearTimeout(specialItemTimerRef.current);
      }
    };
  }, []);

  const nextLevelThreshold = getNextLevelThreshold(level);
  const itemsToNextLevel = nextLevelThreshold - itemsEaten;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-4 text-pink-600">
          💄 Cosmetic Snake Game 💋
        </h1>

        <div className="flex justify-center gap-6 mb-4 text-sm">
          <div className="text-lg font-semibold text-purple-700">
            Score: <span className="text-pink-600">{score}</span>
          </div>
          <div className="text-lg font-semibold text-purple-700">
            Level: <span className="text-pink-600">{level}</span>
          </div>
          <div className="text-lg font-semibold text-purple-700">
            Items: <span className="text-pink-600">{itemsEaten}</span>
          </div>
          <div className="text-lg font-semibold text-purple-700">
            Next Level:{" "}
            <span className="text-pink-600">{itemsToNextLevel}</span>
          </div>
          <div className="text-lg font-semibold text-purple-700">
            Obstacles: <span className="text-pink-600">{obstacles.length}</span>
          </div>
        </div>

        {breakerActive && (
          <div className="text-center mb-2">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold animate-pulse">
              🔨 BREAKER ACTIVE! 🔨
            </span>
          </div>
        )}

        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border-4 border-pink-400 rounded-lg bg-pink-50"
          />
        </div>

        {!gameStarted ? (
          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition hover:scale-105"
            >
              💄 Start Beauty Journey 💄
            </button>
            <div className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto">
              <p className="mb-2">
                🎮 <strong>How to Play:</strong>
              </p>
              <p>• Use arrow keys or WASD to control your makeup brush</p>
              <p>• Collect lipsticks 💄 and special items to grow and score</p>
              <p>• Avoid makeup compacts 💼 - they're obstacles!</p>
              <p>
                • Special items (appear for 10s, max 10 at once): 🧴 Perfume
                (bonus), 🔨 Tool (break obstacles), 🎨 Palette (big score +
                growth)
              </p>
              <p>• Level progression: 5→10→15→20→25... items to next level</p>
              <p>• All items disappear when eaten and never overlap!</p>
            </div>
          </div>
        ) : gameOver ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-500 mb-4">
              💔 Game Over! 💔
            </h2>
            <p className="text-xl mb-2">
              Final Score:{" "}
              <span className="font-bold text-pink-600">{score}</span>
            </p>
            <p className="text-lg mb-2">
              Level Reached:{" "}
              <span className="font-bold text-purple-600">{level}</span>
            </p>
            <p className="text-lg mb-4">
              Items Collected:{" "}
              <span className="font-bold text-green-600">{itemsEaten}</span>
            </p>
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition hover:scale-105"
            >
              💄 Try Again 💄
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>Use arrow keys or WASD to move your makeup brush! 💅</p>
            <p className="text-sm mt-2">
              Special items: {specialItems.length}/10 | Disappear after 10
              seconds ⏰
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CosmeticSnakeGame;
