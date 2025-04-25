import { describe, it, expect } from "vitest";

import { gameReducer, createInitialState } from "@/lib/gameReducer";
import { Action } from "@/types/types";
import { Coord } from "@/types/types";

const emptyCell: Coord = [0, 9];
const carrierCell: Coord = [2, 9];

describe("gameReducer", () => {
  it("records a miss when firing at water", () => {
    const state = createInitialState();
    const action: Action = { type: "FIRE", coord: emptyCell };
    const next = gameReducer(state, action);

    expect(next.misses.has("0-9")).toBe(true);
    expect(next.hits.size).toBe(0);
  });

  it("records a hit and updates the correct ship", () => {
    const state = createInitialState();
    const action: Action = { type: "FIRE", coord: carrierCell };
    const next = gameReducer(state, action);

    expect(next.hits.has("2-9")).toBe(true);
    expect(next.ships.carrier.hits.has("2-9")).toBe(true);
    expect(next.misses.size).toBe(0);
  });

  it("ignores duplicate shots at the same cell", () => {
    const state = createInitialState();
    const shot: Action = { type: "FIRE", coord: [2, 9] };

    const afterFirst = gameReducer(state, shot);
    const afterSecond = gameReducer(afterFirst, shot);

    expect(afterSecond).toBe(afterFirst);
  });
});
