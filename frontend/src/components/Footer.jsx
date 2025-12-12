import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Made by <strong>Tarek Sammoud</strong> |{" "}
        <a
          href="https://github.com/tareksammoud"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;
