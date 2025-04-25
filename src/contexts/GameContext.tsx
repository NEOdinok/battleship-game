import { createContext, useReducer, useContext, ReactNode, FC } from "react";

import { Coord, GameState } from "@/types/types";
import { gameReducer, createInitialState } from "@/lib/gameReducer";

const GameCtx = createContext<
  { state: GameState; fire: (c: Coord) => void; totalHits: number } | undefined
>(undefined);

export const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );
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
