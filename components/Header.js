import React from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <ul className="nav-links">
        <a href="#">
          <li className="nav-link">Home</li>
        </a>
        <a href="#skills">
          <li className="nav-link">Skills</li>
        </a>
        <a href="#projects">
          <li className="nav-link">Projects</li>
        </a>
        <a href="#contact">
          <li className="nav-link">Contact</li>
        </a>
      </ul>
      <ul className="external-links">
        <a
          href="https://github.com/miahthegreat"
          className="external-link"
          target="_blank"
          rel="noreferrer"
        >
          <li>
            <FaGithub />
          </li>
        </a>
      </ul>
    </div>
  );
};

export default Header;
