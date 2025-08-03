"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { ArrowUp, Heart, Star, TestTubeDiagonal } from "lucide-react";
import { Area, Box, Group, Row, RText, Section, Yard } from "@/lib/by/Div";
import Button from "@/components/CustomButton";

// Game types
interface Enemy {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  health: number;
  maxHealth: number;
  type:
    | "basic"
    | "strong"
    | "fast"
    | "hard3"
    | "hard5"
    | "hard7"
    | "hard10"
    | "invulnerable";
  color: string;
  size: number;
  points: number;
  isInvulnerable?: boolean; // For invulnerable enemy type
  invulnerableTimer?: number; // For invulnerable enemy type
}

interface Bullet {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  damage: number; // Bullet now has damage property
}

interface AmmoBox {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
}

// New interface for UpgradeBox
interface UpgradeBox {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  color: string;
}

interface PowerUp {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  type: "infiniteAmmo" | "multiShot3" | "multiShot5";
  color: string;
}

interface ActivePowerUp {
  type: "infiniteAmmo" | "multiShot3" | "multiShot5";
  endTime: number;
  value?: number; // For multiShot, e.g., 3 or 5 bullets
}

interface GameState {
  health: number;
  maxHealth: number;
  score: number;
  ammo: number;
  enemies: Enemy[];
  bullets: Bullet[];
  ammoBoxes: AmmoBox[];
  upgradeBoxes: UpgradeBox[]; // New state for upgrade boxes
  powerUps: PowerUp[];
  gameOver: boolean;
  paused: boolean;
  activePowerUps: ActivePowerUp[];
  bulletLevel: number;
  upgradeBoxesCollected: number;
  bulletDamage: number;
}

// Game Constants
const DEFAULT_AMMO = 50;
const AMMO_REFILL_AMOUNT = 100; // Updated
const SHOOT_COOLDOWN = 0.1; // 10 shots per second
const POWER_UP_DURATION = 10000; // 10 seconds (Updated)
const DIFFICULTY_SCORE_THRESHOLD = 750; // Difficulty increases every 750 points
const MAX_ENEMIES_ON_SCREEN = 50; // New limit
const MAX_POWERUPS_ON_SCREEN = 5; // New limit
const MAX_UPGRADE_BOXES_ON_SCREEN = 3; // New limit for upgrade boxes

// Enemy types configuration - increased sizes and speed
const ENEMY_TYPES = {
  basic: {
    health: 1,
    color: "#ff4444",
    size: 0.8,
    speed: 0.025,
    points: 10,
    type: "basic",
  },
  strong: {
    health: 3,
    color: "#ff8844",
    size: 1.0,
    speed: 0.02,
    points: 30,
    type: "strong",
  },
  fast: {
    health: 1,
    color: "#44ff44",
    size: 0.7,
    speed: 0.04,
    points: 20,
    type: "fast",
  },
  hard3: {
    health: 3,
    color: "#888888",
    size: 0.6,
    speed: 0.03,
    points: 15,
    type: "hard3",
  },
  hard5: {
    health: 5,
    color: "#8844ff",
    size: 1.1,
    speed: 0.01,
    points: 50,
    type: "hard5",
  },
  hard7: {
    health: 7,
    color: "#44ff88",
    size: 1.2,
    speed: 0.008,
    points: 70,
    type: "hard7",
  },
  hard10: {
    health: 10,
    color: "#ff0088",
    size: 1.3,
    speed: 0.007,
    points: 100,
    type: "hard10",
  },
  invulnerable: {
    health: 1,
    color: "#ffff00",
    size: 0.7,
    speed: 0.03,
    points: 40,
    isInvulnerable: false, // Initial state
    invulnerableTimer: 0,
    type: "invulnerable",
  },
} as const;

// Power-up types configuration (removed upgradeBox)
const POWER_UP_CONFIG = {
  infiniteAmmo: { color: "#00ffff", type: "infiniteAmmo" },
  multiShot3: { color: "#ff00ff", type: "multiShot3", value: 3 }, // Shoots 3 bullets
  multiShot5: { color: "#ff00ff", type: "multiShot5", value: 5 }, // Shoots 5 bullets
} as const;

// New config for UpgradeBox
const UPGRADE_BOX_CONFIG = { color: "#ffa500" }; // Orange for upgrade boxes

// Bullet Upgrade Levels
const UPGRADE_LEVELS = [
  { level: 1, boxesNeeded: 0, bullets: 1, damage: 1, ammoCost: 1 }, // Default
  { level: 2, boxesNeeded: 3, bullets: 2, damage: 1, ammoCost: 2 }, // x2 bullets, 2 ammo cost
  { level: 3, boxesNeeded: 5, bullets: 3, damage: 1, ammoCost: 3 }, // x3 bullets, 3 ammo cost
  { level: 4, boxesNeeded: 7, bullets: 4, damage: 1, ammoCost: 4 }, // x4 bullets, 4 ammo cost
  { level: 5, boxesNeeded: 10, bullets: 5, damage: 1, ammoCost: 5 }, // x5 bullets, 5 ammo cost
  { level: 6, boxesNeeded: 10, bullets: 5, damage: 2, ammoCost: 5 }, // +1 damage
  { level: 7, boxesNeeded: 10, bullets: 5, damage: 3, ammoCost: 5 },
  { level: 8, boxesNeeded: 10, bullets: 5, damage: 4, ammoCost: 5 },
  { level: 9, boxesNeeded: 10, bullets: 5, damage: 5, ammoCost: 5 },
  { level: 10, boxesNeeded: 10, bullets: 5, damage: 6, ammoCost: 5 },
  { level: 11, boxesNeeded: 10, bullets: 5, damage: 7, ammoCost: 5 },
  { level: 12, boxesNeeded: 10, bullets: 5, damage: 8, ammoCost: 5 },
  { level: 13, boxesNeeded: 10, bullets: 5, damage: 9, ammoCost: 5 },
  { level: 14, boxesNeeded: 10, bullets: 5, damage: 10, ammoCost: 5 },
  { level: 15, boxesNeeded: 10, bullets: 5, damage: 11, ammoCost: 5 },
  { level: 16, boxesNeeded: 10, bullets: 5, damage: 12, ammoCost: 5 },
  { level: 17, boxesNeeded: 10, bullets: 5, damage: 13, ammoCost: 5 },
  { level: 18, boxesNeeded: 10, bullets: 5, damage: 14, ammoCost: 5 },
  { level: 19, boxesNeeded: 10, bullets: 5, damage: 15, ammoCost: 5 },
  { level: 20, boxesNeeded: 10, bullets: 5, damage: 16, ammoCost: 5 }, // Max level
];

