import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

const solutions = [
  {
    name: "Home",
    description: "Learn about tips, product updates and company culture.",
    href: "/#",
  },
  {
    name: "Blog",
    description:
      "Get all of your questions answered in our forums of contact support.",
    href: "/blog",
  },
  {
    name: "Skills",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/#skills",
  },
  {
    name: "Projects",
    description:
      "Check out webinars with experts and learn about our annual conference.",
    href: "/#projects",
  },
  {
    name: "Contact",
    description: "Understand how we take your privacy seriously.",
    href: "/#contact",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MobilePopover() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open
                ? "text-zinc-900 dark:text-zinc-50"
                : "text-zinc-500 dark:text-zinc-300",
              "group inline-flex items-center gap-2 rounded-md bg-transparent p-2 text-base font-medium hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-500"
            )}
          >
            <span>Menu</span>
            <ChevronDownIcon
              className={classNames(
                open ? "rotate-180 text-gray-600" : "text-gray-400",
                "h-5 w-5 transition duration-200 group-hover:text-gray-500"
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
            <Popover.Panel className="absolute left-1/2 z-10 mt-2 w-screen max-w-xs -translate-x-11 transform px-2 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid grid-cols-2 gap-6 bg-zinc-50 px-3 py-2 dark:bg-zinc-800 sm:gap-8 sm:p-4">
                  {solutions.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="-m-3 block rounded-md p-3 transition duration-150 ease-in-out hover:bg-zinc-300 dark:hover:bg-zinc-700">
                        <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">
                          {item.name}
                        </p>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
