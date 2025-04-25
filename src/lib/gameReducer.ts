import { Coord, Ship, ShipName, GameState, Action } from "@/types/types";

export const layoutData = {
  shipTypes: {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  } as Record<ShipName, number>,
  layout: [
    {
      ship: "carrier",
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      ship: "battleship",
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      ship: "cruiser",
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      ship: "submarine",
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      ship: "destroyer",
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ] as { ship: ShipName; positions: Coord[] }[],
};

const coordKey = (row: number, col: number) => `${row}-${col}`;

export const buildShips = (): Record<ShipName, Ship> =>
  layoutData.layout.reduce<Record<ShipName, Ship>>(
    (map, { ship, positions }) => {
      map[ship] = {
        name: ship,
        size: layoutData.shipTypes[ship],
        positions,
        hits: new Set<string>(),
      };
      return map;
    },
    {} as Record<ShipName, Ship>
  );

export const createInitialState = (): GameState => ({
  ships: buildShips(),
  hits: new Set(),
  misses: new Set(),
});

export const gameReducer = (state: GameState, action: Action): GameState => {
  if (action.type !== "FIRE") return state;

  const [row, col] = action.coord;
  const key = coordKey(row, col);

  if (state.hits.has(key) || state.misses.has(key)) return state;

  for (const ship of Object.values(state.ships)) {
    const isHit = ship.positions.some(
      ([shipRow, shipCol]) => shipRow === row && shipCol === col
    );
    if (isHit) {
      const newShipHits = new Set(ship.hits).add(key);
      return {
        ...state,
        hits: new Set(state.hits).add(key),
        ships: {
          ...state.ships,
          [ship.name]: { ...ship, hits: newShipHits },
        },
      };
    }
  }

  return {
    ...state,
    misses: new Set(state.misses).add(key),
  };
};
