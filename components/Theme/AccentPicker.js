import { RadioGroup } from "@headlessui/react";
import { useEffect } from "react";
import { useStateContext } from "../../context/StateContext";

const colors = [
  {
    name: "Pink",
    bgColor: "bg-pink-800/50 dark:bg-pink-400/50",
    selectedColor: "ring-pink-800 dark:ring-pink-400 ring-1",
    textColor: "text-pink-800 dark:text-pink-400",
    hoverColor: "hover:ring-1 hover:ring-pink-800 hover:dark:ring-pink-400",
    gradientColor: "from-pink-300 to-pink-600",
  },
  {
    name: "Purple",
    bgColor: "bg-purple-800/50 dark:bg-purple-400/50",
    selectedColor: "ring-purple-800 dark:ring-purple-400 ring-1",
    textColor: "text-purple-800 dark:text-purple-400",
    hoverColor: "hover:ring-1 hover:ring-purple-800 hover:dark:ring-purple-400",
    gradientColor: "from-purple-300 to-purple-600",
  },
  {
    name: "Blue",
    bgColor: "bg-blue-800/50 dark:bg-blue-400/50",
    selectedColor: "ring-blue-800 dark:ring-blue-400 ring-1",
    textColor: "text-blue-800 dark:text-blue-400 ",
    hoverColor: "hover:ring-1 hover:ring-blue-800 hover:dark:ring-blue-400",
    gradientColor: "from-blue-300 to-blue-600",
  },
  {
    name: "Green",
    bgColor: "bg-green-800/50 dark:bg-green-400/50",
    selectedColor: "ring-green-800 dark:ring-green-400 ring-1",
    textColor: "text-green-800 dark:text-green-400 ",
    hoverColor: "hover:ring-1 hover:ring-green-800 hover:dark:ring-green-400",
    gradientColor: "from-green-300 to-green-600",
  },
  {
    name: "Orange",
    bgColor: "bg-orange-800/50 dark:bg-orange-400/50",
    selectedColor: "ring-orange-800 dark:ring-orange-400 ring-1",
    textColor: "text-orange-800 dark:text-orange-400",
    hoverColor: "hover:ring-1 hover:ring-orange-800 hover:dark:ring-orange-400",
    gradientColor: "from-orange-300 to-orange-600",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AccentPicker = () => {
  const { accent, setAccent } = useStateContext();

  useEffect(() => {
    if (accent) {
      localStorage.setItem("accent", JSON.stringify(accent));
    }
  }, [accent]);

  return (
    <RadioGroup value={accent} onChange={setAccent}>
      <RadioGroup.Label
        className={classNames("block text-sm font-medium", accent?.textColor)}
      >
        Choose an accent color
      </RadioGroup.Label>
      <div className="mt-4 flex items-center space-x-3">
        {colors.map((color) => (
          <RadioGroup.Option
            key={color.name}
            value={color}
            className={({ active, checked }) =>
              classNames(
                accent.name === color.name ? color.selectedColor : "",
                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
              )
            }
          >
            <RadioGroup.Label as="span" className="sr-only">
              {color.name}
            </RadioGroup.Label>
            <span
              aria-hidden="true"
              className={classNames(
                color.bgColor,
                "h-8 w-8 rounded-full border border-black border-opacity-10"
              )}
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default AccentPicker;
