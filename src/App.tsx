import React from "react";
import "./App.css";
import { ShipsTab, GameBoard, PlayerInfoBox } from "./components";
import { GameProvider, useGame } from "./contexts/GameContext";

const AppLayout: React.FC = () => {
  const { totalHits } = useGame();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Battleship Game 💥🔫🚢
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="order-2 lg:order-1 w-full lg:w-1/3">
          <div className="flex flex-col md:flex-row md:items-start lg:flex-col gap-6 h-full">
            <div className="flex flex-row gap-4 md:w-1/2 lg:w-full">
              <PlayerInfoBox playerName="Player 1" count={totalHits} />
              <PlayerInfoBox playerName="Player 2" count={0} />
            </div>

            <div className="flex-1 md:w-1/2 lg:w-full">
              <ShipsTab />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 w-full lg:w-2/3">
          <GameBoard />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <GameProvider>
    <AppLayout />
  </GameProvider>
);

export default App;
