import { createContext, useReducer, useContext, ReactNode } from "react";

type Coord = [number, number];

type ShipName =
  | "carrier"
  | "battleship"
  | "cruiser"
  | "submarine"
  | "destroyer";

type Ship = {
  name: ShipName;
  size: number;
  positions: Coord[];
  hits: Set<string>;
};

interface GameState {
  ships: Record<ShipName, Ship>;
  hits: Set<string>;
  misses: Set<string>;
}

type Action = { type: "FIRE"; coord: Coord };

const layoutData = {
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

const getCoordKey = (r: number, c: number) => `${r}-${c}`;

const shipsByName = layoutData.layout.reduce<Record<ShipName, Ship>>(
  (shipsMap, { ship: shipName, positions }) => {
    shipsMap[shipName] = {
      name: shipName,
      size: layoutData.shipTypes[shipName],
      positions,
      hits: new Set<string>(),
    };
    return shipsMap;
  },
  {} as Record<ShipName, Ship>
);

const initialState: GameState = {
  ships: shipsByName,
  hits: new Set(), //global hit registry
  misses: new Set(), // global miss registry
};

export const reducer = (state: GameState, action: Action): GameState => {
  if (action.type !== "FIRE") return state;

  const [row, col] = action.coord;
  const cellKey = getCoordKey(row, col);

  if (state.hits.has(cellKey) || state.misses.has(cellKey)) return state;

  for (const currentShip of Object.values(state.ships)) {
    const isHit = currentShip.positions.some(
      ([shipRow, shipCol]) => shipRow === row && shipCol === col
    );

    if (isHit) {
      const newHitsForShip = new Set(currentShip.hits).add(cellKey);

      return {
        ...state,
        hits: new Set(state.hits).add(cellKey),
        ships: {
          ...state.ships,
          [currentShip.name]: { ...currentShip, hits: newHitsForShip },
        },
      };
    }
  }

  return {
    ...state,
    misses: new Set(state.misses).add(cellKey),
  };
};

const GameCtx = createContext<
  { state: GameState; fire: (c: Coord) => void; totalHits: number } | undefined
>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fire = (coord: Coord) => dispatch({ type: "FIRE", coord });
  const totalHits = state.hits.size;

  return (
    <GameCtx.Provider value={{ state, fire, totalHits }}>
      {children}
    </GameCtx.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameCtx);

  if (!ctx) throw new Error("useGame must be used within GameProvider");

  return ctx;
};
