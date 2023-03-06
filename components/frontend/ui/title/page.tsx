import Image from "next/image";

interface PageTitleProps {
  title: string;
  subtitle: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="relative z-0 py-20">
      <Image
        fill
        src="/images/frontend/sigmund-r6tyWx_Mm9g-unsplash.jpg"
        alt="Bannière"
        className="image-cover absolute inset-0 -z-20"
      />
      <div className="absolute inset-0 -z-10 bg-grid-white/[0.05] after:absolute after:inset-0 after:bottom-0 after:-z-20 after:bg-gradient-to-t after:from-primary-600/70 after:to-primary-600/30" />

      <div className="container text-center text-white">
        <h1 className="font-display mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm tracking-tight sm:text-base">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
