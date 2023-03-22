import {
  EnvelopeOpenIcon,
  EnvelopeIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactElement } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { convertDate, convertTime, updateObject } from "../../../app/helpers/utils";
import { useAppSelector } from "../../../app/hooks";
import { NotificationInterface } from "../../../app/models/notification";
import ResourceType from "../../../app/types/resource";

import Layout from "../../../components/backend/navigation/layout";
import ManageRead from "../../../components/backend/ui/page/read";

import { selectAuth } from "../../../features/auth/authSlice";

import { NextPageWithLayout } from "../../_app";

const ManagerNotificationsPage: NextPageWithLayout = () => {
  const resource: ResourceType = "notifications";

  const { role, data: account } = useAppSelector(selectAuth);

  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        components: {
          list: { action },
        },
        pages: {
          [resource]: { form },
        },
      },
    },
  } = content!;

  const notifications =
    (account!.notifications as {
      notification: NotificationInterface;
      readAt?: Date;
    }[]) || [];

  const data = notifications.map(({ notification, readAt }) =>
    updateObject(notification, {
      created_at: <>{convertDate(notification.createdAt!)} {convertTime(notification.createdAt!)}</>,
      readAt: readAt ? (
        <EnvelopeOpenIcon className="w-6 opacity-50" />
      ) : (
        <EnvelopeIcon className="w-6" />
      ),
      action: (
        <Link href={`/${role}/notifications/${notification.id}`}>
          <EyeIcon className="w-5 text-green" />
        </Link>
      ),
    })
  );

  const fields = [
    { name: form.read, key: "readAt" },
    { name: form.message, key: "message", className: "w-full" },
    { name: form.type, key: "type" },
    { name: form.created_at, key: "created_at" },
    { name: action, key: "action", fixed: true },
  ];

  return <ManageRead data={data} fields={fields} resource={resource} />;
};

ManagerNotificationsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerNotificationsPage;
