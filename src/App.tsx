import React from "react";
import "./App.css";
import { ShipsTab, GameBoard, PlayerInfoBox } from "./components";

/**
 * Responsive layout for Battleship Game.
 *
 * Breakpoints
 * - Mobile (<768px): stacked (board, info boxes, ships)
 * - Tablet (≥768px & <1024px): board on top, two‑column row beneath (info | ships)
 * - Desktop (≥1024px): two‑column layout (info/ships | board)
 */
const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Battleship Game</h1>

      {/* Root layout container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Info + Ships Column (left on desktop, bottom on tablet/mobile) */}
        <div className="order-2 lg:order-1 w-full lg:w-1/3">
          <div className="flex flex-col md:flex-row lg:flex-col gap-6 h-full">
            {/* Player info boxes */}
            <div className="flex flex-row gap-4 md:w-1/2 lg:w-full">
              <PlayerInfoBox playerName="Player 1" count={0} />
              <PlayerInfoBox playerName="Player 2" count={0} />
            </div>

            {/* Ships display */}
            <div className="flex-1 md:w-1/2 lg:w-full">
              <ShipsTab />
            </div>
          </div>
        </div>

        {/* Game board (right on desktop, top on tablet/mobile) */}
        <div className="order-1 lg:order-2 w-full lg:w-2/3">
          <GameBoard />
        </div>
      </div>
    </div>
  );
};

export default App;

// function App() {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Battleship Game</h1>

//       {/* Main layout container - changes based on screen size */}
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left section (on desktop) - contains player info and ships */}
//         <div className="w-full lg:w-1/3 flex flex-col gap-6">
//           {/* Player info boxes */}
//           <div className="flex flex-row gap-4">
//             <PlayerInfoBox playerName="Player 1" count={0} />
//             <PlayerInfoBox playerName="Player 2" count={0} />
//           </div>

//           {/* Ships display */}
//           <div className="flex-grow">
//             <ShipsTab />
//           </div>
//         </div>

//         {/* Right section (on desktop) - contains game board */}
//         <div className="w-full lg:w-2/3">
//           <GameBoard />
//         </div>
//       </div>
//     </div>
//   );
// }
