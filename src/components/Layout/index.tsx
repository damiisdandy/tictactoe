import { FC } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: FC<{ userName: string | null }> = ({ children, userName }) => {
  return (
    <>
      <Navbar userName={userName} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
