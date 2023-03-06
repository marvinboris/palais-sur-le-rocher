interface SectionTitleProps {
  title: string;
  description: string;
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  children?: React.ReactNode;
}

export default function SectionTitle({
  title,
  description,
  icon: Icon,
  children,
}: SectionTitleProps) {
  return (
    <div className="mb-[44px] min-h-[69px] items-center justify-between rounded-[15px] md:mb-[27px] md:flex md:bg-white md:pl-8 md:pr-2.5">
      <div className="mb-9 items-center md:mb-0 md:flex">
        {Icon && (
          <div className="hidden md:block">
            <Icon className="w-7 text-primary-600" />
          </div>
        )}
        <div className="ml-[11px] mr-[19px] hidden md:block">
          <div className="h-[6px] w-[6px] rounded-full bg-primary-600" />
        </div>
        <div className="text-[25px] font-bold md:text-lg md:font-medium">
          {title}
        </div>
        <div className="text-sm md:hidden">{description}</div>
      </div>

      {children}
    </div>
  );
}
