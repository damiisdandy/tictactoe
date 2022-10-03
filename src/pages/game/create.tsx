import Transition from "../../components/Transition";
import { ImSpinner9 } from "react-icons/im";
import { GoAlert } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../../services/axios";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const CreateGame = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [gameCode, setGameCode] = useState("");
  const [prevGameCode, setPrevGameCode] = useState(null);
  const { userID } = useUser();

  useEffect(() => {
    (async () => {
      try {
        const resData = await axios.post("/game/create", { creator: userID });
        const gameData = resData.data.data;
        setGameCode(gameData.code);
        if (gameData.previousGame) {
          setPrevGameCode(gameData.previousGame.code);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [userID]);

  return (
    <Transition>
      <div className="CreateGame">
        {loading ? (
          <>
            <h1>creating game</h1>
            <ImSpinner9 className="loading" />
          </>
        ) : error ? (
          <>
            <h1>problem creating game</h1>
            <GoAlert className="error" />
          </>
        ) : (
          <>
            <h1>game created</h1>
            <FaCheck className="success" />
            <p>click the url below to play and share it with your opponent</p>
            <Link
              to={`/game/${gameCode}`}
            >{`${window.location.origin}/game/${gameCode}`}</Link>
            {prevGameCode && (
              <p className="warning">
                Previous game <b>{prevGameCode}</b> is deleted
              </p>
            )}
          </>
        )}
      </div>
    </Transition>
  );
};

export default CreateGame;
