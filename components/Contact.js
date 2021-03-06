import React from "react";
import {
  SiGithub,
  SiInstagram,
  SiMaildotru,
  SiSpotify,
  SiTwitter,
} from "react-icons/si";
import Parallax from "./Parallax";

const Contact = () => {
  return (
    <div className="contact" id="contact">
      <Parallax>
        <h1 className="mb-8 font-mono text-3xl text-gray-50">Get in touch</h1>
        <ul className="flex items-center justify-center gap-3">
          <a
            href="https://github.com/miahthegreat"
            target="_blank"
            rel="noreferrer"
            className="external-link md:hidden"
          >
            <li>
              <SiGithub />
            </li>
          </a>
          <a
            href="https://twitter.com/miahthegreat"
            target="_blank"
            rel="noreferrer"
            className="external-link"
          >
            <li>
              <SiTwitter />
            </li>
          </a>
          <a
            href="mailto:j.j.schmid85@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="external-link"
          >
            <li>
              <SiMaildotru />
            </li>
          </a>
          <a
            href="https://www.instagram.com/miah_the_bee"
            target="_blank"
            rel="noreferrer"
            className="external-link"
          >
            <li>
              <SiInstagram />
            </li>
          </a>
          <a
            href="https://open.spotify.com/user/225biw52u65ev45v2d2qfyvai"
            target="_blank"
            rel="noreferrer"
            className="external-link"
          >
            <li>
              <SiSpotify />
            </li>
          </a>
        </ul>
      </Parallax>
    </div>
  );
};

export default Contact;
