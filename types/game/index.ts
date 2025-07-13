export {};
declare global {
  interface GameItem {
    id: number;
    x: number;
    y: number;
    type: "vitamin" | "harmful" | "multiplier";
    name?: string;
    multiplier?: number;
    color: string;
    speed: number;
    points: number;
    imageUrl: string;
  }

  interface Basket {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface PowerUp {
    type: "multiplier";
    value: number;
    timeLeft: number;
  }

  interface GameMode {
    name: string;
    description: string;
    settings: {
      vitaminChance: number;
      harmfulChance: number;
      multiplierChance: number;
      spawnRate: number;
      itemSpeed: { min: number; max: number };
      basketSpeed: number;
      gameTime: number;
      basketSize: { width: number; height: number };
    };
  }
}
