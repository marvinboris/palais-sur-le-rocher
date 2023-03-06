import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, ComponentProps, ReactNode, useState } from "react";

import { checkValidity, classNames } from "../../../../app/helpers/utils";
import ValidationType from "../../../../app/types/validation";

type SelectProps = ComponentProps<"select"> & {
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  label?: ReactNode;
  addon?: ReactNode;
  append?: ReactNode;
  validation?: ValidationType;
};

export default function Select({
  icon: Icon,
  label,
  addon,
  append,
  className,
  validation,
  ...props
}: SelectProps) {
  const [touched, setTouched] = useState(false);

  const valid = validation
    ? Object.values(checkValidity(props.value as string, validation)).reduce(
        (a, b) => a && b,
        true
      )
    : true;

  const onChange = props.onChange
    ? (e: ChangeEvent<HTMLSelectElement>) => {
        setTouched(true);
        props.onChange!(e);
      }
    : () => {};

  return (
    <div className={className}>
      {label && (
        <label htmlFor={props.id ? props.id : props.name}>{label}</label>
      )}

      <div className="flex h-12 items-center rounded-[8px] bg-secondary-700/10 dark:bg-secondary-900 md:bg-secondary-100">
        <div>
          <div
            className={
              Icon || addon ? "flex min-w-[47px] justify-center" : "w-3"
            }
          >
            {Icon && <Icon className="w-[18px]" />}
            {addon}
          </div>
        </div>

        <div className="relative flex h-full flex-1 items-center">
          <select
            {...props}
            onChange={onChange}
            className="h-full w-full flex-1 border-none bg-transparent text-sm text-inherit outline-none focus:ring-0"
          />

          {touched && validation ? (
            <div className="relative flex h-full w-[47px] items-center justify-center">
              {valid ? (
                <CheckIcon className="w-[18px] text-green" />
              ) : (
                <ExclamationCircleIcon className="w-[18px] text-red" />
              )}
            </div>
          ) : (
            <div className="w-3" />
          )}

          {append ? (
            <div className="relative flex h-full w-[47px] items-center justify-center">
              {append}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
