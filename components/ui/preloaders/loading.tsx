import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";

import { classNames } from "../../../app/helpers/utils";

type LoadingProps = ComponentProps<"div"> & {
  isAuthenticated?: boolean;
  loading?: boolean;
  waiting?: boolean;
};

export default function Loading({ children, loading }: LoadingProps) {
  const [fadedOut, setFadedOut] = useState(false);

  useEffect(() => {
    if (!fadedOut && !loading) setFadedOut(true);
  }, [fadedOut, loading]);

  return (
    <>
      <div
        className={classNames(
          "absolute inset-0 z-50 flex items-center justify-center bg-white transition-all duration-1000 after:absolute after:inset-0 after:z-40 after:bg-grid-primary-600/[0.05]",
          fadedOut ? "scale-0 opacity-0" : "scale-0 opacity-100"
        )}
      >
        <div className="relative flex h-[150px] w-[150px] items-center">
          <div className="absolute aspect-square w-[150px] animate-spin rounded-full border-[5px] border-primary-600 border-t-transparent" />

          <Image
            width={1920}
            height={1920}
            src={"/images/logo.png"}
            alt="Logo"
            className="w-full scale-75"
          />
        </div>
      </div>

      {fadedOut && children}
    </>
  );
}
