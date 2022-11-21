import { useStateContext } from "../../context/StateContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ArticleTitle({ children }) {
  const { accent } = useStateContext();
  return (
    <h1
      className={classNames(
        accent?.name === "Purple" ? "text-purple-600 dark:text-purple-300" : "",
        accent?.name === "Pink" ? "text-pink-600 dark:text-pink-300" : "",
        accent?.name === "Blue" ? "text-blue-600 dark:text-blue-300" : "",
        accent?.name === "Green" ? "text-green-600 dark:text-green-300" : "",
        accent?.name === "Orange" ? "text-orange-600 dark:text-orange-300" : "",
        "mb-12 text-center text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-left md:text-7xl md:leading-none lg:text-8xl"
      )}
    >
      {children}
    </h1>
  );
}
