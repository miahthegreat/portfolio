import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import FontPicker from "./FontPicker";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FontMenu = () => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open
                ? "text-zinc-900 dark:text-zinc-50"
                : "text-zinc-500 dark:text-zinc-400",
              "group inline-flex items-center rounded-md bg-transparent p-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:hover:text-zinc-50"
            )}
          >
            <span>Change Font</span>
            <ChevronDownIcon
              className={classNames(
                open ? "rotate-180 text-gray-600" : "text-gray-400",
                "ml-2 h-5 w-5 transform transition-transform duration-200 ease-in group-hover:text-gray-500 dark:group-hover:text-zinc-50"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -left-[10%] z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-zinc-100 p-4 dark:bg-zinc-800 sm:gap-8">
                  <FontPicker />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default FontMenu;
