import { useEffect, useMemo, useState } from "react";
import Board from "../components/Board";

const allEqual = (arr: any[]) => arr.every((v) => v === arr[0]);

const Game = () => {
  const INITIAL_STATE = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [board, setBoard] = useState<BoardType>([...INITIAL_STATE]);
  const [turns, setTurns] = useState(0);
  const [hasWinner, setHasWinner] = useState(false);
  const [winType, setWinType] = useState<WinType>("");

  const selectLocation = (x: number, y: number) => {
    if (board[x][y] === null) {
      setBoard((state) => {
        let currentBoard = [...state];
        currentBoard[x][y] = turns % 2 === 0 ? "X" : "O";
        return currentBoard;
      });
      setTurns((state) => state + 1);
    }
  };

  const allSlotsTaken = useMemo(() => {
    const boardArray = board.reduce((a, b) => [...a, ...b], []);
    return !boardArray.includes(null);
  }, [board]);

  const resetBoard = () => {
    setBoard([...INITIAL_STATE]);
    setHasWinner(false);
    setTurns(0);
    setWinType("");
  };

  useEffect(() => {
    let rightDiagonalArray = [];
    let leftDiagonalArray = [];
    for (let i = 0; i < board.length; i++) {
      let horizontalArray = [];
      let verticalArray = [];
      rightDiagonalArray[i] = board[i][i]; // [(0,0), (1,1), (2,2)]
      leftDiagonalArray[i] = board[i][2 - i]; // [(0,2), (1,1), (2,0)]
      for (let j = 0; j < board[i].length; j++) {
        horizontalArray[j] = board[i][j];
        verticalArray[j] = board[j][i];
      }
      if (allEqual(horizontalArray) && horizontalArray[0] !== null) {
        setHasWinner(true);
        if (i === 0) {
          setWinType("htop");
        } else if (i === 1) {
          setWinType("hmid");
        } else {
          setWinType("hbtm");
        }
        break;
      }
      if (allEqual(verticalArray) && verticalArray[0] !== null) {
        setHasWinner(true);
        if (i === 0) {
          setWinType("vleft");
        } else if (i === 1) {
          setWinType("vmid");
        } else {
          setWinType("vright");
        }
        break;
      }
    }
    if (
      allEqual(rightDiagonalArray) &&
      rightDiagonalArray[0] !== null &&
      rightDiagonalArray.length === 3
    ) {
      setHasWinner(true);
      setWinType("dright");
    }
    if (
      allEqual(leftDiagonalArray) &&
      leftDiagonalArray[0] !== null &&
      leftDiagonalArray.length === 3
    ) {
      setHasWinner(true);
      setWinType("dleft");
    }
  }, [board]);
  return (
    <div>
      <div className="winner">
        {hasWinner ? (
          <h2>
            "<span className="letter">{turns % 2 === 0 ? "O" : "X"}</span>" Won
            the game! 😃
          </h2>
        ) : (
          !hasWinner && allSlotsTaken && <h2>Draw! 😬</h2>
        )}
        <button onClick={resetBoard}>Reset board</button>
      </div>

      <Board
        boardMap={board}
        selectLocation={selectLocation}
        hasWinner={hasWinner}
        winType={winType}
      />
    </div>
  );
};

export default Game;
