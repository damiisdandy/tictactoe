import { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC<{ userName: string | null }> = ({ userName }) => {
  return (
    <div className="Navbar">
      <h1 className="title">Tic Tac Toe</h1>
      {userName && <p>Hello {userName} 👋🏾</p>}
      <div className="links">
        <Link to="/">menu</Link>
        <Link to="/change-name">change name</Link>
        <Link to="/help">help</Link>
      </div>
    </div>
  );
};

export default Navbar;
