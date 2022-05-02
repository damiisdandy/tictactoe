import Transition from "../components/Transition";
import useUI from "../hooks/useUI";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { setShowBackdrop } = useUI();
  const { userName } = useUser();

  const goToPage = (path: string) => {
    if (!userName) {
      setShowBackdrop(true);
    }
    navigate(path);
  };
  return (
    <Transition>
      <div className="Home">
        <p className="game-icon">👾</p>
        <div className="button-info">
          <button onClick={() => goToPage("/game/create")}>Create Game</button>
          <p className="info">
            Create your game and share the link with your friends
          </p>
        </div>
        <div className="button-info">
          <button onClick={() => goToPage("/game/public")}>Public match</button>
          <p className="info">Enter a waiting room and play with anyone.</p>
        </div>
      </div>
    </Transition>
  );
};

export default Home;
