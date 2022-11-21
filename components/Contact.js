import React from "react";
import {
  SiGithub,
  SiInstagram,
  SiMaildotru,
  SiSpotify,
  SiTwitter,
} from "react-icons/si";
import { useStateContext } from "../context/StateContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Contact = () => {
  const { accent } = useStateContext();
  return (
    <div className="contact" id="contact">
      <div>
        <h1
          className={classNames(
            accent?.name === "Purple"
              ? "text-purple-600 dark:text-purple-400"
              : "",
            accent?.name === "Pink" ? "text-pink-600 dark:text-pink-400" : "",
            accent?.name === "Blue" ? "text-blue-600 dark:text-blue-400" : "",
            accent?.name === "Green"
              ? "text-green-600 dark:text-green-400"
              : "",
            accent?.name === "Orange"
              ? "text-orange-600 dark:text-orange-400"
              : "",
            "heading mb-8"
          )}
        >
          Get in touch
        </h1>
        <ul className="external-links">
          <a
            href="https://github.com/miahthegreat"
            target="_blank"
            rel="noreferrer"
            className="external-link"
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
      </div>
    </div>
  );
};

export default Contact;
