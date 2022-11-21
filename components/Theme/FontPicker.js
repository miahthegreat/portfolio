import { RadioGroup } from "@headlessui/react";
import { useEffect } from "react";
import { useStateContext } from "../../context/StateContext";

const fonts = [
  {
    name: "Fira",
  },
  {
    name: "Poppins",
  },
  {
    name: "Syne Mono",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FontPicker = () => {
  const { font, setFont } = useStateContext();

  useEffect(() => {
    if (font) {
      localStorage.setItem("font", JSON.stringify(font));
    }
  });

  return (
    <RadioGroup value={font} onChange={setFont}>
      <RadioGroup.Label className="sr-only"> Font Family </RadioGroup.Label>
      <RadioGroup.Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Choose a font
      </RadioGroup.Label>
      <div className="mt-4 space-y-4">
        {fonts.map((item) => (
          <RadioGroup.Option
            key={item.name}
            value={item}
            className={({ checked, active }) =>
              classNames(
                checked
                  ? "border-transparent"
                  : "border-gray-300 dark:border-zinc-700",
                active || item.name === font.name
                  ? "ring-2 ring-zinc-500 dark:ring-zinc-100"
                  : "",
                "relative block cursor-pointer rounded-lg bg-zinc-50 px-6 py-4 shadow-lg focus:outline-none dark:bg-zinc-900 sm:flex sm:justify-between"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label
                      as="span"
                      className={`font-medium text-zinc-900 dark:text-zinc-50 ${
                        item.name === "Fira" ? "font-fira" : ""
                      } ${item.name === "Syne Mono" ? "font-plexmono" : ""} ${
                        item.name === "Poppins" ? "font-poppins" : ""
                      }
                      `}
                    >
                      {item.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      <div></div>
                    </RadioGroup.Description>
                  </span>
                </span>
                <RadioGroup.Description
                  as="span"
                  className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right"
                >
                  <div></div>
                </RadioGroup.Description>
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-zinc-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default FontPicker;
