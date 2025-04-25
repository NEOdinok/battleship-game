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
  positions: Coord[]; // immutable layout
  hits: Set<string>; // strings \"row-col\" of hits on this ship
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

const key = (r: number, c: number) => `${r}-${c}`;

const initShips = layoutData.layout.reduce((acc, { ship, positions }) => {
  acc[ship] = {
    name: ship,
    size: layoutData.shipTypes[ship],
    positions,
    hits: new Set<string>(),
  };
  return acc;
}, {} as Record<ShipName, Ship>);

const initialState: GameState = {
  ships: initShips,
  hits: new Set(),
  misses: new Set(),
};

// ---------- reducer ----------
function reducer(state: GameState, action: Action): GameState {
  if (action.type !== "FIRE") return state;

  const [r, c] = action.coord;
  const k = key(r, c);

  if (state.hits.has(k) || state.misses.has(k)) return state; // already fired

  // hit?
  for (const ship of Object.values(state.ships)) {
    if (ship.positions.some(([sr, sc]) => sr === r && sc === c)) {
      const newHits = new Set(ship.hits).add(k);
      return {
        ...state,
        hits: new Set(state.hits).add(k),
        ships: {
          ...state.ships,
          [ship.name]: { ...ship, hits: newHits },
        },
      };
    }
  }

  // miss
  return {
    ...state,
    misses: new Set(state.misses).add(k),
  };
}

// ---------- context ----------
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
