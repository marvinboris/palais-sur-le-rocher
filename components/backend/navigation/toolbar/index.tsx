import {
  AdjustmentsHorizontalIcon,
  ArrowRightOnRectangleIcon,
  Bars3BottomLeftIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useContentContext } from "../../../../app/contexts/content";

import { useSideDrawerContext } from "../../../../app/contexts/side-drawer";
import { useThemeContext } from "../../../../app/contexts/theme";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import Theme from "../../../../app/types/enums/theme";

import { logout, selectAuth } from "../../../../features/auth/authSlice";

import LanguageSelect from "./language-select";
import Logout from "./logout";
import Notifications from "./notifications";

export default function Toolbar() {
  const { open, setOpen } = useSideDrawerContext();
  const { setTheme } = useThemeContext();

  const dispatch = useAppDispatch();
  const { role, data } = useAppSelector(selectAuth);

  const { content } = useContentContext();
  const {
    cms: {
      backend: { header },
    },
  } = content!;

  const account = data!;

  const handleLogout = () => dispatch(logout());

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

  return (
    <header className="sticky top-0 z-30 flex items-center bg-white dark:bg-secondary-800">
      <div className="flex flex-1 items-center pl-[33px] pr-4 md:px-[42px]">
        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          <Bars3BottomLeftIcon className="w-10 text-primary-600" />
        </div>

        <div className="ml-auto flex">
          <div className="mr-5 md:mr-[51.69px]">
            <LanguageSelect />
          </div>
          <Notifications />
          <div className="relative z-0 cursor-pointer after:absolute after:top-0 after:right-0 after:block after:h-[12.72px] after:w-[12.72px] after:rounded-full after:bg-yellow">
            <ChatBubbleOvalLeftEllipsisIcon className="w-[31px]" />
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
        </div>
      </div>

      <div className="flex h-[111px] items-center justify-between border-secondary-700/10 pr-9 md:h-[86px] md:w-[300px] md:border-l md:pl-3">
        <div className="hidden md:block">
          <div className="mb-1 text-lg font-medium">{account.name}</div>
        </div>

        <div className="group relative">
          <Image
            width={1920}
            height={1920}
            src="/images/backend/user-pic-wrapper.svg"
            alt="User pic wrapper"
            className="w-16"
          />

          <div className="absolute top-1/2 left-1/2 -ml-[1px] h-11 w-11 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
            {account.photo && (
              <Image
                width={1920}
                height={1920}
                src={account.photo}
                alt="User pic"
                className="image-cover absolute inset-0 scale-[2]"
              />
            )}
          </div>

          <div className="absolute top-full right-0 origin-top-right scale-0 pt-1.5 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            <div className="w-40 rounded-[14px] bg-white px-[7px] pt-[7px] pb-6 text-sm shadow-sm dark:bg-secondary-800">
              <div className="space-y-2.5 px-[13px]">
                <Link
                  href={`/${role}/settings`}
                  className="flex cursor-pointer items-center space-x-[7px]"
                >
                  <span>
                    <AdjustmentsHorizontalIcon className="w-4 opacity-20" />
                  </span>
                  <span>{header.settings}</span>
                </Link>
                <Logout action={handleLogout}>
                  <div className="flex cursor-pointer items-center space-x-[7px] text-red">
                    <span>
                      <ArrowRightOnRectangleIcon className="w-4" />
                    </span>
                    <span className="font-bold">{header.logout}</span>
                  </div>
                </Logout>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
