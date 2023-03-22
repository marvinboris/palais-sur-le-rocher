import {
  AdjustmentsHorizontalIcon,
  ComputerDesktopIcon,
  UserPlusIcon,
  Cog8ToothIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import { useSideDrawerContext } from "../../../../../app/contexts/side-drawer";
import { resourceIcon } from "../../../../../app/helpers/utils";
import { useAppSelector, useWindowSize } from "../../../../../app/hooks";
import { NotificationInterface } from "../../../../../app/models/notification";
import ResourceType from "../../../../../app/types/resource";

import { selectAuth } from "../../../../../features/auth/authSlice";

import Logo from "../../../../ui/logo";

import NavItem from "./nav-item";

const Group = (props: { title: string; children?: ReactNode }) => (
  <div>
    <GroupTitle>{props.title}</GroupTitle>
    <div className="space-y-3">{props.children}</div>
  </div>
);

const GroupTitle = (props: { children?: ReactNode }) => (
  <div className="mb-1 px-3 py-2 text-lg font-semibold uppercase">
    {props.children}
  </div>
);

const UserNavItem = (props: { resource: ResourceType }) => {
  const { content } = useContentContext();

  const { role, data } = useAppSelector(selectAuth);

  const {
    cms: { backend: cms },
  } = content!;

  const feature =
    data &&
    "role" in data &&
    data.role.features.find(
      ({ prefix }) => prefix.split("-").join("_") === props.resource
    );

  if (!feature) return null;

  const resource = feature.prefix.split("-").join("_");
  return (
    <NavItem
      key={JSON.stringify(cms.sidebar.menu[resource as ResourceType])}
      icon={resourceIcon(resource as ResourceType)}
      href={`/${role}/${feature.prefix}`}
    >
      {cms.sidebar.menu[resource as ResourceType].title}
    </NavItem>
  );
};

export default function SideDrawer() {
  const { width } = useWindowSize();
  const { open, setOpen } = useSideDrawerContext();
  const { content } = useContentContext();

  const { role, data } = useAppSelector(selectAuth);

  const {
    cms: { backend: cms },
  } = content!;

  const account = data!;
  const notifications = (
    (account.notifications as {
      notification: NotificationInterface;
      readAt?: Date;
    }[]) || []
  ).filter(({ readAt }) => !readAt);

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

            <div className="scrollbar-app flex flex-1 flex-col overflow-auto pr-6">
              <div className="space-y-6">
                <Group title="MENU">
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
                  <UserNavItem resource="users" />
                  <UserNavItem resource="roles" />
                  <UserNavItem resource="features" />
                </Group>

                <Group title="CONTENU">
                  <UserNavItem resource="categories" />
                  <UserNavItem resource="publications" />
                  <UserNavItem resource="events" />
                  <UserNavItem resource="lessons" />
                  <UserNavItem resource="images" />
                  <UserNavItem resource="testimonials" />
                </Group>

                <Group title="FINANCES">
                  <UserNavItem resource="donations" />
                  <UserNavItem resource="tithes" />
                  <UserNavItem resource="transactions" />
                </Group>

                <Group title="EFFECTIFS">
                  <UserNavItem resource="staff_members" />
                  <UserNavItem resource="members" />
                  <UserNavItem resource="subscribers" />
                  <UserNavItem resource="ministries" />
                </Group>

                <Group title="CONFIG">
                  <UserNavItem resource="methods" />
                  {role === "admin" ||
                  (data &&
                    "role" in data &&
                    data.role.features.find(
                      ({ prefix }) => prefix === "cms"
                    )) ? (
                    <NavItem
                      icon={Cog8ToothIcon}
                      href={`/${role}/cms`}
                      items={Object.entries(cms.sidebar.menu.cms)
                        .filter(([key]) => !["icon", "title"].includes(key))
                        .map(([key, label]) => ({ href: `/${key}`, label }))}
                    >
                      {cms.sidebar.menu.cms.title}
                    </NavItem>
                  ) : null}
                  <NavItem icon={BellIcon} href={`/${role}/notifications`}>
                    <>
                      {cms.sidebar.menu.notifications.title}{" "}
                      {notifications.length > 0 ? (
                        <div className="relative -top-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-green text-xs font-bold leading-none text-white">
                          {notifications.length}
                        </div>
                      ) : null}
                    </>
                  </NavItem>
                  <NavItem
                    icon={AdjustmentsHorizontalIcon}
                    href={`/${role}/settings`}
                  >
                    {cms.sidebar.menu.settings.title}
                  </NavItem>
                </Group>
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
