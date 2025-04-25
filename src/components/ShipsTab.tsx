import { useGame } from "@/contexts/GameContext";

export const ShipsTab: React.FC = () => {
  const { state } = useGame();

  return (
    <div className="border rounded-lg p-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Ships</h2>
      <div className="flex flex-col gap-4">
        {Object.values(state.ships).map((ship) => {
          const cells = ship.positions.map(([r, c]) => `${r}-${c}`);
          return (
            <div
              key={ship.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="capitalize">{ship.name}</span>
              <div className="flex gap-1">
                {cells.map((k) => (
                  <span
                    key={k}
                    className={`w-5 h-5 text-xs flex items-center justify-center border rounded
                      ${
                        state.hits.has(k)
                          ? "bg-red-500 text-white"
                          : state.misses.has(k)
                          ? "bg-blue-300"
                          : "bg-gray-200"
                      }`}
                  >
                    {state.hits.has(k) ? "1" : state.misses.has(k) ? "0" : ""}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
