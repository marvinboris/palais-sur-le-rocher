import React, { type ReactNode } from "react";

import { classNames } from "../../../../app/helpers/utils";
import Status from "../../../../app/types/enums/status";

type ButtonProps = React.ComponentProps<"button"> & {
  color?: string;
  size?: "" | "sm" | "lg" | "xl";
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  children: ReactNode;
  onClick?: () => void;
  status?: Status;
};

export default function Button({
  color = "primary",
  size = "",
  icon,
  children,
  status,
  onClick,
}: ButtonProps) {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className={classNames(
        `btn btn-${color} group relative`,
        icon ? "btn-icon" : "px-6",
        size === "sm" ? "h-10 px-4" : ""
      )}
    >
      <span className={classNames(size === "sm" ? "" : "mr-2 font-bold")}>
        {status ? (
          <>
            <div
              className={classNames(
                status === Status.LOADING ? "opacity-100" : "opacity-0",
                "absolute top-1/2 left-1/2 z-0 -ml-4 -mt-4 h-8 w-8 animate-spin rounded-full border-[2px] border-white border-t-transparent transition-all duration-200"
              )}
            />
            <div
              className={classNames(
                status === Status.LOADING ? "opacity-0" : "opacity-100",
                "relative z-10"
              )}
            >
              {children}
            </div>
          </>
        ) : (
          children
        )}
      </span>

      {Icon && (
        <span
          className={classNames(
            status && status === Status.LOADING ? "opacity-0" : "opacity-100",
            "inline-flex items-center transition-all duration-200"
          )}
        >
          {size !== "sm" && (
            <div>
              <div
                className={classNames(
                  color === "white" ? "bg-primary-600/40" : "bg-white/40",
                  "mr-[5px] h-1 w-1 rounded-full"
                )}
              />
            </div>
          )}

          <div>
            <Icon
              className={classNames(
                color === "white"
                  ? "text-primary-600/40 group-hover:text-primary-600"
                  : "text-white/40 group-hover:text-white",
                "w-6 transition-all duration-200"
              )}
            />
          </div>
        </span>
      )}
    </button>
  );
}
