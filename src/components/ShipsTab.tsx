import { cn } from "@/lib/utils";
import { useGame } from "@/contexts/GameContext";

import carrierImg from "@/assets/carrier_shape.png";
import battleshipImg from "@/assets/battleship_shape.png";
import cruiserImg from "@/assets/cruiser_shape.png";
import submarineImg from "@/assets/submarine_shape.png";
import destroyerImg from "@/assets/destroyer_shape.png";

import hitSmall from "@/assets/hit_small.png";
import missSmall from "@/assets/miss_small.png";

/** helpers */
const shipSprite: Record<string, string> = {
  destroyer: destroyerImg,
  battleship: battleshipImg,
  cruiser: cruiserImg,
  submarine: submarineImg,
  carrier: carrierImg,
};

const squareSize = "w-5 h-5 flex-shrink-0";

export const ShipsTab: React.FC = () => {
  const { state } = useGame();

  return (
    <div className="border rounded-lg p-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Ships</h2>

      <div className="flex flex-col gap-3">
        {Object.values(state.ships).map((ship) => {
          const cells = ship.positions.map(([r, c]) => `${r}-${c}`);

          return (
            <div key={ship.name} className="flex items-center justify-between">
              <img
                src={shipSprite[ship.name]}
                alt={ship.name}
                className={cn("h-8 w-auto select-none pointer-events-none")}
              />

              <div className="flex gap-1">
                {cells.map((k) => {
                  const hit = state.hits.has(k);

                  return (
                    <span key={k} className={squareSize}>
                      <img
                        src={hit ? hitSmall : missSmall}
                        alt={hit ? "hit" : "not hit yet"}
                        className="w-full h-full object-contain"
                      />
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
