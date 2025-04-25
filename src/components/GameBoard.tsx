import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const GameBoard: React.FC = () => {
  const rows = Array.from({ length: 10 }, (_, i) => i);
  const cols = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Battleship Grid</h2>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 h-10"></TableHead>
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
                {cols.map((col) => (
                  <TableCell
                    key={`${row}-${col}`}
                    className="w-10 h-10 p-0 border border-gray-300"
                  >
                    <button
                      className="w-full h-full flex items-center justify-center hover:bg-gray-100"
                      aria-label={`Grid position ${String.fromCharCode(
                        65 + col
                      )}${row + 1}`}
                    >
                      {/* Cell content will be added later */}
                    </button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
