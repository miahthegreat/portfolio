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
  const { font, setFont, accent } = useStateContext();

  useEffect(() => {
    if (font) {
      localStorage.setItem("font", JSON.stringify(font));
    }
  });

  return (
    <RadioGroup value={font} onChange={setFont}>
      <RadioGroup.Label className="sr-only"> Font Family </RadioGroup.Label>
      <RadioGroup.Label
        className={classNames("block text-sm font-medium", accent.textColor)}
      >
        Choose a font
      </RadioGroup.Label>
      <div className="mt-4 space-y-4">
        {fonts.map((item) => (
          <RadioGroup.Option
            key={item.name}
            value={item}
            className={({ checked, active }) =>
              classNames(
                item.name === font.name
                  ? "cursor-not-allowed hover:ring-0"
                  : accent.hoverColor,
                "cursor relative block cursor-pointer rounded-lg bg-zinc-50 px-6 py-4 shadow-lg focus:outline-none dark:bg-zinc-900 sm:flex sm:justify-between"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        "font-medium",
                        item.name === "Fira" ? `font-fira` : "",
                        item.name === "Syne Mono" ? "font-plexmono" : "",
                        item.name === "Poppins" ? "font-poppins" : "",
                        item.name === font.name ? accent.textColor : ""
                      )}
                    >
                      {item.name}
                    </RadioGroup.Label>
                  </span>
                </span>
                <span
                  className={classNames(
                    "pointer-events-none absolute -inset-px rounded-lg",
                    item.name === font.name ? accent.selectedColor : ""
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
