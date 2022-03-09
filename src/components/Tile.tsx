import { FC } from "react";

interface TileProps {
  select: () => void;
  value: string | null;
}

const Tile: FC<TileProps> = ({ select, value }) => {
  return (
    <div className="Tile" onClick={select}>
      {value}
    </div>
  );
};

export default Tile;
