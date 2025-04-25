export type Coord = [number, number];

export type ShipName =
  | "carrier"
  | "battleship"
  | "cruiser"
  | "submarine"
  | "destroyer";

export type Ship = {
  name: ShipName;
  size: number;
  positions: Coord[];
  hits: Set<string>;
};

export interface GameState {
  ships: Record<ShipName, Ship>;
  hits: Set<string>;
  misses: Set<string>;
}

export type Action = { type: "FIRE"; coord: Coord };
