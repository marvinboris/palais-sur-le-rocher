import { Popover, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  HomeIcon,
  IdentificationIcon,
  Bars3BottomRightIcon,
  PhoneIcon,
  WrenchIcon,
  ShoppingBagIcon,
  UsersIcon,
  MegaphoneIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { Fragment, ComponentProps } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useContentContext } from "../../../../app/contexts/content";
import { useThemeContext } from "../../../../app/contexts/theme";
import Theme from "../../../../app/types/enums/theme";

import Logo from "../../../ui/logo";

import Dropdown from "./dropdown";
import LanguageSelect from "./language-select";
import NavItem from "./nav-item";

const exploreItems = [
  {
    name: "A propos",
    description:
      "Tout savoir sur le Palais sur le Rocher et la Mission évangélique du secours divin.",
    href: "/explore/about",
    icon: HomeIcon,
  },
  {
    name: "Staff pastoral",
    description: "Retrouvez les leaders de notre commission.",
    href: "/explore/pastoral-staff",
    icon: UsersIcon,
  },
  {
    name: "Objet de la mission",
    description: "La mission qu'a donnée l'Eternel à notre commission.",
    href: "/explore/mission-statement",
    icon: MegaphoneIcon,
  },
  // { name: 'Contact', description: "Venez à nous ou contactez-nous.", href: '/explore/contact', icon: DevicePhoneMobileIcon },
  {
    name: "Blog",
    description: "Retrouvez toutes nos publications.",
    href: "/explore/blog",
    icon: NewspaperIcon,
  },
];

const RenderMobileNavItem = (
  item: {
    name: string;
    href: string;
    icon: (props: ComponentProps<"svg">) => JSX.Element;
  },
  close: () => void
) => {
  const router = useRouter();

  const content = (
    <>
      <item.icon
        className="h-6 w-6 flex-shrink-0 text-primary-600"
        aria-hidden="true"
      />
      <span className="ml-3 text-base font-medium text-secondary-900 dark:text-white">
        {item.name}
      </span>
    </>
  );

  return item.href.startsWith("#") && router.pathname === "/" ? (
    <a
      key={item.name}
      href={item.href}
      onClick={close}
      className="-m-3 flex items-center rounded-md p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800"
    >
      {content}
    </a>
  ) : (
    <Link
      key={item.name}
      href={item.href.startsWith("#") ? `/${item.href}` : item.href}
      onClick={close}
      className="-m-3 flex items-center rounded-md p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800"
    >
      {content}
    </Link>
  );
};

export default function Toolbar() {
  const { content } = useContentContext();
  const { setTheme } = useThemeContext();

  const {
    events,
    ministries,
    cms: {
      global: { app_name },
      frontend: {
        header: { menu },
      },
    },
  } = content!;

  const eventsItems = events.map(({ title, description, link, photo }) => ({
    name: title,
    href: link,
    description,
    photo,
  }));
  const ministriesItems = ministries.map(
    ({ name, link, description, photo }) => ({
      name,
      href: link,
      description,
      photo,
    })
  );

  const toggleDark = () => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      setTheme(Theme.LIGHT);
      localStorage.removeItem("dark");
    } else {
      setTheme(Theme.DARK);
      localStorage.setItem("dark", "enabled");
    }
  };

  const mobileNavItems = [
    { name: menu.home, href: "/", icon: HomeIcon },
    { name: menu.about, href: "/about", icon: IdentificationIcon },
    { name: menu.events, href: "/events", icon: WrenchIcon },
    { name: menu.ministries, href: "/ministries", icon: ShoppingBagIcon },
    { name: menu.contact, href: "/contact", icon: PhoneIcon },
  ];

  return (
    <Popover className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur backdrop-filter dark:bg-secondary-800">
      {({ close }) => (
        <>
          <div className="container">
            <div className="flex items-center py-[12px] md:py-[10px]">
              <div className="flex justify-start">
                <Link href="/" className="cursor-pointer">
                  <span className="sr-only">{app_name}</span>
                  <Logo />
                </Link>
              </div>

              <div className="ml-auto flex items-center space-x-3 md:space-x-5">
                <div className="flex items-center">
                  <Popover.Group
                    as="nav"
                    className="hidden space-x-5 md:flex lg:space-x-8"
                  >
                    <NavItem href="/lessons">Enseignements</NavItem>
                    <Dropdown items={eventsItems} title="Evènements" />
                    <Dropdown items={exploreItems} title="Explorer" />
                    <Dropdown items={ministriesItems} title="Ministères" />
                    <NavItem href="/give">Donner</NavItem>
                  </Popover.Group>
                </div>

                <div className="flex items-center md:ml-6 md:border-l md:border-secondary-200 md:pl-6 dark:md:border-secondary-200/20">
                  <button
                    type="button"
                    id="headlessui-listbox-button-10"
                    className="-m-2 block h-10 p-2"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-headlessui-state=""
                    aria-labelledby="headlessui-listbox-label-9 headlessui-listbox-button-10"
                    onClick={toggleDark}
                  >
                    <span className="dark:hidden">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          className="stroke-secondary-600 dark:stroke-secondary-400"
                        />
                        <path
                          d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                          className="stroke-secondary-600 dark:stroke-secondary-400"
                        />
                      </svg>
                    </span>

                    <span className="hidden dark:inline">
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                          className="fill-transparent"
                        />
                        <path
                          d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                          className="fill-secondary-400 dark:fill-secondary-500"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                          className="fill-secondary-400 dark:fill-secondary-500"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                <div>
                  <LanguageSelect />
                </div>

                <div className="ml-auto md:hidden">
                  <Popover.Button className="-m-2 flex h-10 items-center justify-center rounded-md bg-primary-600/10 p-2 text-primary-600 focus:outline-none">
                    <span className="sr-only">Ouvrir le menu</span>
                    <Bars3BottomRightIcon className="w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
          </div>

          <Popover.Overlay className="fixed inset-x-0 top-0 z-40 h-screen bg-black/20 backdrop-blur-sm backdrop-filter dark:bg-secondary-900/80 md:hidden" />
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel
              focus
              className="fixed inset-x-0 top-0 z-50 md:hidden"
            >
              <div className="absolute top-0 left-0 w-full pt-4">
                <div className="container flex justify-end">
                  <Popover.Button className="-mr-2 flex h-10 items-center justify-center rounded-md p-2 focus:outline-none">
                    <span className="sr-only">Fermer le menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <div className="container mt-[72px]">
                <div className="divide-y-2 divide-secondary-50 rounded-lg bg-white shadow-lg ring-1 ring-black/5 dark:divide-secondary-200/10 dark:bg-secondary-800 dark:ring-white/5">
                  <div className="px-5 py-8">
                    <nav className="grid gap-y-8">
                      {mobileNavItems.map((item) =>
                        RenderMobileNavItem(item, close)
                      )}
                    </nav>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
