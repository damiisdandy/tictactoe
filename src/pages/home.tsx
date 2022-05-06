import Transition from "../components/Transition";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Transition>
      <div className="Home">
        <p className="game-icon">👾</p>
        <div className="button-info">
          <button onClick={() => navigate("/game/create")}>Create Game</button>
          <p className="info">
            Create your game and share the link with your friends
          </p>
        </div>
        <div className="button-info">
          <button onClick={() => navigate("/game/public")}>Public match</button>
          <p className="info">Enter a waiting room and play with anyone.</p>
        </div>
      </div>
    </Transition>
  );
};

export default Home;
