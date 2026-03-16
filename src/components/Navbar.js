import logo from "../images/logo.svg";
import { socialLinks } from "../data";
import PageLinks from "./pageLinks";
import SocialLink from "./SocialLink";

import { useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linksId = useId();

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} className="nav-logo" alt="backroads" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="nav-toggle"
            id="nav-toggle"
            aria-controls={linksId}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <PageLinks
          id={linksId}
          parentClass={`nav-links${isMenuOpen ? " show-links" : ""}`}
          itemClass="nav-link"
          onItemClick={() => setIsMenuOpen(false)}
        />

        <ul className="nav-icons" id="nav-icons">
          {socialLinks.map((link) => {
            return <SocialLink key={link.id} {...link} itemClass="nav-icon" />;
          })}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
