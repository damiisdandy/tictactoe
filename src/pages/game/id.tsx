import { useEffect, useMemo, useState } from "react";
import { GoAlert } from "react-icons/go";
import { ImSpinner9 } from "react-icons/im";
import { useParams } from "react-router-dom";
import Board from "../../components/Board";
import Transition from "../../components/Transition";
import useUser from "../../hooks/useUser";
import axios from "../../services/axios";
import socket from "../../services/socket";

const allEqual = (arr: any[]) => arr.every((v) => v === arr[0]);

const Game = () => {
  const { id } = useParams();
  const INITIAL_STATE = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [board, setBoard] = useState<BoardType>([...INITIAL_STATE]);
  const [gameInfo, setGameInfo] = useState<Game | null>(null);
  const [hasWinner, setHasWinner] = useState(false);
  const [winType, setWinType] = useState<WinType>("");
  const { userID } = useUser();

  const selectLocation = (x: number, y: number) => {
    const boardNullArrayLength = board
      .reduce((a, b) => [...a, ...b], [])
      .filter((el) => el === null).length;
    let yourTurn =
      userID === gameInfo?.creator && boardNullArrayLength % 2 !== 0
        ? true
        : userID !== gameInfo?.creator && boardNullArrayLength % 2 === 0;
    if (board[x][y] === null && yourTurn) {
      setBoard((state) => {
        let currentBoard = [...state];
        currentBoard[x][y] =
          yourTurn && userID === gameInfo?.creator ? "X" : "O";
        socket.emit("move", { currentBoard: JSON.stringify(currentBoard), id });
        return currentBoard;
      });
    }
  };

  const allSlotsTaken = useMemo(() => {
    const boardArray = board.reduce((a, b) => [...a, ...b], []);
    return !boardArray.includes(null);
  }, [board]);

  const yourTurn = useMemo(() => {
    const boardNullArrayLength = board
      .reduce((a, b) => [...a, ...b], [])
      .filter((el) => el === null).length;
    return userID === gameInfo?.creator && boardNullArrayLength % 2 !== 0
      ? true
      : userID !== gameInfo?.creator && boardNullArrayLength % 2 === 0;
  }, [board, gameInfo?.creator, userID]);

  const resetBoard = () => {
    setBoard([...INITIAL_STATE]);
    setHasWinner(false);
    setWinType("");
    socket.emit("reset", { id });
  };

  // check winner
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

  // joinGame
  useEffect(() => {
    (async () => {
      try {
        const game = await axios.get(`/game/${id}`);
        const gameData: Game = game.data.data;
        setGameInfo(gameData);
        setBoard(JSON.parse(game.data.data.board));
        if (gameData.creator !== userID && gameData.opponent !== userID) {
          if (gameData.opponent === null) {
            socket.emit("joinGame", { opponent: userID, game: gameData.code });
            // await axios.post(`/game/assign/${id}`, { opponent: userID });
          } else {
            setError({
              status: true,
              message: "you are not a part of this game",
            });
          }
        }
        if (gameData.creator === userID || gameData.opponent === userID) {
          socket.emit("joinGame", { game: id });
        }
      } catch (err: any) {
        if (err.response) {
          setError({
            status: true,
            message: err.response.data.message,
          });
        } else {
          setError({
            status: true,
            message: "Game bugging! contact developer",
          });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id, userID]);

  useEffect(() => {
    socket.on("players", (data) => {
      setGameInfo((state) => ({ ...state, ...data }));
    });
    socket.on("newBoard", (data) => {
      setBoard(JSON.parse(data));
    });
    socket.on("newGame", (data) => {
      setBoard(JSON.parse(data));
      setHasWinner(false);
      setWinType("");
    });
  }, [id]);

  return (
    <Transition>
      <div className="PlayGame">
        {loading ? (
          <>
            <h1>fetching game</h1>
            <ImSpinner9 className="loading" />
          </>
        ) : error.status ? (
          <>
            <h1>{error.message}</h1>
            <GoAlert className="error" />
          </>
        ) : (
          <>
            <div className="players">
              <div className="avatar">
                <img
                  className={yourTurn ? "active" : ""}
                  src={`https://avatars.dicebear.com/api/big-smile/${userID}.svg?skinColor=variant07,variant08`}
                  alt={`player ${userID}'s avatar`}
                />
                <p className="status">
                  {!hasWinner && yourTurn ? "thinking..." : "you"}
                </p>
              </div>
              <div className="avatar">
                {gameInfo?.opponent === null ? (
                  <ImSpinner9 className="loading" />
                ) : (
                  <img
                    className={!yourTurn ? "active" : ""}
                    src={`https://avatars.dicebear.com/api/big-smile/${
                      userID === gameInfo?.creator
                        ? gameInfo.opponent
                        : gameInfo?.creator
                    }.svg?skinColor=variant07,variant08`}
                    alt={`player ${
                      userID === gameInfo?.creator
                        ? gameInfo.opponent
                        : gameInfo?.creator
                    }'s avatar`}
                  />
                )}
                <p className="status">
                  {!hasWinner && !yourTurn
                    ? "thinking..."
                    : gameInfo?.opponent
                    ? "opponent"
                    : "waiting..."}
                </p>
              </div>
            </div>
            <div className="winner">
              {hasWinner ? (
                <h2>{yourTurn ? "You Lost 💀" : "You Won 👑"}</h2>
              ) : (
                !hasWinner && allSlotsTaken && <h2>Draw! 😬</h2>
              )}
              {gameInfo?.creator === userID && (
                <button onClick={resetBoard}>Reset board</button>
              )}
            </div>
            <Board
              boardMap={board}
              selectLocation={selectLocation}
              hasWinner={hasWinner}
              winType={winType}
            />
          </>
        )}
      </div>
    </Transition>
  );
};

export default Game;
