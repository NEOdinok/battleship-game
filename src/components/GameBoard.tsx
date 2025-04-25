// src/components/GameBoard.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGame } from "@/contexts/GameContext";

import hitImg from "@/assets/Hit.png";
import missImg from "@/assets/miss.png";

const getAriaLabel = (col: number, row: number) =>
  `Grid ${String.fromCharCode(65 + col)}${row + 1}`;

export const GameBoard: React.FC = () => {
  const rows = Array.from({ length: 10 }, (_, i) => i);
  const cols = Array.from({ length: 10 }, (_, i) => i);
  const { state, fire } = useGame();

  const cellBox = "w-3 h-3 text-xs sm:w-10 sm:h-10 sm:text-base";
  const iconBox = "w-4 h-4 flex-shrink-0 sm:w-5 sm:h-5";

  return (
    <div className="sm:border sm:rounded-lg sm:p-4">
      <h2 className="text-lg font-semibold mb-4">Battleship Grid</h2>

      {/* table-fixed keeps columns equal; w-full prevents overflow */}
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className={cellBox} />
            {cols.map((col) => (
              <TableHead key={col} className={`${cellBox} text-center`}>
                {String.fromCharCode(65 + col)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row}>
              <TableCell className={`${cellBox} font-medium text-center`}>
                {row + 1}
              </TableCell>

              {cols.map((col) => {
                const key = `${row}-${col}`;
                const isHit = state.hits.has(key);
                const isMiss = state.misses.has(key);

                return (
                  <TableCell key={key} className={`${cellBox} p-0 border`}>
                    <button
                      disabled={isHit || isMiss}
                      onClick={() => fire([row, col])}
                      className="w-full h-full flex items-center justify-center hover:bg-gray-100 relative"
                      aria-label={getAriaLabel(col, row)}
                    >
                      {isHit || isMiss ? (
                        <img
                          src={isHit ? hitImg : missImg}
                          alt={isHit ? "hit" : "miss"}
                          className={`${iconBox} object-contain absolute`}
                        />
                      ) : (
                        <span className={`${iconBox} opacity-0`} />
                      )}
                    </button>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
