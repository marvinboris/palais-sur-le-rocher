import { ComponentProps, ReactNode } from "react";
import { classNames } from "../../../../app/helpers/utils";

type SectionTitleProps = ComponentProps<"div"> & {
  head?: ReactNode;
  title: ReactNode;
  centered?: boolean;
  white?: boolean;
};

export default function SectionTitle({
  head,
  title,
  centered,
  white,
}: SectionTitleProps) {
  return (
    <div
      className={classNames(
        centered ? "mx-auto max-w-md text-center" : "",
        "mb-5"
      )}
    >
      {head && <div className="mb-4 font-semibold text-yellow">{head}</div>}

      <h2
        className={classNames(
          white ? "text-white" : "text-primary-600",
          "text-3xl font-extrabold tracking-tight sm:text-4xl"
        )}
      >
        {title}
      </h2>
    </div>
  );
}
