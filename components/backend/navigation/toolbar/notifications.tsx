import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { useContentContext } from "../../../../app/contexts/content";
import {
  classNames,
  convertDate,
  convertTime,
} from "../../../../app/helpers/utils";
import { useAppSelector } from "../../../../app/hooks";
import { NotificationInterface } from "../../../../app/models/notification";

import { selectAuth } from "../../../../features/auth/authSlice";

export default function Notifications() {
  const { role, data } = useAppSelector(selectAuth);

  const { content } = useContentContext();
  const {
    cms: {
      backend: { header },
    },
  } = content!;

  const account = data!;
  const notifications = (
    (account.notifications as {
      notification: NotificationInterface;
      readAt?: Date;
    }[]) || []
  ).filter(({ readAt }) => !readAt);

  return (
    <div
      className={classNames(
        "group relative z-0 mr-3",
        notifications.length > 0
          ? "after:absolute after:top-0 after:right-0 after:block after:h-[12.72px] after:w-[12.72px] after:rounded-full after:bg-yellow"
          : ""
      )}
    >
      <BellIcon className="w-[31px] cursor-pointer" />

      <div className="absolute top-full right-0 origin-top-right scale-0 pt-1 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
        <div className="w-72 truncate rounded-[14px] border-[0.25px] bg-white py-1.5 shadow-sm dark:border-white/10 dark:bg-secondary-800">
          <div className="mb-2 px-3 text-lg font-semibold text-secondary-800 dark:text-secondary-200">
            {header.notifications}
          </div>

          <div className="space-y-2 divide-y divide-secondary-300 px-1.5 dark:divide-white/20">
            {notifications.length === 0 ? (
              <div className="px-3 py-2 text-sm text-secondary-500 dark:text-secondary-400">
                {header.no_notification}
              </div>
            ) : (
              <>
                {notifications.map(({ notification }) => (
                  <Link
                    href={`/${role}/notifications/${notification.id}`}
                    key={`notification-${notification.id}`}
                    className="flex cursor-pointer items-center space-x-2 rounded-lg px-3 py-2 hover:bg-secondary-100 dark:hover:bg-secondary-900"
                  >
                    <div className="mt-1.5 h-2 w-2 flex-none self-start rounded-full bg-primary-600" />

                    <div className="flex-1">
                      <div className="whitespace-normal leading-tight line-clamp-2">
                        <div className="font-semibold">
                          {notification.message}
                        </div>
                      </div>

                      {notification.createdAt ? (
                        <div className="mt-1.5 text-xs leading-none text-secondary-600 dark:text-secondary-400">
                          {convertDate(notification.createdAt)} -{" "}
                          {convertTime(notification.createdAt)}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">
                      {notification.type === "" ? (
                        <BellIcon className="w-4" />
                      ) : (
                        <BellIcon className="w-4" />
                      )}
                    </div>
                  </Link>
                ))}

                <div className="px-1 pt-3 pb-1 text-sm">
                  <Link
                    href={`/${role}/notifications`}
                    className="font-semibold text-primary-600"
                  >
                    {header.view_all_notifications}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
