import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type InputImageProps = {
  label: string;
  id?: string;
  name: string;
  value?: string;
  onClick: () => void;
};

export default function InputImage({
  id,
  label,
  name,
  value,
  onClick,
}: InputImageProps) {
  return (
    <div>
      {label && <label htmlFor={id || name}>{label}</label>}

      <div
        onClick={onClick}
        className="relative aspect-[5/2] cursor-pointer overflow-hidden rounded-lg bg-secondary-100 text-white dark:bg-secondary-900 md:mt-0 md:aspect-video"
      >
        {value && (
          <Image
            fill
            src={value}
            alt={label}
            className="image-cover absolute inset-0 z-0"
          />
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
