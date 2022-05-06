import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="links">
        <Link to="/">menu</Link>
        <Link to="/change-avatar">change avatar</Link>
        <Link to="/help">help</Link>
      </div>
    </div>
  );
};

export default Navbar;
