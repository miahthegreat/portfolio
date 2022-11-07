import Link from "next/link";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";

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
      <ul className="external-links">
        <li className="">
          <button
            className="relative flex h-10 w-10 items-center rounded-md px-2 font-mono text-xl text-zinc-500 transition duration-300 ease-in hover:cursor-pointer hover:rounded-md hover:bg-zinc-300/50 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-50"
            onClick={() => {
              setTheme(localTheme === "dark" ? "light" : "dark");
            }}
          >
            <FaMoon
              className={`absolute inset-0 top-[50%] mx-auto h-6 w-6 -translate-y-[50%] transform transition-transform duration-300 ${
                localTheme === "dark"
                  ? "rotate-180 scale-0"
                  : "rotate-0 scale-100"
              }`}
            />{" "}
            <FaSun
              className={`absolute inset-0 top-[50%] mx-auto h-6 w-6 -translate-y-[50%] transform transition-transform duration-300 ${
                localTheme === "dark"
                  ? "rotate-180 scale-100"
                  : "rotate-0 scale-0"
              }`}
            />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
