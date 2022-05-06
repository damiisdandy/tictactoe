import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ChangeAvatar from "./pages/change-avatar";
import CreateGame from "./pages/game/create";
import Game from "./pages/game/id";
import WaitingRoom from "./pages/game/public";
import Help from "./pages/help";
import Home from "./pages/home";

const App: FC = () => {
  return (
    <div className="App">
      <Layout>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/change-avatar" element={<ChangeAvatar />} />
            <Route path="/help" element={<Help />} />
            <Route path="/game/create" element={<CreateGame />} />
            <Route path="/game/public" element={<WaitingRoom />} />
            <Route path="/game/:id" element={<Game />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </div>
  );
};

export default App;
