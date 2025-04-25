import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGame } from "@/contexts/GameContext";

export const GameBoard: React.FC = () => {
  const rows = Array.from({ length: 10 }, (_, i) => i);
  const cols = Array.from({ length: 10 }, (_, i) => i);
  const { state, fire } = useGame();

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Battleship Grid</h2>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 h-10" />
              {cols.map((col) => (
                <TableHead key={col} className="w-10 h-10 text-center">
                  {String.fromCharCode(65 + col)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row}>
                <TableCell className="font-medium text-center">
                  {row + 1}
                </TableCell>
                {cols.map((col) => {
                  const coordKey = `${row}-${col}`;
                  const hit = state.hits.has(coordKey);
                  const miss = state.misses.has(coordKey);
                  return (
                    <TableCell key={coordKey} className="w-10 h-10 p-0 border">
                      <button
                        disabled={hit || miss}
                        onClick={() => fire([row, col])}
                        className={`w-full h-full flex items-center justify-center
                          ${
                            hit
                              ? "bg-red-400 text-red"
                              : miss
                              ? "bg-blue-200"
                              : "hover:bg-gray-100"
                          }`}
                        aria-label={`Grid ${String.fromCharCode(65 + col)}${
                          row + 1
                        }`}
                      >
                        {hit ? "1" : miss ? "0" : ""}
                      </button>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
