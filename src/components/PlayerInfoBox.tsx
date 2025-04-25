import { Separator } from "./ui/separator";

type PlayerInfoBoxProps = {
  playerName: string;
  count: number;
};

export const PlayerInfoBox: React.FC<PlayerInfoBoxProps> = ({
  playerName,
  count,
}) => {
  return (
    <div className="flex-1 border rounded-lg p-4 flex flex-col items-center justify-between min-h-[100px]">
      <div className="text-2xl font-bold">{count}</div>
      <Separator />
      <div className="text-sm">{playerName}</div>
    </div>
  );
};
