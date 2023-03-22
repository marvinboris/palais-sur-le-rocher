import { useRouter } from "next/router";
import { ReactElement } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { resourceIcon } from "../../../app/helpers/utils";
import { useAppSelector } from "../../../app/hooks";
import { NotificationInterface } from "../../../app/models/notification";
import ResourceType from "../../../app/types/resource";

import Layout, { Head } from "../../../components/backend/navigation/layout";
import Form from "../../../components/backend/ui/form";
import PageTitle from "../../../components/backend/ui/title/page";
import { selectAuth } from "../../../features/auth/authSlice";

const ManagerNotificationPage = () => {
  const resource: ResourceType = "notifications";

  const { role, data: account } = useAppSelector(selectAuth);

  const {
    query: { id },
  } = useRouter();

  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        pages: {
          [resource]: { title, show, form },
        },
      },
    },
  } = content!;

  const notifications =
    (account!.notifications as {
      notification: NotificationInterface;
      readAt?: Date;
    }[]) || [];

  const notification = notifications.find((n) => n.notification.id === id);

  return notification ? (
    <>
      <Head
        link={`/${role}/notifications/${id}`}
        title={`${notification.notification.message} | ${title} | ${process.env.APP_NAME}`}
        description={`${process.env.APP_NAME} ${notification.notification.message}`}
      />

      <PageTitle icon={resourceIcon(resource)} title={title} subtitle={show} />

      <div className="px-[33px] pt-[29px] pb-[54px] md:px-[42px] md:pt-[47px]">
        <Form
          disabled
          title={notification.notification.message}
          subtitle={notification.notification.type}
          icon={resourceIcon("notifications")}
        >
          {notification.notification.type}
        </Form>
      </div>
    </>
  ) : null;
};

ManagerNotificationPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerNotificationPage;
