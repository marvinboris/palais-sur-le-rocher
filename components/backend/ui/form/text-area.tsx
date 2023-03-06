import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from "react";

import { checkValidity, classNames } from "../../../../app/helpers/utils";
import ValidationType from "../../../../app/types/validation";

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  validation?: ValidationType;
};

export default function TextArea({
  label,
  validation,
  ...props
}: TextAreaProps) {
  const [touched, setTouched] = useState(false);

  const valid = validation
    ? Object.values(checkValidity(props.value as string, validation)).reduce(
        (a, b) => a && b,
        true
      )
    : true;

  const onChange = props.onChange
    ? (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTouched(true);
        props.onChange!(e);
      }
    : () => {};

  return (
    <div className={props.className}>
      {label && (
        <label
          className="block truncate"
          htmlFor={props.id ? props.id : props.name}
        >
          {label}
        </label>
      )}

      <div className="relative rounded-lg bg-secondary-100 dark:bg-secondary-900">
        <textarea
          {...props}
          onChange={onChange}
          className={classNames(
            "min-h-[100px] w-full border-none bg-transparent p-5 text-sm text-inherit outline-none focus:ring-0",
            validation ? "pr-[59px]" : ""
          )}
        />

        {touched && validation ? (
          <div className="absolute top-0 right-0 flex h-12 w-[47px] items-center justify-center">
            {valid ? (
              <CheckIcon className="w-[18px] text-green" />
            ) : (
              <ExclamationCircleIcon className="w-[18px] text-red" />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
