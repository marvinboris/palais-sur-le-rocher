import React, { ComponentProps, ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { classNames } from "../../../../app/helpers/utils";

interface NavItemProps {
  exact?: boolean;
  href: string;
  children: ReactNode;
  icon?: (props: ComponentProps<"svg">) => JSX.Element;
}

export default function NavItem({
  href,
  icon: Icon,
  exact,
  children,
}: NavItemProps) {
  const router = useRouter();
  const active = exact
    ? router.pathname === href
    : router.pathname.startsWith(href);

  const content = (
    <>
      {Icon && (
        <span className="mr-[6.65px]">
          <Icon className="w-4 text-primary-600/20" />
        </span>
      )}

      <span>{children}</span>
    </>
  );

  return href.startsWith("#") ? (
    <a
      href={href}
      className={classNames(
        active
          ? "text-primary-600"
          : "text-secondary-700 hover:text-primary-600",
        "inline-flex items-center truncate text-sm font-semibold leading-6 transition-all duration-200 dark:text-secondary-200 dark:hover:text-primary-600"
      )}
    >
      {content}
    </a>
  ) : (
    <Link
      href={href}
      className={classNames(
        active
          ? "text-primary-600"
          : "text-secondary-700 hover:text-primary-600",
        "inline-flex items-center truncate text-sm font-semibold leading-6 transition-all duration-200 dark:text-secondary-200 dark:hover:text-primary-600"
      )}
    >
      {content}
    </Link>
  );
}
