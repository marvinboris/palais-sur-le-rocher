import { ReactNode, useEffect, useState } from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";

import SideDrawerContext from "../../../../app/contexts/side-drawer";
import { useAppSelector } from "../../../../app/hooks";
import { selectAuth } from "../../../../features/auth/authSlice";

import Footer from "../footer";
import Toolbar from "../toolbar";

import SideDrawer from "./side-drawer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { token } = useAppSelector(selectAuth);

  useEffect(() => {
    const isAuth = localStorage.getItem("token") !== null;
    if ((!token && isAuth) || !isAuth) router.push("/");
  }, [token, router]);

  return token ? (
    <SideDrawerContext.Provider value={{ open, setOpen }}>
      <div className="font-body relative flex h-screen overflow-hidden">
        <SideDrawer />

        <div className="flex h-screen flex-1 flex-col overflow-y-auto bg-secondary-100 dark:bg-secondary-900">
          <Toolbar />
          <div className="relative flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </div>
    </SideDrawerContext.Provider>
  ) : null;
}

export interface PageParams {
  link: string;
  title: string;
  description: string;
}

export const Head = ({ link, title, description }: PageParams) => (
  <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={link} />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={link} />

    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
  </NextHead>
);
