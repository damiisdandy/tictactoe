import { FC } from "react";
import { motion } from "framer-motion";

const animationConfig = {
  hidden: {
    x: "100%",
  },
  show: {
    x: "0%",
  },
};

const Transition: FC = ({ children }) => {
  return (
    <motion.div
      variants={animationConfig}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="container"
    >
      <div>{children}</div>
    </motion.div>
  );
};

export default Transition;
