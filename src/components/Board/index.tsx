import { FC } from "react";
import Tile from "./Tile";

interface BoardProps {
  boardMap: BoardType;
  selectLocation: (x: number, y: number) => void;
  hasWinner: boolean;
  winType: WinType;
}

const Board: FC<BoardProps> = ({
  boardMap,
  selectLocation,
  hasWinner,
  winType,
}) => {
  return (
    <div className="Board">
      {hasWinner && <div className={`line ${winType}`}></div>}
      {boardMap[0].map((el, index) => (
        <Tile
          key={index.toString() + "top"}
          select={() => (!hasWinner ? selectLocation(0, index) : null)}
          value={el}
        />
      ))}
      {boardMap[1].map((el, index) => (
        <Tile
          key={index.toString() + "mid"}
          select={() => (!hasWinner ? selectLocation(1, index) : null)}
          value={el}
        />
      ))}
      {boardMap[2].map((el, index) => (
        <Tile
          key={index.toString() + "btm"}
          select={() => (!hasWinner ? selectLocation(2, index) : null)}
          value={el}
        />
      ))}
    </div>
  );
};

export default Board;
