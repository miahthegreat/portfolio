import Link from "next/link";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import MobilePopover from "./Navigation/MobilePopover";
import FontMenu from "./Theme/FontMenu";
import { useStateContext } from "../context/StateContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState(null);
  const { accent } = useStateContext();

  useEffect(() => {
    if (typeof window !== undefined) {
      setLocalTheme(localStorage.getItem("theme"));
    }
  }, [theme]);

  return (
    <div className="header">
      {/* Desktop Links */}
      <ul className="nav-links">
        <Link href="/#">
          <a>
            <li
              className={classNames(
                accent?.name === "Pink"
                  ? "hover:bg-pink-700/50 dark:hover:bg-pink-500/50"
                  : "",
                accent?.name === "Purple"
                  ? "hover:bg-purple-700/50 dark:hover:bg-purple-500/50"
                  : "",
                accent?.name === "Blue"
                  ? "hover:bg-blue-700/50 dark:hover:bg-blue-500/50"
                  : "",
                accent?.name === "Green"
                  ? "hover:bg-green-700/50 dark:hover:bg-green-500/50"
                  : "",
                accent?.name === "Orange"
                  ? "hover:bg-orange-700/50 dark:hover:bg-orange-500/50"
                  : "",
                "nav-link"
              )}
            >
              Home
            </li>
          </a>
        </Link>
        <Link href="/blog">
          <a>
            <li
              className={classNames(
                accent?.name === "Pink"
                  ? "hover:bg-pink-700/50 dark:hover:bg-pink-500/50"
                  : "",
                accent?.name === "Purple"
                  ? "hover:bg-purple-700/50 dark:hover:bg-purple-500/50"
                  : "",
                accent?.name === "Blue"
                  ? "hover:bg-blue-700/50 dark:hover:bg-blue-500/50"
                  : "",
                accent?.name === "Green"
                  ? "hover:bg-green-700/50 dark:hover:bg-green-500/50"
                  : "",
                accent?.name === "Orange"
                  ? "hover:bg-orange-700/50 dark:hover:bg-orange-500/50"
                  : "",
                "nav-link"
              )}
            >
              Blog
            </li>
          </a>
        </Link>
        <Link href="/#skills">
          <a>
            <li
              className={classNames(
                accent?.name === "Pink"
                  ? "hover:bg-pink-700/50 dark:hover:bg-pink-500/50"
                  : "",
                accent?.name === "Purple"
                  ? "hover:bg-purple-700/50 dark:hover:bg-purple-500/50"
                  : "",
                accent?.name === "Blue"
                  ? "hover:bg-blue-700/50 dark:hover:bg-blue-500/50"
                  : "",
                accent?.name === "Green"
                  ? "hover:bg-green-700/50 dark:hover:bg-green-500/50"
                  : "",
                accent?.name === "Orange"
                  ? "hover:bg-orange-700/50 dark:hover:bg-orange-500/50"
                  : "",
                "nav-link"
              )}
            >
              Skills
            </li>
          </a>
        </Link>
        <Link href="/#projects">
          <a>
            <li
              className={classNames(
                accent?.name === "Pink"
                  ? "hover:bg-pink-700/50 dark:hover:bg-pink-500/50"
                  : "",
                accent?.name === "Purple"
                  ? "hover:bg-purple-700/50 dark:hover:bg-purple-500/50"
                  : "",
                accent?.name === "Blue"
                  ? "hover:bg-blue-700/50 dark:hover:bg-blue-500/50"
                  : "",
                accent?.name === "Green"
                  ? "hover:bg-green-700/50 dark:hover:bg-green-500/50"
                  : "",
                accent?.name === "Orange"
                  ? "hover:bg-orange-700/50 dark:hover:bg-orange-500/50"
                  : "",
                "nav-link"
              )}
            >
              Projects
            </li>
          </a>
        </Link>
        <Link href="/#contact">
          <a>
            <li
              className={classNames(
                accent?.name === "Pink"
                  ? "hover:bg-pink-700/50 dark:hover:bg-pink-500/50"
                  : "",
                accent?.name === "Purple"
                  ? "hover:bg-purple-700/50 dark:hover:bg-purple-500/50"
                  : "",
                accent?.name === "Blue"
                  ? "hover:bg-blue-700/50 dark:hover:bg-blue-500/50"
                  : "",
                accent?.name === "Green"
                  ? "hover:bg-green-700/50 dark:hover:bg-green-500/50"
                  : "",
                accent?.name === "Orange"
                  ? "hover:bg-orange-700/50 dark:hover:bg-orange-500/50"
                  : "",
                "nav-link"
              )}
            >
              Contact
            </li>
          </a>
        </Link>
      </ul>
      {/* Mobile Menu */}
      <MobilePopover />
      <div className="flex gap-2">
        {/* Font Picker Menu */}
        <FontMenu />
        {/* Theme Toggle */}
        <ul className="external-links">
          <li className="">
            <button
              className={classNames(
                "theme-btn",
                accent ? accent.hoverBgColor : ""
              )}
              onClick={() => {
                setTheme(localTheme === "dark" ? "light" : "dark");
                localStorage.setItem(
                  "theme",
                  localTheme === "dark" ? "light" : "dark"
                );
              }}
            >
              <FaMoon
                className={`theme-icon ${
                  localTheme === "dark"
                    ? "rotate-180 scale-0"
                    : "rotate-0 scale-100"
                }`}
              />{" "}
              <FaSun
                className={`theme-icon ${
                  localTheme === "dark"
                    ? "rotate-180 scale-100"
                    : "rotate-0 scale-0"
                }`}
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
