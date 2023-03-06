import Image, { ImageProps } from "next/image";

export default function Logo({
  ...props
}: Omit<ImageProps, "height" | "src" | "alt">) {
  return (
    <div className="py-2.5">
      <Image
        height={500}
        width={500}
        {...props}
        src="/images/logo.png"
        alt="Logo"
        className="h-5 w-auto"
      />
    </div>
  );
  // return <span className="text-primary-600 font-bold text-3xl flex items-center space-x-1"><span>HIALA</span><TvIcon className="w-8" /></span>
}
