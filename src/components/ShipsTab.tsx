export const ShipsTab: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 h-full">
      <h2 className="text-lg font-semibold mb-4">Ships</h2>
      <div className="flex flex-col gap-4">
        {/* Placeholder for ship images - will be implemented later */}
        <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
          Carrier (5)
        </div>
        <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
          Battleship (4)
        </div>
        <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
          Cruiser (3)
        </div>
        <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
          Submarine (3)
        </div>
        <div className="h-12 bg-gray-200 rounded flex items-center justify-center">
          Destroyer (2)
        </div>
      </div>
    </div>
  );
};
