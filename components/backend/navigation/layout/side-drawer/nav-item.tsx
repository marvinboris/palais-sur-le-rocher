import { ComponentProps, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSideDrawerContext } from "../../../../../app/contexts/side-drawer";
import { classNames } from "../../../../../app/helpers/utils";
import { useWindowSize } from "../../../../../app/hooks";

interface NavItemProps {
  href: string;
  children: ReactNode;
  main?: boolean;
  items?: { href: string; label: string }[];
  icon: (props: ComponentProps<"svg">) => JSX.Element;
}

export default function NavItem({
  href,
  icon: Icon,
  main,
  children,
  items,
}: NavItemProps) {
  const router = useRouter();
  const active = router.asPath.startsWith(href);

  const { width } = useWindowSize();
  const { setOpen } = useSideDrawerContext();

  const [navItemOpen, setNavItemOpen] = useState(false);

  const hideSideDrawer = () => {
    if (width !== undefined && width < 768) setOpen(false);
  };

  return items ? (
    <div>
      <button
        onClick={() => setNavItemOpen((status) => !status)}
        className={classNames(
          "flex w-full items-center truncate rounded-[12.5106px] transition-all duration-200",
          main
            ? "font-display relative scale-[0.87] bg-primary-600 py-4 font-medium text-white shadow-lg after:absolute after:inset-y-3 after:left-2 after:w-1 after:rounded-xl after:bg-orange after:shadow-md"
            : active
            ? "mr-6 bg-primary-600/10 py-3 px-[11px] font-medium text-primary-600"
            : "px-[11px] text-secondary-700 hover:text-primary-600 dark:text-secondary-300"
        )}
      >
        <div
          className={classNames(
            main ? "mr-[11.68px] pl-[29.19px]" : "mr-[22px]"
          )}
        >
          <Icon
            className={classNames(
              main ? "w-4 text-white/20" : "w-6 text-primary-600/50"
            )}
          />
        </div>

        <div>{children}</div>
      </button>

      <div
        className={classNames(
          "relative overflow-hidden text-sm transition-all duration-200",
          navItemOpen ? "max-h-96 py-2" : "max-h-0"
        )}
      >
        <div className="absolute -top-[18px] left-[23px] h-full w-[1px] opacity-20">
          <div className="h-full w-full bg-primary-600" />
        </div>

        <div className="space-y-2.5">
          {items.map(({ href: _href, label }) => (
            <div
              key={`nav-item-${href}-items-${_href}`}
              className="relative ml-[64px]"
            >
              <div className="absolute top-1/2 -left-[39px] h-[1px] w-7 -translate-y-1/2 bg-primary-600/20" />

              <Link
                onClick={hideSideDrawer}
                className={classNames(
                  router.asPath.startsWith(href + _href)
                    ? "font-medium text-primary-600"
                    : "",
                  "transition-all duration-200"
                )}
                href={href + _href}
              >
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Link
      href={href}
      onClick={hideSideDrawer}
      className={classNames(
        "flex w-full items-center truncate rounded-[12.5106px] transition-all duration-200",
        main
          ? "font-display relative scale-[0.87] bg-primary-600 py-4 font-medium text-white shadow-lg after:absolute after:inset-y-3 after:left-2 after:w-1 after:rounded-xl after:bg-orange after:shadow-md"
          : active
          ? "mr-6 bg-primary-600/10 py-3 px-[11px] font-medium text-primary-600"
          : "px-[11px] text-secondary-700 hover:text-primary-600 dark:text-secondary-300"
      )}
    >
      <div
        className={classNames(main ? "mr-[11.68px] pl-[29.19px]" : "mr-[22px]")}
      >
        <Icon
          className={classNames(
            main ? "w-4 text-white/20" : "w-6 text-primary-600/50"
          )}
        />
      </div>

      <div>{children}</div>
    </Link>
  );
}
