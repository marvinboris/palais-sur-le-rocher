import { ComponentProps, ReactNode, useEffect, useState } from "react";

interface PageTitleProps {
  title: ReactNode;
  subtitle: ReactNode;
  animated?: boolean;
  animationSubtitle?: ReactNode;
  icon: (props: ComponentProps<"svg">) => JSX.Element;
}

export default function PageTitle({
  title,
  subtitle: defaultSubtitle,
  animated,
  animationSubtitle,
  icon: Icon,
}: PageTitleProps) {
  const [hightlighted, setHightlighted] = useState(animated);
  const subtitle =
    hightlighted && animationSubtitle ? animationSubtitle : defaultSubtitle;

  useEffect(() => {
    if (animated)
      setTimeout(() => {
        setHightlighted(false);
      }, 5000);
  }, [animated]);

  return (
    <div className="relative z-0 flex space-x-[11px] bg-white pt-[11px] pb-[14px] pl-[30px] pr-[85px] transition-all duration-200 before:absolute before:inset-y-0 before:left-0 before:w-[9px] before:bg-yellow after:absolute after:inset-0 after:-z-10 after:bg-yellow/[0.07] dark:bg-secondary-800 md:items-center md:space-x-[14px] md:px-[33px]">
      <div>
        <Icon className="w-[56px] text-yellow transition-all duration-200 md:w-[34px]" />
      </div>

      <div>
        <div className="font-display text-lg font-medium">{title}</div>
        <div className="text-yellow transition-all duration-200">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
