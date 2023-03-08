import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

type InputFileProps = {
  label: string;
  id?: string;
  name: string;
  value?: string;
  onClick: () => void;
};

export default function InputFile({
  id,
  label,
  name,
  value,
  onClick,
}: InputFileProps) {
  return (
    <div>
      {label && <label htmlFor={id || name}>{label}</label>}

      <div
        onClick={onClick}
        className="relative aspect-[5/2] cursor-pointer overflow-hidden rounded-lg bg-secondary-100 text-white dark:bg-secondary-900 md:mt-0 md:aspect-video"
      >
        {value && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <CheckCircleIcon className="w-16 text-green" />
          </div>
        )}

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-all duration-200 hover:opacity-100">
          <div className="relative z-20 mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 md:mb-1.5 md:h-14 md:w-14">
            <PencilSquareIcon className="w-4 md:w-6" />
          </div>
          <div className="relative z-20 text-[14.81px] font-medium md:font-bold">
            Change
          </div>
        </div>
      </div>
    </div>
  );
}
