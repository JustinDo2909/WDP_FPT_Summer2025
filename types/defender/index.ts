import type * as THREE from "three";

// Game types
export interface Enemy {
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

export interface Bullet {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  damage: number; // Bullet now has damage property
}

export interface AmmoBox {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
}

export interface UpgradeBox {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  color: string;
}

export interface PowerUp {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  type: "infiniteAmmo" | "multiShot3" | "multiShot5";
  color: string;
}

export interface ActivePowerUp {
  type: "infiniteAmmo" | "multiShot3" | "multiShot5";
  endTime: number;
  value?: number; // For multiShot, e.g., 3 or 5 bullets
}

export interface GameState {
  health: number;
  maxHealth: number;
  score: number;
  ammo: number;
  enemies: Enemy[];
  bullets: Bullet[];
  ammoBoxes: AmmoBox[];
  upgradeBoxes: UpgradeBox[];
  powerUps: PowerUp[];
  gameOver: boolean;
  paused: boolean;
  activePowerUps: ActivePowerUp[];
  bulletLevel: number;
  upgradeBoxesCollected: number;
  bulletDamage: number;
}
