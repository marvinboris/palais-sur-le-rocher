import {
  AdjustmentsHorizontalIcon,
  ComputerDesktopIcon,
  UserPlusIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import { useSideDrawerContext } from "../../../../../app/contexts/side-drawer";
import { resourceIcon } from "../../../../../app/helpers/utils";
import { useAppSelector, useWindowSize } from "../../../../../app/hooks";
import ResourceType from "../../../../../app/types/resource";

import { selectAuth } from "../../../../../features/auth/authSlice";

import Logo from "../../../../ui/logo";

import NavItem from "./nav-item";

export default function SideDrawer() {
  const { width } = useWindowSize();
  const { open, setOpen } = useSideDrawerContext();
  const { content } = useContentContext();

  const { role, data } = useAppSelector(selectAuth);

  const {
    cms: { backend: cms },
  } = content!;

  const resources = Object.keys(cms.sidebar.menu).filter(
    (resource) =>
      !["admins", "dashboard", "cms", "notifications", "settings"].includes(
        resource
      )
  );

  return (
    <Transition
      show={open || (width !== undefined && width > 768)}
      as={Fragment}
    >
      <div className="fixed inset-0 top-0 z-40 h-screen md:relative md:block">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute z-0 flex h-full w-[280px] flex-col bg-white px-5 pt-[18px] pb-[95px] after:absolute after:inset-0 after:-z-10 after:bg-secondary-500/10 dark:bg-secondary-900 dark:after:bg-secondary-400/5 md:relative">
            <div className="mb-[113px] flex h-[79px] items-center">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            <div className="flex flex-1 flex-col pr-4 overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-primary-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              <div>
                <div className="space-y-3">
                  <NavItem
                    icon={ComputerDesktopIcon}
                    href={`/${role}/dashboard`}
                  >
                    {cms.sidebar.menu.dashboard.title}
                  </NavItem>
                  {role === "admin" && (
                    <NavItem icon={UserPlusIcon} href={`/${role}/admins`}>
                      {cms.sidebar.menu.admins.title}
                    </NavItem>
                  )}
                  {data &&
                    "role" in data &&
                    data.role.features
                      .filter(({ prefix }) =>
                        resources.includes(prefix.split("-").join("_"))
                      )
                      .map(({ prefix }) => {
                        const resource = prefix.split("-").join("_");
                        return (
                          <NavItem
                            key={JSON.stringify(
                              cms.sidebar.menu[resource as ResourceType]
                            )}
                            icon={resourceIcon(resource as ResourceType)}
                            href={`/${role}/${prefix}`}
                          >
                            {cms.sidebar.menu[resource as ResourceType].title}
                          </NavItem>
                        );
                      })}
                  {(role === "admin" ||
                    (data &&
                      "role" in data &&
                      data.role.features.find(
                        ({ prefix }) => prefix === "cms"
                      ))) && (
                    <NavItem
                      icon={Cog8ToothIcon}
                      href={`/${role}/cms`}
                      items={Object.entries(cms.sidebar.menu.cms)
                        .filter(([key]) => !["icon", "title"].includes(key))
                        .map(([key, label]) => ({ href: `/${key}`, label }))}
                    >
                      {cms.sidebar.menu.cms.title}
                    </NavItem>
                  )}
                  <NavItem
                    icon={AdjustmentsHorizontalIcon}
                    href={`/${role}/settings`}
                  >
                    {cms.sidebar.menu.settings.title}
                  </NavItem>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute inset-0 -z-10 bg-black/30 backdrop-blur-sm backdrop-filter"
            onClick={() => setOpen(false)}
          />
        </Transition.Child>
      </div>
    </Transition>
  );
}
