import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import List from "./List.jsx";
import "../../styles/css/classes/UI/footer.css";

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer__icons">
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </div>
      <div className="footer__lists--wrapper">
        <ul className="footer__lists">
          <List link="">FAQ</List>
          <List link="">Investor Relations</List>
          <List link="">Ways to Watch</List>
          <List link="">Corporate Information</List>
          <List link="">Help Center</List>
          <List link="">Jobs</List>
          <List link="">Term of Use</List>
          <List link="">Contact Us</List>
          <List link="">Account</List>
          <List link="">Reedem Gift Cards</List>
          <List link="">Privacy</List>
          <List link="">Speed Test</List>
          <List link="">Media Center</List>
          <List link="">Buy Gift Cards</List>
          <List link="">Cookie Preference</List>
          <List link="">Legal Notices</List>
        </ul>
      </div>
      <p>&copy; 1997-2026 Netflix, Inc.</p>
    </footer>
  );
};

export default Footer;
