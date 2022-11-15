import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useStateContext } from "../../context/StateContext";

const colors = [
  { name: "Pink", bgColor: "bg-pink-500", selectedColor: "ring-pink-500" },
  {
    name: "Purple",
    bgColor: "bg-purple-500",
    selectedColor: "ring-purple-500",
  },
  { name: "Blue", bgColor: "bg-blue-500", selectedColor: "ring-blue-500" },
  { name: "Green", bgColor: "bg-green-500", selectedColor: "ring-green-500" },
  {
    name: "Yellow",
    bgColor: "bg-yellow-500",
    selectedColor: "ring-yellow-500",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AccentPicker = () => {
  const { accent, setAccent } = useStateContext();

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
                active && checked ? "ring ring-offset-1" : "",
                !active && checked ? "ring-2" : "",
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