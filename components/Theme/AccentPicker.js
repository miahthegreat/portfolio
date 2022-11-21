import { RadioGroup } from "@headlessui/react";
import { useEffect } from "react";
import { useStateContext } from "../../context/StateContext";

const colors = [
  {
    name: "Pink",
    bgColor: "bg-pink-700 dark:bg-pink-500",
    selectedColor: "ring-pink-700 dark:ring-pink-500 ring-1",
    textColor: "text-pink-700 dark:text-pink-500",
    hoverColor: "hover:ring-2 hover:ring-pink-700 hover:dark:ring-pink-500",
  },
  {
    name: "Purple",
    bgColor: "bg-purple-700 dark:bg-purple-500",
    selectedColor: "ring-purple-700 dark:ring-purple-500 ring-1",
    textColor: "text-purple-700 dark:text-purple-500",
    hoverColor: "hover:ring-2 hover:ring-purple-700 hover:dark:ring-purple-500",
  },
  {
    name: "Blue",
    bgColor: "bg-blue-500",
    selectedColor: "ring-blue-700 dark:ring-blue-500 ring-1",
    textColor: "text-blue-700 dark:text-blue-500 ",
    hoverColor: "hover:ring-2 hover:ring-blue-700 hover:dark:ring-blue-500",
  },
  {
    name: "Green",
    bgColor: "bg-green-700 dark:bg-green-500",
    selectedColor: "ring-green-700 dark:ring-green-500 ring-1",
    textColor: "text-green-700 dark:text-green-500 ",
    hoverColor: "hover:ring-2 hover:ring-green-700 hover:dark:ring-green-500",
  },
  {
    name: "Orange",
    bgColor: "bg-orange-700 dark:bg-orange-500",
    selectedColor: "ring-orange-700 dark:ring-orange-500 ring-1",
    textColor: "text-orange-700 dark:text-orange-500",
    hoverColor: "hover:ring-2 hover:ring-orange-700 hover:dark:ring-orange-500",
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
      <RadioGroup.Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Choose an accent color
      </RadioGroup.Label>
      <div className="mt-4 flex items-center space-x-3">
        {colors.map((color) => (
          <RadioGroup.Option
            key={color.name}
            value={color}
            className={({ active, checked }) =>
              classNames(
                color.selectedColor,
                accent.name === color.name ? `ring ring-offset-1` : "",
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
