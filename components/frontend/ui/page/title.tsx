import { ComponentProps, ReactNode } from "react";

interface PageTitleProps {
  title: ReactNode;
  subtitle: ReactNode;
  icon: (props: ComponentProps<"svg">) => JSX.Element;
  children?: ReactNode;
}

export default function PageTitle({
  title,
  subtitle,
  icon: Icon,
  children,
}: PageTitleProps) {
  return (
    <header className="container">
      <div className="flex items-center rounded-[30px] bg-secondary-800 py-6 pl-9 pr-12">
        <div className="relative mr-[22px] pr-[22px] text-white opacity-30">
          <Icon className="w-[52px]" />
          <div className="absolute top-1/2 right-0 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white" />
        </div>

        <div>
          <h1 className="text-[30px] font-bold text-white">{title}</h1>
          <p className="text-xl text-lime-500">{subtitle}</p>
        </div>

        <div className="ml-auto">{children}</div>
      </div>
    </header>
  );
}
