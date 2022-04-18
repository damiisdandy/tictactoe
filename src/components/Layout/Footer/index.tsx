import { FaLink, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="socials">
        <a href="https://www.damiisdandy.com" target="_blank" rel="noreferrer">
          <FaLink size="18px" />
        </a>
        <a
          href="https://www.github.com/damiisdandy"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size="18px" />
        </a>
        <a
          href="https://www.linkedin.com/in/damiisdandy"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size="18px" />
        </a>
      </div>
      <p className="copy">&copy; damiisdandy</p>
    </div>
  );
};

export default Footer;
