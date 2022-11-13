import Link from "next/link";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import MobilePopover from "./Navigation/MobilePopover";
import FontMenu from "./Theme/FontMenu";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState(null);

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
            <li className="nav-link">Home</li>
          </a>
        </Link>
        <Link href="/blog">
          <a>
            <li className="nav-link">Blog</li>
          </a>
        </Link>
        <Link href="/#skills">
          <a>
            <li className="nav-link">Skills</li>
          </a>
        </Link>
        <Link href="/#projects">
          <a>
            <li className="nav-link">Projects</li>
          </a>
        </Link>
        <Link href="/#contact">
          <a>
            <li className="nav-link">Contact</li>
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
              className="theme-btn"
              onClick={() => {
                setTheme(localTheme === "dark" ? "light" : "dark");
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
