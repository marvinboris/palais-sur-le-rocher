import {
  ChatBubbleOvalLeftEllipsisIcon,
  WrenchIcon,
  HomeIcon,
  PhotoIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ReactElement, ReactNode, useEffect } from "react";

import { useContentContext } from "../../app/contexts/content";
import { classNames } from "../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Status from "../../app/types/enums/status";

import Layout, { Head } from "../../components/backend/navigation/layout";
import PageTitle from "../../components/backend/ui/title/page";
import Alert from "../../components/frontend/ui/alert";

import { selectAuth } from "../../features/auth/authSlice";
import { dashboard, selectBackend } from "../../features/backend/backendSlice";

import { NextPageWithLayout } from "../_app";

interface StatCardProps {
  color: "sky" | "blue" | "yellow" | "orange";
  title: string;
  children: ReactNode;
}

const StatCard = ({ color, title, children }: StatCardProps) => (
  <div
    className={classNames(
      color === "blue"
        ? "after:bg-blue/[.15]"
        : color === "sky"
        ? "after:bg-sky/[.15]"
        : color === "orange"
        ? "after:bg-orange/20"
        : "after:bg-yellow text-white",
      "bg-white dark:bg-secondary-800  after:absolute after:inset-0 after:-z-10 font-display relative overflow-hidden z-0 flex h-[156.88px] flex-col rounded-[25px] py-[23px] pl-[26px] pr-[22px] md:h-[100.92px] md:rounded-[12.625px] md:py-[13.25px] md:pl-[20.18px] md:pr-[10.72px]"
    )}
  >
    <div className="text-lg font-medium md:text-sm">{title}</div>

    <div className="pt-[14px] md:pt-[8.6px]">
      <div
        className={classNames(
          color === "yellow" ? "bg-white/30" : "bg-secondary-500/10",
          "block h-[3.15385px] w-[55px] rounded-xl md:w-[17px]"
        )}
      />
    </div>

    <div>{children}</div>
  </div>
);

const ManagerDashboardPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectAuth);
  const { status, data, message } = useAppSelector(selectBackend);

  const { content } = useContentContext();

  useEffect(() => {
    if (status === Status.IDLE && !(data && data.blocks))
      dispatch(dashboard(role!));
  }, [data, dispatch, role, status]);

  const {
    cms: {
      global: { app_name },
      backend: {
        pages: {
          dashboard: {
            [role as "admin" | "user"]: { title, subtitle, blocks },
          },
        },
      },
    },
  } = content!;

  return (
    <>
      <Head
        link={`/${role}/dashboard`}
        title={`${title} | ${app_name}`}
        description={`${app_name}: Votre tableau de bord personnel.`}
      />
      <main className="flex-1">
        <PageTitle icon={HomeIcon} title={title} subtitle={subtitle} />

        <div className="px-[33px] pt-[29px] pb-[54px] xl:px-[42px] xl:pt-[47px]">
          {message && (
            <Alert color={message.type} className="mb-4">
              {message.content}
            </Alert>
          )}
          <div className="mb-[51px] grid gap-2.5 md:grid-cols-2 lg:mb-[35.08px] xl:grid-cols-4">
            <StatCard color="orange" title={blocks.users}>
              <div className="flex items-end justify-between">
                <div className="pb-[7px] md:pb-[5px]">
                  <span className="text-3xl font-bold md:text-lg">
                    {data && data.blocks && data.blocks.users}
                  </span>
                </div>

                <div>
                  <UserGroupIcon className="w-20 text-orange/20 md:w-11" />
                </div>
              </div>
            </StatCard>

            <StatCard color="blue" title={blocks.events}>
              <div className="flex items-end justify-between">
                <div className="pb-[7px] md:pb-[5px]">
                  <span className="text-3xl font-bold md:text-lg">
                    {data && data.blocks && data.blocks.events}
                  </span>
                </div>

                <div>
                  <WrenchIcon className="w-20 text-blue/20 md:w-11" />
                </div>
              </div>
            </StatCard>

            <StatCard color="sky" title={blocks.testimonials}>
              <div className="flex items-end justify-between">
                <div className="pb-[7px] md:pb-[5px]">
                  <span className="text-3xl font-bold md:text-lg">
                    {data && data.blocks && data.blocks.testimonials}
                  </span>
                </div>

                <div>
                  <ChatBubbleOvalLeftEllipsisIcon className="w-20 text-sky/20 md:w-11" />
                </div>
              </div>
            </StatCard>

            <StatCard color="yellow" title={blocks.images}>
              <div className="flex items-end justify-between">
                <div className="pb-[7px] md:pb-[5px]">
                  <span className="text-3xl font-bold md:text-lg">
                    {data && data.blocks && data.blocks.images}
                  </span>
                </div>

                <div>
                  <PhotoIcon className="w-20 text-black/10 md:w-11" />
                </div>
              </div>
            </StatCard>
          </div>
        </div>
      </main>
    </>
  );
};

ManagerDashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerDashboardPage;
