import { FC } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import ChangeName from "../../pages/change-name";
import useUI from "../../hooks/useUI";

const Layout: FC = ({ children }) => {
  const { UI } = useUI();
  return (
    <>
      <motion.div className={`backdrop ${UI.showBackdrop && "active"}`}>
        <ChangeName />
      </motion.div>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
