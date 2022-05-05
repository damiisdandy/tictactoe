import Transition from "../../components/Transition";
import { ImSpinner9 } from "react-icons/im";
import { GoAlert } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import axios from "../../services/axios";
import { siteURL } from "../../config";
import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const CreateGame = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [gameCode, setGameCode] = useState("");
  const { userID } = useUser();

  useEffect(() => {
    (async () => {
      try {
        const resData = await axios.post("/game/create", { creator: userID });
        setGameCode(resData.data.data.code);
        console.log(resData.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [userID]);

  const gameURL = useMemo(() => `${siteURL}/game/${gameCode}`, [gameCode]);
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
            <p>share the url below with your opponent</p>
            <Link to={gameURL.replace(siteURL, "")}>{gameURL}</Link>
          </>
        )}
      </div>
    </Transition>
  );
};

export default CreateGame;