export default function Component() {
  const [gameState, setGameState] = useState<GameState>({
    health: 10,
    maxHealth: 10,
    score: 0,
    ammo: DEFAULT_AMMO,
    enemies: [],
    bullets: [],
    ammoBoxes: [],
    upgradeBoxes: [], // Initialize new state
    powerUps: [],
    gameOver: false,
    paused: false,
    activePowerUps: [],
    bulletLevel: 1,
    upgradeBoxesCollected: 0,
    bulletDamage: UPGRADE_LEVELS[0].damage,
  });

  const [playerHitEffect, setPlayerHitEffect] = useState(false);
  const [ammoGainEffect, setAmmoGainEffect] = useState(false);
  const [screenFlashEffect, setScreenFlashEffect] = useState(false); // For player hit
  const [showInstructions, setShowInstructions] = useState(false); // State for instructions panel visibility

  const resetGame = () => {
    setGameState({
      health: 10,
      maxHealth: 10,
      score: 0,
      ammo: DEFAULT_AMMO,
      enemies: [],
      bullets: [],
      ammoBoxes: [],
      upgradeBoxes: [], // Reset new state
      powerUps: [],
      gameOver: false,
      paused: false,
      activePowerUps: [],
      bulletLevel: 1,
      upgradeBoxesCollected: 0,
      bulletDamage: UPGRADE_LEVELS[0].damage,
    });
    setPlayerHitEffect(false);
    setAmmoGainEffect(false);
    setScreenFlashEffect(false);
  };

  const togglePause = () => {
    setGameState((prev) => ({ ...prev, paused: !prev.paused }));
  };

  const toggleInstructions = () => {
    setShowInstructions((prev) => !prev);
  };

  if (gameState.gameOver) {
    return (
      <Area className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
        <Section className="text-center space-y-6 bg-black/50 p-8 rounded-lg backdrop-blur-sm">
          <RText className="text-6xl font-bold text-red-500 mb-4">
            GAME OVER
          </RText>
          <RText className="text-3xl text-yellow-400">
            Final Score: {gameState.score}
          </RText>
          <Button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-xl px-8 py-3"
            label="Play Again"
          />
        </Section>
      </Area>
    );
  }

  const currentBulletConfig = UPGRADE_LEVELS[gameState.bulletLevel - 1];
  const nextUpgradeLevel = UPGRADE_LEVELS[gameState.bulletLevel];
  const progressToNextLevel = nextUpgradeLevel
    ? `${gameState.upgradeBoxesCollected}/${nextUpgradeLevel.boxesNeeded}`
    : "MAX";
  const healthPercentage = (gameState.health / gameState.maxHealth) * 100;
  const upgradeProgressPercentage = nextUpgradeLevel
    ? (gameState.upgradeBoxesCollected / nextUpgradeLevel.boxesNeeded) * 100
    : 100;

  const getHealthBarColor = (percentage: number) => {
    if (percentage > 60) return "bg-green-500";
    if (percentage > 30) return "bg-orange-500";
    return "bg-red-500";
  };

  const isAmmoLow = gameState.ammo < currentBulletConfig.ammoCost;
  const ammoTextColorClass = isAmmoLow ? "text-red-500" : "text-cyan-300";

  return (
    <Area
      className={`w-full h-screen relative bg-gradient-to-b from-purple-900 via-blue-900 to-black overflow-hidden ${
        gameState.paused ? "cursor-default" : "cursor-none"
      }`}
    >
      {/* Screen Flash Effect */}
      {screenFlashEffect && (
        <Box className="absolute inset-0 bg-red-500 opacity-50 animate-flash z-50 pointer-events-none" />
      )}

      {/* Game UI Overlay - Top Horizontal Bar */}
      <Yard className="absolute top-0 left-0 z-10 p-4 flex flex-col gap-4 w-64">
        {/* Pause/Resume Button */}
        <Button
          onClick={togglePause}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base font-semibold py-1 px-2 rounded-lg shadow-md transition-all duration-200 ease-in-out"
          label={gameState.paused ? "Resume" : "Pause"}
        />
        {/* Health Bar */}
        <Section className="flex items-center space-x-3">
          <Row className="flex items-center space-x-1">
            <Heart className="w-5 h-5 text-green-500 animate-pulse" />
            <RText className="text-sm text-green-500 font-bold">HP</RText>
          </Row>
          <Group className="flex-1">
            <Box className="relative box-border w-full h-5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <RText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-300  font-semibold">
                {gameState.health}
              </RText>
              <Box
                className={`${getHealthBarColor(healthPercentage)} h-full transition-width duration-300 ease-out`}
                style={{ width: `${healthPercentage}%` }}
              ></Box>
            </Box>
          </Group>
        </Section>
        {/* Bullet Level & Upgrade */}
        <Section className="flex items-center space-x-3">
          <Row className="flex items-center space-x-1">
            <ArrowUp className="w-5 h-5 text-orange-400" />
            <RText className="text-base font-bold text-orange-300">
              Lvl {gameState.bulletLevel}
            </RText>
          </Row>
          {nextUpgradeLevel && (
            <Group className="flex-1">
              <Box className="relative box-border w-full h-5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                <RText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-300 font-semibold">
                  {progressToNextLevel}
                </RText>
                <Box
                  className="bg-purple-500 h-full transition-width duration-300 ease-out"
                  style={{ width: `${upgradeProgressPercentage}%` }}
                />
              </Box>
            </Group>
          )}
        </Section>
        {/* Ammo */}
        <Section className="flex items-center space-x-3">
          <Row className="flex items-center space-x-1">
            <TestTubeDiagonal className="w-5 h-5 text-blue-400" />
            <RText className={`text-base font-bold ${ammoTextColorClass}`}>
              Bullet: {gameState.ammo}
            </RText>
          </Row>
          <RText className="text-base text-gray-400 font-medium">
            ({currentBulletConfig.ammoCost}/shot)
          </RText>
        </Section>
        {/* Score */}
        <Section className="flex items-center space-x-3">
          <Row className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400" />
            <RText className="text-base font-bold text-yellow-300 drop-shadow-sm">
              Score: {gameState.score}
            </RText>
          </Row>
        </Section>
      </Yard>
      {/* Instructions Toggle button */}
      <Button
        onClick={toggleInstructions}
        className="absolute top-4 right-4 z-10 bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded-md shadow-md"
        label={showInstructions ? "Hide Info" : "Show Info"}
      />
      {/* Instructions Panel */}
      {showInstructions && (
        <Section className="absolute top-16 right-4 z-10 text-white text-sm max-w-xs p-4 bg-black/60 rounded-lg backdrop-blur-sm border border-gray-700 shadow-lg">
          <RText className="font-bold text-lg mb-2 text-gray-200">
            Controls:
          </RText>
          <RText>• Click/Hold to shoot at cursor</RText>
          <RText>• Destroy enemies before they reach center</RText>
          <RText>• Shoot blue boxes for ammo (+{AMMO_REFILL_AMOUNT})</RText>
          <RText className="mt-2 font-semibold text-gray-200">Power-ups:</RText>
          <RText>
            • <span className="text-cyan-300">Cyan Box</span>: Infinite Ammo
            (10s)
          </RText>
          <RText>
            • <span className="text-fuchsia-300">Magenta Box</span>: Multi-Shot
            (x3 or x5 current bullets, 10s)
          </RText>
          <RText className="mt-2 font-semibold text-gray-200">
            Special Items:
          </RText>
          <RText>
            • <span className="text-orange-300">Orange Box</span>: Upgrade
            Bullet Level
          </RText>
          <RText className="mt-2 font-semibold text-gray-200">
            Enemy Types:
          </RText>
          <RText>
            • <span className="text-red-300">Red</span>: 1 hit (10 pts)
          </RText>
          <RText>
            • <span className="text-orange-300">Orange</span>: 3 hits (30 pts)
          </RText>
          <RText>
            • <span className="text-green-300">Green</span>: 1 hit, fast (20
            pts)
          </RText>
          <RText>
            • <span className="text-gray-400">Gray</span>: 3 hits (15 pts),
            fragments
          </RText>
          <RText>
            • <span className="text-purple-300">Purple</span>: 5 hits, slow (50
            pts)
          </RText>
          <RText>
            • <span className="text-teal-300">Teal</span>: 7 hits, very slow (70
            pts), spawns 2 Gray
          </RText>
          <RText>
            • <span className="text-pink-300">Pink</span>: 10 hits, very slow
            (100 pts), spawns 3 Gray
          </RText>
          <RText>
            • <span className="text-yellow-300">Yellow</span>: 1 hit,
            invulnerable 1s every 1s (40 pts)
          </RText>
        </Section>
      )}
      {/* Ammo Gain Effect Text */}
      {ammoGainEffect && (
        <Box className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-green-400 text-4xl font-bold animate-fade-up-and-out z-20">
          +{AMMO_REFILL_AMOUNT} AMMO!
        </Box>
      )}
      {gameState.paused && (
        <Yard className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <Section className="text-center">
            <RText className="text-white text-6xl font-bold animate-pulse mb-8">
              PAUSED
            </RText>
            <Button
              onClick={togglePause}
              className="bg-blue-600 hover:bg-blue-700 text-xl px-8 py-3 rounded-lg shadow-md transition-all duration-200 ease-in-out"
              label="Continue"
            />
          </Section>
        </Yard>
      )}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        shadows
      >
        <color attach="background" args={["#000022"]} />
        <fog attach="fog" args={["#000022", 15, 35]} />

        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, 5]} intensity={0.8} color="#4444ff" />
        <pointLight position={[10, -10, 5]} intensity={0.6} color="#ff4444" />

        <Game
          gameState={gameState}
          setGameState={setGameState}
          setPlayerHitEffect={setPlayerHitEffect}
          setAmmoGainEffect={setAmmoGainEffect}
          setScreenFlashEffect={setScreenFlashEffect}
          playerHitEffect={playerHitEffect}
        />
      </Canvas>
    </Area>
  );
}

