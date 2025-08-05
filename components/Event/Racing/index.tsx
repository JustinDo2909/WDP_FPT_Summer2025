"use client";
import { useCallback, useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface CarType {
  type: "sedan" | "suv" | "truck" | "sports" | "van";
  speed: number;
  width: number;
  height: number;
}

interface Obstacle extends CarType {
  id: number;
  x: number;
  y: number;
  actualSpeed: number;
}

interface PowerUp {
  id: number;
  x: number;
  y: number;
  type: "shield" | "slow" | "life";
  emoji: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  type: "collision" | "shield" | "powerup";
}

const RacingGame = () => {
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameOver">(
    "menu",
  );
  const [playerPos, setPlayerPos] = useState<Position>({ x: 50, y: 180 });
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(8);
  const [lives, setLives] = useState<number>(3);
  const [shield, setShield] = useState<number>(0);
  const [slowMotion, setSlowMotion] = useState<number>(0);
  const [keys, setKeys] = useState<{ up: boolean; down: boolean }>({
    up: false,
    down: false,
  });
  const [roadOffset, setRoadOffset] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(1);

  const GAME_WIDTH = 900;
  const GAME_HEIGHT = 500;
  const PLAYER_WIDTH = 80;
  const PLAYER_HEIGHT = 40;

  // Car types with specifications
  const carTypes: CarType[] = [
    { type: "sedan", speed: 1.2, width: 80, height: 40 },
    { type: "suv", speed: 1.0, width: 85, height: 45 },
    { type: "truck", speed: 0.7, width: 100, height: 50 },
    { type: "sports", speed: 1.8, width: 75, height: 35 },
    { type: "van", speed: 0.9, width: 90, height: 45 },
  ];

  const powerUpTypes: PowerUp[] = [
    { id: 0, x: 0, y: 0, type: "shield", emoji: "🛡️" },
    { id: 0, x: 0, y: 0, type: "slow", emoji: "⏰" },
    { id: 0, x: 0, y: 0, type: "life", emoji: "❤️" },
  ];

  // Handle key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setKeys((prev) => ({ ...prev, up: true }));
      if (e.key === "ArrowDown") setKeys((prev) => ({ ...prev, down: true }));
      if (e.key === " " && gameState === "gameOver") restartGame();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setKeys((prev) => ({ ...prev, up: false }));
      if (e.key === "ArrowDown") setKeys((prev) => ({ ...prev, down: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Move player
  useEffect(() => {
    if (gameState !== "playing") return;

    const movePlayer = () => {
      setPlayerPos((prev) => {
        let newY = prev.y;
        const moveSpeed = slowMotion > 0 ? 5 : 10;
        if (keys.up && newY > 10) newY -= moveSpeed;
        if (keys.down && newY < GAME_HEIGHT - PLAYER_HEIGHT - 10)
          newY += moveSpeed;
        return { ...prev, y: newY };
      });
    };

    const interval = setInterval(movePlayer, 16);
    return () => clearInterval(interval);
  }, [keys, gameState, slowMotion]);

  // Create obstacle
  const createObstacle = useCallback(() => {
    const lanes = [50, 120, 190, 260, 330, 400];
    const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    const carType = carTypes[Math.floor(Math.random() * carTypes.length)];

    return {
      id: Date.now() + Math.random(),
      x: GAME_WIDTH + 50,
      y: randomLane,
      ...carType,
      actualSpeed: carType.speed,
    };
  }, []);

  // Create power-up
  const createPowerUp = useCallback(() => {
    const lanes = [50, 120, 190, 260, 330, 400];
    const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    const powerUpType =
      powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];

    return {
      id: Date.now() + Math.random(),
      x: GAME_WIDTH + 50,
      y: randomLane,
      type: powerUpType.type,
      emoji: powerUpType.emoji,
    };
  }, []);

  // Create particle effect
  const createParticles = (
    x: number,
    y: number,
    type: "collision" | "shield" | "powerup" = "collision",
  ) => {
    const newParticles: Particle[] = [];
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + Math.random(),
        x: x + Math.random() * 40,
        y: y + Math.random() * 40,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15,
        life: 30,
        type,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Main game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = setInterval(() => {
      const currentSpeed = slowMotion > 0 ? speed * 0.4 : speed;
      const spawnRate = Math.min(0.08 + difficulty * 0.02, 0.15);

      // Move road
      setRoadOffset((prev) => (prev + currentSpeed * 3) % 40);

      // Move obstacles
      setObstacles((prev) => {
        const updated = prev
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - currentSpeed * obstacle.actualSpeed * 1.5,
          }))
          .filter((obstacle) => obstacle.x > -120);

        // Create new obstacle
        if (Math.random() < spawnRate) {
          updated.push(createObstacle());

          if (Math.random() < 0.4 && difficulty > 1) {
            setTimeout(() => {
              updated.push(createObstacle());
            }, 100);
          }
        }

        return updated;
      });

      // Move power-ups
      setPowerUps((prev) => {
        const updated = prev
          .map((powerUp) => ({
            ...powerUp,
            x: powerUp.x - currentSpeed * 1.2,
          }))
          .filter((powerUp) => powerUp.x > -50);

        if (Math.random() < 0.008) {
          updated.push(createPowerUp());
        }

        return updated;
      });

      // Update particles
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx * 0.8,
            y: particle.y + particle.vy * 0.8,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0),
      );

      // Increase score
      setScore((prev) => prev + Math.floor(currentSpeed * 1.5));

      // Increase difficulty
      if (score > 0 && score % 400 === 0) {
        setSpeed((prev) => Math.min(prev + 0.5, 15));
        setDifficulty((prev) => prev + 1);
      }

      // Reduce power-up effects
      if (shield > 0) setShield((prev) => prev - 1);
      if (slowMotion > 0) setSlowMotion((prev) => prev - 1);
    }, 20);

    return () => clearInterval(gameLoop);
  }, [
    gameState,
    speed,
    score,
    createObstacle,
    createPowerUp,
    difficulty,
    shield,
    slowMotion,
  ]);

  // Check collisions
  useEffect(() => {
    if (gameState !== "playing") return;

    const checkCollisions = () => {
      // Collision with obstacles
      for (const obstacle of obstacles) {
        if (
          playerPos.x < obstacle.x + obstacle.width - 15 &&
          playerPos.x + PLAYER_WIDTH > obstacle.x + 15 &&
          playerPos.y < obstacle.y + obstacle.height - 8 &&
          playerPos.y + PLAYER_HEIGHT > obstacle.y + 8
        ) {
          if (shield > 0) {
            setShield(0);
            createParticles(obstacle.x, obstacle.y, "shield");
            setObstacles((prev) =>
              prev.filter((obs) => obs.id !== obstacle.id),
            );
          } else {
            createParticles(playerPos.x, playerPos.y, "collision");
            setLives((prev) => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameState("gameOver");
              }
              return newLives;
            });
            setShield(90);
          }
          break;
        }
      }

      // Collision with power-ups
      for (const powerUp of powerUps) {
        if (
          playerPos.x < powerUp.x + 35 &&
          playerPos.x + PLAYER_WIDTH > powerUp.x + 5 &&
          playerPos.y < powerUp.y + 35 &&
          playerPos.y + PLAYER_HEIGHT > powerUp.y + 5
        ) {
          setPowerUps((prev) => prev.filter((pu) => pu.id !== powerUp.id));
          createParticles(powerUp.x, powerUp.y, "powerup");

          switch (powerUp.type) {
            case "shield":
              setShield(250);
              break;
            case "slow":
              setSlowMotion(180);
              break;
            case "life":
              setLives((prev) => Math.min(prev + 1, 5));
              break;
          }
          break;
        }
      }
    };

    checkCollisions();
  }, [playerPos, obstacles, powerUps, gameState, shield]);

  const startGame = () => {
    setGameState("playing");
    setPlayerPos({ x: 50, y: 180 });
    setObstacles([]);
    setPowerUps([]);
    setParticles([]);
    setScore(0);
    setSpeed(8);
    setLives(3);
    setShield(0);
    setSlowMotion(0);
    setDifficulty(1);
  };

  const restartGame = () => {
    startGame();
  };

  const playerRotation = keys.up ? -8 : keys.down ? 8 : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white p-4">
      <h1 className="text-6xl font-bold mb-6 text-yellow-300 drop-shadow-lg">
        🏁 Highway Thunder
      </h1>

      {gameState === "menu" && (
        <div className="text-center bg-black bg-opacity-60 p-10 rounded-2xl border border-yellow-400">
          <div className="mb-8 space-y-4">
            <p className="text-2xl mb-4 text-yellow-300">
              ⚡ Ultra Fast Racing Experience!
            </p>
            <p className="text-xl mb-2">🎮 Controls: Arrow keys ↑ ↓</p>
            <p className="text-lg mb-2">
              🚗 5 different car types with unique speeds
            </p>
            <p className="text-lg mb-2">
              🛡️ Power-ups: Shield, Slow Motion, Extra Life
            </p>
            <p className="text-lg mb-4 text-red-300">
              🔥 High-speed challenge - Test your reflexes!
            </p>
          </div>
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 hover:from-red-600 hover:via-yellow-600 hover:to-red-600 px-12 py-6 rounded-2xl text-3xl font-bold transition-all transform hover:scale-110 shadow-2xl"
          >
            🚀 START RACING!
          </button>
        </div>
      )}

      {gameState === "playing" && (
        <div className="relative">
          {/* HUD */}
          <div className="mb-4 flex justify-between items-center w-full bg-black bg-opacity-80 p-4 rounded-xl border border-yellow-400">
            <div className="flex items-center space-x-8">
              <span className="text-3xl font-bold text-yellow-300">
                💯 {score}
              </span>
              <span className="text-2xl text-red-400">
                ⚡ {speed.toFixed(1)}
              </span>
              <div className="flex items-center">
                <span className="text-xl mr-2">❤️</span>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < lives ? "text-red-500" : "text-gray-700"}`}
                  >
                    ●
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {shield > 0 && (
                <div className="flex items-center text-blue-400">
                  <span className="text-xl">🛡️</span>
                  <span className="text-sm ml-1">{Math.ceil(shield / 60)}</span>
                </div>
              )}
              {slowMotion > 0 && (
                <div className="flex items-center text-green-400">
                  <span className="text-xl">⏰</span>
                  <span className="text-sm ml-1">
                    {Math.ceil(slowMotion / 60)}
                  </span>
                </div>
              )}
              <span className="text-lg text-yellow-400 font-bold">
                Level {difficulty}
              </span>
            </div>
          </div>

          <div
            className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-4 border-yellow-400 overflow-hidden shadow-2xl"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          >
            {/* Animated road markings */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-2 bg-yellow-300 opacity-70"
                style={{
                  top: 120 + i * 130, // dời theo chiều dọc
                  left: 0,
                  backgroundImage:
                    "repeating-linear-gradient(to right, transparent 0px, transparent 10px, yellow 10px, yellow 20px)",
                  transform: `rotate(0deg) translateX(-${(roadOffset * 3) % 40}px)`,
                }}
              />
            ))}

            {/* Lane separators */}
            {/* {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full w-px bg-white opacity-30"
                style={{ left: 85 + i * 70 }}
              />
            ))} */}

            {/* Player car */}
            <div
              className="absolute transition-all duration-75 text-4xl"
              style={{
                left: playerPos.x,
                top: playerPos.y,
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                transform: `scaleX(-1) rotate(${playerRotation}deg)`,
                filter:
                  shield > 0
                    ? "drop-shadow(0 0 10px #3b82f6) drop-shadow(0 0 20px #3b82f6)"
                    : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            >
              🏎️
            </div>

            {/* Obstacles */}
            {obstacles.map((obstacle) => (
              <div
                key={obstacle.id}
                className="absolute text-3xl"
                style={{
                  left: obstacle.x,
                  top: obstacle.y,
                  width: obstacle.width,
                  height: obstacle.height,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  transform: `rotate(${Math.sin(obstacle.x * 0.01) * 3}deg)`,
                }}
              >
                {obstacle.type === "sedan" && "🚗"}
                {obstacle.type === "suv" && "🚙"}
                {obstacle.type === "truck" && "🚚"}
                {obstacle.type === "sports" && "🏎️"}
                {obstacle.type === "van" && "🚐"}
              </div>
            ))}

            {/* Power-ups */}
            {powerUps.map((powerUp) => (
              <div
                key={powerUp.id}
                className="absolute text-2xl"
                style={{
                  left: powerUp.x,
                  top: powerUp.y,
                  width: 40,
                  height: 40,
                  transform: `rotate(${(Date.now() * 0.005) % 360}deg) scale(${1 + Math.sin(Date.now() * 0.005) * 0.2})`,
                  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                }}
              >
                {powerUp.emoji}
              </div>
            ))}

            {/* Particles */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={`absolute rounded-full ${
                  particle.type === "collision"
                    ? "bg-red-500"
                    : particle.type === "shield"
                      ? "bg-blue-400"
                      : "bg-yellow-400"
                }`}
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: "4px",
                  height: "4px",
                  opacity: particle.life / 30,
                }}
              />
            ))}

            {/* Speed lines effect */}
            {speed > 10 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-px bg-white opacity-20"
                    style={{
                      left: Math.random() * GAME_WIDTH,
                      top: Math.random() * GAME_HEIGHT,
                      width: Math.random() * 50 + 20,
                      transform: `translateX(-${(speed - 10) * 5}px)`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 text-center text-lg text-gray-200 bg-black bg-opacity-60 p-3 rounded-xl">
            🎮 Use ↑ ↓ keys to control • ⚡ Speed: {speed.toFixed(1)} • 🏁 Watch
            out at high speeds!
          </div>
        </div>
      )}

      {gameState === "gameOver" && (
        <div className="text-center bg-black bg-opacity-90 p-12 rounded-2xl border border-red-500">
          <h2 className="text-5xl font-bold mb-8 text-red-400">
            💥 GAME OVER!
          </h2>
          <div className="mb-10 space-y-3">
            <p className="text-3xl mb-3">
              Score:{" "}
              <span className="font-bold text-yellow-400">
                {score.toLocaleString()}
              </span>
            </p>
            <p className="text-2xl mb-3">
              Max Speed:{" "}
              <span className="text-green-400">{speed.toFixed(1)}</span>
            </p>
            <p className="text-xl text-purple-400">
              Level Reached: {difficulty}
            </p>
            <p className="text-lg text-gray-300">
              {score > 5000
                ? "🏆 Outstanding!"
                : score > 2000
                  ? "👏 Well Done!"
                  : "💪 Keep Trying!"}
            </p>
          </div>
          <div className="space-x-6">
            <button
              onClick={restartGame}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-10 py-5 rounded-xl text-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              🔄 Play Again
            </button>
            <button
              onClick={() => setGameState("menu")}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 px-10 py-5 rounded-xl text-2xl font-bold transition-all transform hover:scale-105 shadow-lg"
            >
              🏠 Main Menu
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-300">
            Or press Space to restart quickly
          </div>
        </div>
      )}
    </div>
  );
};

export default RacingGame;
