import { EyeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ReactNode } from "react";

import View from "../../../ui/view";

type PhotoProps = {
  photo?: string;
  see: string;
  title: string;
  children?: ReactNode;
};

export default function Photo({ photo, see, title, children }: PhotoProps) {
  return photo || children ? (
    <div className="flex items-center space-x-2">
      <span>{see}</span>

      <span className="ml-auto">
        <View
          title={title}
          action={<EyeIcon className="w-5 cursor-pointer text-green" />}
        >
          {photo ? (
            <Image
              width={1920}
              height={1920}
              src={photo}
              className="w-full"
              alt={title}
            />
          ) : null}
          {children}
        </View>
      </span>
    </div>
  ) : (
    <></>
  );
}