function Game({
  gameState,
  setGameState,
  setPlayerHitEffect,
  setAmmoGainEffect,
  setScreenFlashEffect,
  playerHitEffect,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setPlayerHitEffect: React.Dispatch<React.SetStateAction<boolean>>;
  setAmmoGainEffect: React.Dispatch<React.SetStateAction<boolean>>;
  setScreenFlashEffect: React.Dispatch<React.SetStateAction<boolean>>;
  playerHitEffect: boolean;
}) {
  const { camera, gl } = useThree();
  const enemySpawnTimer = useRef(0);
  const ammoBoxSpawnTimer = useRef(0);
  const powerUpSpawnTimer = useRef(0);
  const upgradeBoxSpawnTimer = useRef(0); // New timer for upgrade boxes
  const shootTimer = useRef(0);
  const mousePosition = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const isMouseDown = useRef(false);
  const playerMeshRef = useRef<THREE.Mesh>(null);
  const crosshairRef = useRef<THREE.Group>(null);

  // Calculate world boundaries based on camera frustum
  const WORLD_HEIGHT = React.useMemo(() => {
    const perspectiveCam = camera as THREE.PerspectiveCamera;
    return (
      2 *
      Math.tan(THREE.MathUtils.degToRad(perspectiveCam.fov / 2)) *
      Math.abs(perspectiveCam.position.z)
    );
  }, [camera]);
  const WORLD_WIDTH = React.useMemo(() => {
    const perspectiveCam = camera as THREE.PerspectiveCamera;
    return WORLD_HEIGHT * perspectiveCam.aspect;
  }, [WORLD_HEIGHT, camera]);

  // Handle shooting with accurate mouse targeting and ammo check
  const handleShoot = useCallback(() => {
    setGameState((prev) => {
      const isInfiniteAmmo = prev.activePowerUps.some(
        (p) => p.type === "infiniteAmmo"
      );
      const currentBulletConfig = UPGRADE_LEVELS[prev.bulletLevel - 1];

      if (
        prev.paused ||
        prev.gameOver ||
        (!isInfiniteAmmo && prev.ammo < currentBulletConfig.ammoCost)
      )
        return prev;

      // Use current mouse position from ref
      raycaster.current.setFromCamera(mousePosition.current, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.current.ray.intersectPlane(plane.current, intersectPoint);

      const direction = intersectPoint.clone().normalize();

      const newBullets: Bullet[] = [];
      const activeMultiShot = prev.activePowerUps
        .filter((p) => p.type.startsWith("multiShot") && p.endTime > Date.now())
        .sort((a, b) => (b.value || 0) - (a.value || 0))[0]; // Get the highest value active multi-shot

      // Calculate numBullets: current bullets * multi-shot multiplier if active
      const numBullets = activeMultiShot
        ? currentBulletConfig.bullets * (activeMultiShot.value as number)
        : currentBulletConfig.bullets;

      // Calculate spreadFactor: wider for multi-shot, otherwise default based on numBullets
      const spreadFactor = activeMultiShot ? 1.5 : numBullets > 1 ? 0.4 : 0; // Increased spread for multi-shot

      for (let i = 0; i < numBullets; i++) {
        const spreadAngle = (Math.random() - 0.5) * spreadFactor; // Random spread
        const spreadDirection = direction
          .clone()
          .applyAxisAngle(new THREE.Vector3(0, 0, 1), spreadAngle) // Rotate around Z-axis
          .normalize();

        newBullets.push({
          id: Math.random().toString(36),
          position: new THREE.Vector3(0, 0, 0),
          velocity: spreadDirection.multiplyScalar(0.5),
          damage: currentBulletConfig.damage, // Assign bullet damage
        });
      }

      return {
        ...prev,
        bullets: [...prev.bullets, ...newBullets],
        ammo: isInfiniteAmmo
          ? prev.ammo
          : prev.ammo - currentBulletConfig.ammoCost, // Deduct ammo based on config
      };
    });
  }, [camera, setGameState]);

  // Mouse move listener for continuous shooting direction and crosshair
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mousePosition.current.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mousePosition.current.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update crosshair position
      raycaster.current.setFromCamera(mousePosition.current, camera);
      const intersectPoint = new THREE.Vector3();
      raycaster.current.ray.intersectPlane(plane.current, intersectPoint);
      if (crosshairRef.current) {
        crosshairRef.current.position.copy(intersectPoint);
      }
    };

    const handleMouseDown = () => {
      // Check ammo before setting isMouseDown to true for initial click
      if (gameState.paused || gameState.gameOver) return;
      const isInfiniteAmmo = gameState.activePowerUps.some(
        (p) => p.type === "infiniteAmmo"
      );
      const currentBulletConfig = UPGRADE_LEVELS[gameState.bulletLevel - 1];
      if (!isInfiniteAmmo && gameState.ammo < currentBulletConfig.ammoCost)
        return; // Prevent initial click if not enough ammo

      isMouseDown.current = true;
      handleShoot();
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
      shootTimer.current = 0; // Reset timer on mouse up
    };

    const canvas = gl.domElement;
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [
    gameState.paused,
    gameState.gameOver,
    gameState.ammo,
    camera,
    gl.domElement,
    gameState.activePowerUps,
    gameState.bulletLevel,
    handleShoot,
  ]); // Added bulletLevel to dependencies

  // Spawn objects (enemies, ammo, power-ups, upgrade-boxes) from outside screen with random inward direction
  const spawnObject = useCallback(
    (
      type: "enemy" | "ammoBox" | "powerUp" | "upgradeBox", // Added upgradeBox type
      specificConfig?:
        | (typeof ENEMY_TYPES)[keyof typeof ENEMY_TYPES]
        | (typeof POWER_UP_CONFIG)[keyof typeof POWER_UP_CONFIG]
        | typeof UPGRADE_BOX_CONFIG // Added upgradeBox config type
    ) => {
      const spawnPadding = 2; // How far outside the screen to spawn
      let startPos: THREE.Vector3;
      let velocity: THREE.Vector3;

      // Randomly choose a side to spawn from
      const side = Math.floor(Math.random() * 4); // 0: top, 1: bottom, 2: left, 3: right

      if (side === 0) {
        // Top
        startPos = new THREE.Vector3(
          (Math.random() - 0.5) * WORLD_WIDTH,
          WORLD_HEIGHT / 2 + spawnPadding,
          0
        );
        velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.5, // Random X component
          -1, // Always move downwards initially
          0
        ).normalize();
      } else if (side === 1) {
        // Bottom
        startPos = new THREE.Vector3(
          (Math.random() - 0.5) * WORLD_WIDTH,
          -(WORLD_HEIGHT / 2 + spawnPadding),
          0
        );
        velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.5, // Random X component
          1, // Always move upwards initially
          0
        ).normalize();
      } else if (side === 2) {
        // Left
        startPos = new THREE.Vector3(
          -(WORLD_WIDTH / 2 + spawnPadding),
          (Math.random() - 0.5) * WORLD_HEIGHT,
          0
        );
        velocity = new THREE.Vector3(
          1, // Always move rightwards initially
          (Math.random() - 0.5) * 0.5, // Random Y component
          0
        ).normalize();
      } else {
        // Right
        startPos = new THREE.Vector3(
          WORLD_WIDTH / 2 + spawnPadding,
          (Math.random() - 0.5) * WORLD_HEIGHT,
          0
        );
        velocity = new THREE.Vector3(
          -1, // Always move leftwards initially
          (Math.random() - 0.5) * 0.5, // Random Y component
          0
        ).normalize();
      }

      if (type === "enemy") {
        const enemyConfig =
          specificConfig as (typeof ENEMY_TYPES)[keyof typeof ENEMY_TYPES];
        const difficultyMultiplier = Math.pow(
          1.2,
          Math.floor(gameState.score / DIFFICULTY_SCORE_THRESHOLD)
        ); // Health x1.2 every threshold
        const speedMultiplier =
          1 + Math.floor(gameState.score / DIFFICULTY_SCORE_THRESHOLD) * 0.025; // Speed slightly faster

        const newEnemy: Enemy = {
          id: Math.random().toString(36),
          position: startPos,
          velocity: velocity.multiplyScalar(
            enemyConfig.speed * speedMultiplier
          ),
          health: enemyConfig.health * difficultyMultiplier,
          maxHealth: enemyConfig.health * difficultyMultiplier,
          type: enemyConfig.type,
          color: enemyConfig.color,
          size: enemyConfig.size,
          points: enemyConfig.points,
          isInvulnerable:
            enemyConfig.type === "invulnerable" ? false : undefined,
          invulnerableTimer:
            enemyConfig.type === "invulnerable" ? 0 : undefined,
        };
        setGameState((prev) => ({
          ...prev,
          enemies: [...prev.enemies, newEnemy],
        }));
      } else if (type === "ammoBox") {
        const newAmmoBox: AmmoBox = {
          id: Math.random().toString(36),
          position: startPos,
          velocity: velocity.multiplyScalar(0.01), // Ammo boxes move slower
          rotation: 0,
        };
        setGameState((prev) => ({
          ...prev,
          ammoBoxes: [...prev.ammoBoxes, newAmmoBox],
        }));
      } else if (type === "powerUp") {
        const powerUpConfig =
          specificConfig as (typeof POWER_UP_CONFIG)[keyof typeof POWER_UP_CONFIG];
        const newPowerUp: PowerUp = {
          id: Math.random().toString(36),
          position: startPos,
          velocity: velocity.multiplyScalar(0.01), // Power-ups move slower
          rotation: 0,
          type: powerUpConfig.type,
          color: powerUpConfig.color,
        };
        setGameState((prev) => ({
          ...prev,
          powerUps: [...prev.powerUps, newPowerUp],
        }));
      } else if (type === "upgradeBox") {
        // New logic for upgradeBox
        const upgradeBoxConfig = specificConfig as typeof UPGRADE_BOX_CONFIG;
        const newUpgradeBox: UpgradeBox = {
          id: Math.random().toString(36),
          position: startPos,
          velocity: velocity.multiplyScalar(0.01), // Upgrade boxes move slower
          rotation: 0,
          color: upgradeBoxConfig.color,
        };
        setGameState((prev) => ({
          ...prev,
          upgradeBoxes: [...prev.upgradeBoxes, newUpgradeBox],
        }));
      }
    },
    [WORLD_WIDTH, WORLD_HEIGHT, gameState.score, setGameState] // Added gameState.score for difficulty scaling
  );

  // Spawn enemies
  const spawnEnemy = useCallback(() => {
    const difficultyLevel = Math.floor(
      gameState.score / DIFFICULTY_SCORE_THRESHOLD
    );

    let type: keyof typeof ENEMY_TYPES = "basic";
    const rand = Math.random();

    // Adjust probabilities based on difficulty level
    if (difficultyLevel === 0) {
      // 0-749 points: Basic, Fast, Strong
      if (rand < 0.6) type = "basic";
      else if (rand < 0.85) type = "fast";
      else type = "strong";
    } else if (difficultyLevel === 1) {
      // 750-1499 points: Basic, Fast, Strong, Hard5
      if (rand < 0.4) type = "basic";
      else if (rand < 0.7) type = "fast";
      else if (rand < 0.9) type = "strong";
      else type = "hard5";
    } else if (difficultyLevel === 2) {
      // 1500-2249 points: Fast, Strong, Hard5, Hard7, Invulnerable
      if (rand < 0.2) type = "basic";
      else if (rand < 0.45) type = "fast";
      else if (rand < 0.65) type = "strong";
      else if (rand < 0.8) type = "hard5";
      else if (rand < 0.9) type = "hard7";
      else type = "invulnerable";
    } else if (difficultyLevel === 3) {
      // 2250-2999 points: Strong, Hard5, Hard7, Hard10, Invulnerable
      if (rand < 0.1) type = "basic";
      else if (rand < 0.25) type = "fast";
      else if (rand < 0.45) type = "strong";
      else if (rand < 0.65) type = "hard5";
      else if (rand < 0.8) type = "hard7";
      else if (rand < 0.9) type = "hard10";
      else type = "invulnerable";
    } else {
      // 3000+ points: Hard5, Hard7, Hard10, Invulnerable (more frequent)
      if (rand < 0.1) type = "fast";
      else if (rand < 0.3) type = "strong";
      else if (rand < 0.5) type = "hard5";
      else if (rand < 0.7) type = "hard7";
      else if (rand < 0.85) type = "hard10";
      else type = "invulnerable";
    }

    spawnObject("enemy", ENEMY_TYPES[type]);
  }, [gameState.score, spawnObject]);

  // Spawn power-ups (adjusted probabilities)
  const spawnPowerUp = useCallback(() => {
    const weightedTypes: PowerUp["type"][] = [
      "infiniteAmmo", // 1 part
      "multiShot3", // 1 part
      "multiShot5", // 1 part
    ];
    const type =
      weightedTypes[Math.floor(Math.random() * weightedTypes.length)];
    spawnObject("powerUp", POWER_UP_CONFIG[type]);
  }, [spawnObject]);

  // New spawn function for upgrade boxes
  const spawnUpgradeBox = useCallback(() => {
    spawnObject("upgradeBox", UPGRADE_BOX_CONFIG);
  }, [spawnObject]);

  // Game loop
  useFrame((state, delta) => {
    if (gameState.paused || gameState.gameOver) return;

    // Continuous shooting when mouse is held down
    const isInfiniteAmmo = gameState.activePowerUps.some(
      (p) => p.type === "infiniteAmmo"
    );
    const currentBulletConfig = UPGRADE_LEVELS[gameState.bulletLevel - 1];
    if (
      isMouseDown.current &&
      (isInfiniteAmmo || gameState.ammo >= currentBulletConfig.ammoCost)
    ) {
      shootTimer.current += delta;
      if (shootTimer.current >= SHOOT_COOLDOWN) {
        handleShoot();
        shootTimer.current = 0;
      }
    }

    // Spawn enemies (with limit)
    enemySpawnTimer.current += delta;
    const spawnRate = Math.max(0.3, 2 - gameState.score / 500); // Faster spawn with score, min 0.3s
    if (
      enemySpawnTimer.current > spawnRate &&
      gameState.enemies.length < MAX_ENEMIES_ON_SCREEN
    ) {
      spawnEnemy();
      enemySpawnTimer.current = 0;
    }

    // Spawn ammo boxes (increased frequency)
    ammoBoxSpawnTimer.current += delta;
    if (ammoBoxSpawnTimer.current > 5) {
      // Every 5 seconds
      spawnObject("ammoBox");
      ammoBoxSpawnTimer.current = 0;
    }

    // Spawn power-ups (increased frequency and with limit)
    powerUpSpawnTimer.current += delta;
    if (
      powerUpSpawnTimer.current > 20 &&
      gameState.powerUps.length < MAX_POWERUPS_ON_SCREEN
    ) {
      // Every 8 seconds, if under limit
      spawnPowerUp();
      powerUpSpawnTimer.current = 0;
    }

    // Spawn upgrade boxes (new logic)
    upgradeBoxSpawnTimer.current += delta;
    if (
      upgradeBoxSpawnTimer.current > 5 && // Adjust spawn rate as needed
      gameState.upgradeBoxes.length < MAX_UPGRADE_BOXES_ON_SCREEN
    ) {
      spawnUpgradeBox();
      upgradeBoxSpawnTimer.current = 0;
    }

    setGameState((prev) => {
      const newState = { ...prev };

      // Update bullets (no bouncing for bullets, they just fly off)
      newState.bullets = newState.bullets
        .map((bullet) => ({
          ...bullet,
          position: bullet.position.clone().add(bullet.velocity),
        }))
        .filter((bullet) => bullet.position.length() < 30); // Remove bullets that are too far

      // Helper to handle bouncing off screen edges
      const handleBounce = (obj: {
        position: THREE.Vector3;
        velocity: THREE.Vector3;
        size: number;
      }) => {
        const halfWidth = WORLD_WIDTH / 2;
        const halfHeight = WORLD_HEIGHT / 2;
        const objHalfSize = obj.size / 2;

        // X-axis bounce
        if (obj.position.x + objHalfSize > halfWidth) {
          obj.position.x = halfWidth - objHalfSize; // Adjust position to boundary
          obj.velocity.x *= -1;
        } else if (obj.position.x - objHalfSize < -halfWidth) {
          obj.position.x = -halfWidth + objHalfSize; // Adjust position to boundary
          obj.velocity.x *= -1;
        }

        // Y-axis bounce
        if (obj.position.y + objHalfSize > halfHeight) {
          obj.position.y = halfHeight - objHalfSize; // Adjust position to boundary
          obj.velocity.y *= -1;
        } else if (obj.position.y - objHalfSize < -halfHeight) {
          obj.position.y = -halfHeight + objHalfSize; // Adjust position to boundary
          obj.velocity.y *= -1;
        }
      };

      // Update enemies
      newState.enemies = newState.enemies.map((enemy) => {
        const updatedEnemy = { ...enemy };
        updatedEnemy.position = enemy.position
          .clone()
          .add(updatedEnemy.velocity);

        // Handle invulnerable enemy state
        if (
          updatedEnemy.type === "invulnerable" &&
          updatedEnemy.invulnerableTimer !== undefined
        ) {
          updatedEnemy.invulnerableTimer += delta;
          const cycleDuration = 2; // 1 second invulnerable, 1 second vulnerable
          const invulnerablePhase = 1; // First 1 second of the cycle
          updatedEnemy.isInvulnerable =
            updatedEnemy.invulnerableTimer % cycleDuration < invulnerablePhase;
          if (updatedEnemy.invulnerableTimer >= cycleDuration) {
            updatedEnemy.invulnerableTimer %= cycleDuration; // Reset timer to keep it within cycle
          }
        }

        handleBounce(updatedEnemy); // Apply bouncing
        return updatedEnemy;
      });

      // Update ammo boxes
      newState.ammoBoxes = newState.ammoBoxes.map((ammoBox) => {
        const updatedAmmoBox = { ...ammoBox };
        updatedAmmoBox.position = ammoBox.position
          .clone()
          .add(updatedAmmoBox.velocity);
        updatedAmmoBox.rotation = ammoBox.rotation + delta * 2;
        handleBounce({ ...updatedAmmoBox, size: 0.4 }); // Apply bouncing, pass size explicitly
        return updatedAmmoBox;
      });

      // Update power-ups
      newState.powerUps = newState.powerUps.map((powerUp) => {
        const updatedPowerUp = { ...powerUp };
        updatedPowerUp.position = powerUp.position
          .clone()
          .add(updatedPowerUp.velocity);
        updatedPowerUp.rotation = powerUp.rotation + delta * 2;
        handleBounce({ ...updatedPowerUp, size: 0.4 }); // Apply bouncing, pass size explicitly
        return updatedPowerUp;
      });

      // Update upgrade boxes (new logic)
      newState.upgradeBoxes = newState.upgradeBoxes.map((upgradeBox) => {
        const updatedUpgradeBox = { ...upgradeBox };
        updatedUpgradeBox.position = upgradeBox.position
          .clone()
          .add(updatedUpgradeBox.velocity);
        updatedUpgradeBox.rotation = upgradeBox.rotation + delta * 2;
        handleBounce({ ...updatedUpgradeBox, size: 0.4 }); // Apply bouncing, pass size explicitly
        return updatedUpgradeBox;
      });

      // Check bullet-enemy collisions
      const bulletsToRemove = new Set<string>();
      const enemiesToDestroy = new Set<string>();
      const newSpawnedEnemies: Enemy[] = [];

      newState.bullets.forEach((bullet) => {
        newState.enemies.forEach((enemy) => {
          if (
            !bulletsToRemove.has(bullet.id) &&
            bullet.position.distanceTo(enemy.position) < enemy.size / 2 + 0.1
          ) {
            if (enemy.type === "invulnerable" && enemy.isInvulnerable) {
              // Do not damage if invulnerable
            } else {
              enemy.health -= bullet.damage; // Apply bullet damage
              bulletsToRemove.add(bullet.id);
              if (enemy.health <= 0) {
                enemiesToDestroy.add(enemy.id);

                // Handle spawning fragments for Hard7 and Hard10 at the enemy's destruction location
                if (enemy.type === "hard7") {
                  for (let i = 0; i < 2; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const fragmentVelocity = new THREE.Vector3(
                      Math.cos(angle),
                      Math.sin(angle),
                      0
                    ).multiplyScalar(ENEMY_TYPES.hard3.speed * 1.5); // Faster fragments
                    newSpawnedEnemies.push({
                      ...ENEMY_TYPES.hard3,
                      id: Math.random().toString(36),
                      position: enemy.position.clone(), // Spawn at the destroyed enemy's position
                      velocity: fragmentVelocity,
                      health: ENEMY_TYPES.hard3.health,
                      maxHealth: ENEMY_TYPES.hard3.health,
                    });
                  }
                } else if (enemy.type === "hard10") {
                  for (let i = 0; i < 3; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const fragmentVelocity = new THREE.Vector3(
                      Math.cos(angle),
                      Math.sin(angle),
                      0
                    ).multiplyScalar(ENEMY_TYPES.hard3.speed * 1.5); // Faster fragments
                    newSpawnedEnemies.push({
                      ...ENEMY_TYPES.hard3,
                      id: Math.random().toString(36),
                      position: enemy.position.clone(), // Spawn at the destroyed enemy's position
                      velocity: fragmentVelocity,
                      health: ENEMY_TYPES.hard3.health,
                      maxHealth: ENEMY_TYPES.hard3.health,
                    });
                  }
                }
              }
            }
          }
        });
      });

      // Check bullet-ammo box collisions
      newState.ammoBoxes.forEach((ammoBox) => {
        newState.bullets.forEach((bullet) => {
          if (
            !bulletsToRemove.has(bullet.id) &&
            bullet.position.distanceTo(ammoBox.position) < 0.5
          ) {
            newState.ammo += AMMO_REFILL_AMOUNT;
            setAmmoGainEffect(true); // Trigger ammo gain effect
            setTimeout(() => setAmmoGainEffect(false), 500); // Reset effect after 0.5s
            bulletsToRemove.add(bullet.id); // Mark bullet for removal
            // Remove ammo box
            const ammoBoxIndex = newState.ammoBoxes.findIndex(
              (box) => box.id === ammoBox.id
            );
            if (ammoBoxIndex > -1) {
              newState.ammoBoxes.splice(ammoBoxIndex, 1);
            }
          }
        });
      });

      // Check bullet-power up collisions
      newState.powerUps.forEach((powerUp) => {
        newState.bullets.forEach((bullet) => {
          if (
            !bulletsToRemove.has(bullet.id) &&
            bullet.position.distanceTo(powerUp.position) < 0.5
          ) {
            bulletsToRemove.add(bullet.id); // Mark bullet for removal
            // Remove power-up box
            const powerUpIndex = newState.powerUps.findIndex(
              (p) => p.id === powerUp.id
            );
            if (powerUpIndex > -1) {
              newState.powerUps.splice(powerUpIndex, 1);
            }

            let powerUpValue: number | undefined;
            if (
              powerUp.type === "multiShot3" ||
              powerUp.type === "multiShot5"
            ) {
              powerUpValue = POWER_UP_CONFIG[powerUp.type].value;
            }
            const newActivePowerUp: ActivePowerUp = {
              type: powerUp.type,
              endTime: Date.now() + POWER_UP_DURATION,
              value: powerUpValue,
            };

            // Handle multi-shot stacking logic
            if (powerUp.type.startsWith("multiShot")) {
              const existingMultiShots = newState.activePowerUps.filter((p) =>
                p.type.startsWith("multiShot")
              );
              const currentHighestValue = existingMultiShots.reduce(
                (max, p) => Math.max(max, p.value || 0),
                0
              );

              if (newActivePowerUp.value! > currentHighestValue) {
                // If new power-up is stronger, add it directly
                newState.activePowerUps.push(newActivePowerUp);
              } else {
                // If new power-up is weaker or equal, add it to the end of the queue
                // It will become active only after stronger ones expire
                newState.activePowerUps.push(newActivePowerUp);
              }
            } else {
              // For other power-ups (like infiniteAmmo), replace or extend
              const existingPowerUpIndex = newState.activePowerUps.findIndex(
                (p) => p.type === powerUp.type
              );
              if (existingPowerUpIndex > -1) {
                newState.activePowerUps[existingPowerUpIndex].endTime =
                  newActivePowerUp.endTime;
              } else {
                newState.activePowerUps.push(newActivePowerUp);
              }
            }
          }
        });
      });

      // Check bullet-upgrade box collisions (new logic)
      newState.upgradeBoxes.forEach((upgradeBox) => {
        newState.bullets.forEach((bullet) => {
          if (
            !bulletsToRemove.has(bullet.id) &&
            bullet.position.distanceTo(upgradeBox.position) < 0.5
          ) {
            bulletsToRemove.add(bullet.id); // Mark bullet for removal
            // Remove upgrade box
            const upgradeBoxIndex = newState.upgradeBoxes.findIndex(
              (box) => box.id === upgradeBox.id
            );
            if (upgradeBoxIndex > -1) {
              newState.upgradeBoxes.splice(upgradeBoxIndex, 1);
            }

            // Apply upgrade logic
            if (newState.bulletLevel < UPGRADE_LEVELS.length) {
              newState.upgradeBoxesCollected += 1;
              const nextLevelConfig = UPGRADE_LEVELS[newState.bulletLevel];
              if (
                newState.upgradeBoxesCollected >= nextLevelConfig.boxesNeeded
              ) {
                newState.bulletLevel += 1;
                newState.bulletDamage =
                  UPGRADE_LEVELS[newState.bulletLevel - 1].damage;
                newState.upgradeBoxesCollected = 0; // Reset for next level
              }
            }
          }
        });
      });

      // Remove hit bullets
      newState.bullets = newState.bullets.filter(
        (bullet) => !bulletsToRemove.has(bullet.id)
      );

      // Remove destroyed enemies and add score
      const destroyedEnemies = newState.enemies.filter((enemy) =>
        enemiesToDestroy.has(enemy.id)
      );
      newState.score += destroyedEnemies.reduce(
        (sum, enemy) => sum + enemy.points,
        0
      );
      newState.enemies = newState.enemies.filter(
        (enemy) => !enemiesToDestroy.has(enemy.id)
      );

      // Add newly spawned fragments
      newState.enemies = [...newState.enemies, ...newSpawnedEnemies];

      // Check enemy-center collisions (enemies reaching center still cause damage)
      const hitEnemies = newState.enemies.filter(
        (enemy) => enemy.position.length() < 0.8
      );
      if (hitEnemies.length > 0) {
        newState.health -= hitEnemies.length;
        setPlayerHitEffect(true); // Trigger player hit effect
        setScreenFlashEffect(true); // Trigger screen flash
        setTimeout(() => {
          setPlayerHitEffect(false);
          setScreenFlashEffect(false);
        }, 200); // Reset effects after 0.2s
        newState.enemies = newState.enemies.filter(
          (enemy) => enemy.position.length() >= 0.8
        );

        if (newState.health <= 0) {
          newState.gameOver = true;
        }
      }

      // Remove ammo boxes, power-ups, and upgrade boxes that reached center (they don't cause damage, just disappear)
      newState.ammoBoxes = newState.ammoBoxes.filter(
        (ammoBox) => ammoBox.position.length() >= 0.8
      );
      newState.powerUps = newState.powerUps.filter(
        (powerUp) => powerUp.position.length() >= 0.8
      );
      newState.upgradeBoxes = newState.upgradeBoxes.filter(
        (upgradeBox) => upgradeBox.position.length() >= 0.8
      ); // New filter for upgrade boxes

      // Update active power-ups (remove expired ones)
      newState.activePowerUps = newState.activePowerUps.filter(
        (p) => p.endTime > Date.now()
      );

      return newState;
    });
  });

  // Player geometry and material memoization for optimization
  const playerGeometry = React.useMemo(
    () => new THREE.SphereGeometry(0.5, 32, 32),
    []
  );
  const playerMaterial = React.useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4488ff",
        emissive: "#2244ff",
        emissiveIntensity: 0.6,
        metalness: 0.4,
        roughness: 0.1,
      }),
    []
  );

  const ammoBoxGeometry = React.useMemo(
    () => new THREE.BoxGeometry(0.4, 0.4, 0.4),
    []
  );
  // Changed powerUpGeometry to SphereGeometry
  const powerUpGeometry = React.useMemo(
    () => new THREE.SphereGeometry(0.4, 32, 32),
    []
  );
  // New geometry for upgrade boxes (BoxGeometry)
  const upgradeBoxGeometry = React.useMemo(
    () => new THREE.BoxGeometry(0.4, 0.4, 0.4),
    []
  );

  // Player hit effect visual
  useEffect(() => {
    if (playerHitEffect && playerMeshRef.current) {
      const originalColor = new THREE.Color("#4488ff");
      const hitColor = new THREE.Color("#ff0000");
      const originalScale = new THREE.Vector3(1, 1, 1);
      const hitScale = new THREE.Vector3(1.2, 1.2, 1.2);

      // Flash red
      (playerMeshRef.current.material as THREE.MeshStandardMaterial).color.copy(
        hitColor
      );
      playerMeshRef.current.scale.copy(hitScale);

      const timeout = setTimeout(() => {
        // Revert color and scale
        (
          playerMeshRef.current!.material as THREE.MeshStandardMaterial
        ).color.copy(originalColor);
        playerMeshRef.current!.scale.copy(originalScale);
      }, 200); // Duration of the flash

      return () => clearTimeout(timeout);
    }
  }, [playerHitEffect]);

  return (
    <group>
      {/* crosshair */}
      <group ref={crosshairRef}>
        {/* Outer ring */}
        <mesh>
          <ringGeometry args={[0.25, 0.27, 32]} />
          <meshBasicMaterial color="#00ff00" opacity={0.9} transparent />
        </mesh>

        {/* Center dot */}
        <mesh>
          <circleGeometry args={[0.015, 12]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      </group>

      {/* Central Player with enhanced glow effect */}
      <mesh
        ref={playerMeshRef}
        position={[0, 0, 0]}
        castShadow
        geometry={playerGeometry}
        material={playerMaterial}
      />

      {/* Player energy field */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial color="#4488ff" transparent opacity={0.1} />
      </mesh>

      {/* Bullets with enhanced effects */}
      {gameState.bullets.map((bullet) => (
        <group
          key={bullet.id}
          position={bullet.position}
          rotation={[Math.PI / 2, 0, 0]}
        >
          {/* Laser bullet */}
          <mesh>
            <cylinderGeometry args={[0.075, 0.075, 0.6, 16]} />
            <meshStandardMaterial
              color="#ff0044"
              emissive="#ff3377"
              emissiveIntensity={1.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Light trail (glow) */}
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
            <meshBasicMaterial color="#ff3377" transparent opacity={0.2} />
          </mesh>
        </group>
      ))}

      {/* Enemies with improved visuals and shadows */}
      {gameState.enemies.map((enemy) => (
        <group key={enemy.id} position={enemy.position}>
          <mesh
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[enemy.size, enemy.size, enemy.size]} />
            <meshStandardMaterial
              color={new THREE.Color(0x000000)} // Darker base color (black)
              emissive={enemy.color} // Original color for emissive glow
              emissiveIntensity={0.8} // Increased glow
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
          {/* Bright border effect */}
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry
              args={[enemy.size + 0.05, enemy.size + 0.05, enemy.size + 0.05]}
            />
            <meshBasicMaterial color={enemy.color} wireframe={true} />
          </mesh>

          {/* Enemy energy field */}
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry
              args={[enemy.size + 0.15, enemy.size + 0.15, enemy.size + 0.15]}
            />
            <meshBasicMaterial color={enemy.color} transparent opacity={0.15} />
          </mesh>

          {/* Invulnerable effect */}
          {enemy.type === "invulnerable" && enemy.isInvulnerable && (
            <mesh position={[0, 0, 0]}>
              <ringGeometry
                args={[enemy.size / 2 + 0.2, enemy.size / 2 + 0.4, 32]}
              />{" "}
              {/* Increased size */}
              <meshBasicMaterial
                color="#00ffff"
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}

          {/* Health Bar */}
          <EnemyHealthBar
            currentHealth={enemy.health}
            maxHealth={enemy.maxHealth}
            size={enemy.size}
          />
        </group>
      ))}

      {/* Ammo boxes */}
      {gameState.ammoBoxes.map((ammoBox) => (
        <group key={ammoBox.id} position={ammoBox.position}>
          <mesh
            rotation={[ammoBox.rotation, ammoBox.rotation * 0.7, 0]}
            castShadow
            geometry={ammoBoxGeometry}
          >
            <meshStandardMaterial
              color="#88eeff" // Brighter color
              emissive="#44ccff" // Glowing emissive
              emissiveIntensity={1.0} // Stronger glow
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>
          <Text
            position={[0, 0.6, 0]}
            fontSize={0.15}
            color="#44aaff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="black"
          >
            AMMO
          </Text>
        </group>
      ))}

      {/* Power-up boxes with pulsing effect */}
      {gameState.powerUps.map((powerUp) => (
        <PulsingPowerUp
          key={powerUp.id}
          powerUp={powerUp}
          powerUpGeometry={powerUpGeometry}
        />
      ))}

      {/* Upgrade boxes with pulsing effect (new rendering) */}
      {gameState.upgradeBoxes.map((upgradeBox) => (
        <PulsingUpgradeBox
          key={upgradeBox.id}
          upgradeBox={upgradeBox}
          upgradeBoxGeometry={upgradeBoxGeometry}
        />
      ))}

      {/* Danger zone indicator */}
      <mesh position={[0, 0, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.9, 64]} />
        <meshBasicMaterial color="#ff4444" transparent opacity={0.3} />
      </mesh>

      {/* Enhanced starfield background */}
      <Stars />

      {/* Nebula effect */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#220044" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

// Enemy Health Bar Component
function EnemyHealthBar({
  currentHealth,
  maxHealth,
  size,
}: {
  currentHealth: number;
  maxHealth: number;
  size: number;
}) {
  const { camera } = useThree();
  const healthBarRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (healthBarRef.current) {
      healthBarRef.current.lookAt(camera.position);
    }
  });

  const healthRatio = currentHealth / maxHealth;
  const barWidth = size * 1.2; // Bar width relative to enemy size
  const barHeight = 0.1;

  return (
    <group ref={healthBarRef} position={[0, size / 2 + 0.2, 0]}>
      {/* Background bar */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[barWidth, barHeight]} />
        <meshBasicMaterial color="gray" transparent opacity={0.7} />
      </mesh>
      {/* Health fill */}
      <mesh position={[-barWidth / 2 + (barWidth * healthRatio) / 2, 0, 0]}>
        <planeGeometry args={[barWidth * healthRatio, barHeight]} />
        <meshBasicMaterial
          color={
            healthRatio > 0.5 ? "green" : healthRatio > 0.2 ? "orange" : "red"
          }
        />
      </mesh>
    </group>
  );
}

// Component for Power-ups with pulsing effect
function PulsingPowerUp({
  powerUp,
  powerUpGeometry,
}: {
  powerUp: PowerUp;
  powerUpGeometry: THREE.BufferGeometry;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = powerUp.rotation;
      meshRef.current.rotation.y = powerUp.rotation * 0.7;
    }
    if (materialRef.current) {
      // Animate emissiveIntensity for pulsing effect
      materialRef.current.emissiveIntensity =
        1.0 + Math.sin(clock.elapsedTime * 3) * 0.5; // Pulse between 0.5 and 1.5
    }
  });

  return (
    <group position={powerUp.position}>
      <mesh ref={meshRef} castShadow geometry={powerUpGeometry}>
        <meshStandardMaterial
          ref={materialRef}
          color={new THREE.Color(powerUp.color).lerp(
            new THREE.Color(0xffffff),
            0.5
          )} // Brighter color
          emissive={powerUp.color}
          emissiveIntensity={1.0} // Initial intensity
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.15}
        color={powerUp.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="black"
      >
        {powerUp.type === "infiniteAmmo"
          ? "INF AMMO"
          : powerUp.type === "multiShot3"
            ? "MULTI X3"
            : "MULTI X5"}
      </Text>
    </group>
  );
}

