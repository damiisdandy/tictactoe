import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import useUser from "./hooks/useUser";
import ChangeName from "./pages/change-name";
import Help from "./pages/help";
import Home from "./pages/home";

// TODO:
// 1. add OG image (seo)
// 2. add PWA

// check if all elements of an array are equal

const App: FC = () => {
  const { userName, changeUserName } = useUser();
  return (
    <div className="App">
      <Layout userName={userName}>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/change-name"
              element={<ChangeName changeUserName={changeUserName} />}
            />
            <Route path="/help" element={<Help />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </div>
  );
};

export default App;