// New Component for Upgrade Boxes with pulsing effect
function PulsingUpgradeBox({
  upgradeBox,
  upgradeBoxGeometry,
}: {
  upgradeBox: UpgradeBox;
  upgradeBoxGeometry: THREE.BufferGeometry;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = upgradeBox.rotation;
      meshRef.current.rotation.y = upgradeBox.rotation * 0.7;
    }
    if (materialRef.current) {
      // Animate emissiveIntensity for pulsing effect
      materialRef.current.emissiveIntensity =
        1.0 + Math.sin(clock.elapsedTime * 3) * 0.5; // Pulse between 0.5 and 1.5
    }
  });

  return (
    <group position={upgradeBox.position}>
      <mesh ref={meshRef} castShadow geometry={upgradeBoxGeometry}>
        <meshStandardMaterial
          ref={materialRef}
          color={new THREE.Color(upgradeBox.color).lerp(
            new THREE.Color(0xffffff),
            0.5
          )} // Brighter color
          emissive={upgradeBox.color}
          emissiveIntensity={1.0} // Initial intensity
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.15}
        color={upgradeBox.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="black"
      >
        UPGRADE
      </Text>
    </group>
  );
}

// Enhanced Starfield component
function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const stars2Ref = useRef<THREE.Points>(null);

  const starPositions = React.useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
    }
    return positions;
  }, []);

  const starPositions2 = React.useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.z += 0.0003;
    }
    if (stars2Ref.current) {
      stars2Ref.current.rotation.z -= 0.0005;
    }
  });

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />{" "}
          {/* array, itemSize */}
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.03} sizeAttenuation={false} />
      </points>
      <points ref={stars2Ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions2, 3]}
          />{" "}
          {/* array, itemSize */}
        </bufferGeometry>
        <pointsMaterial color="#aaccff" size={0.05} sizeAttenuation={false} />
      </points>
    </>
  );
}
