import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Ministry } from "../../app/models";

import { MinistryInterface } from "../../app/models/ministry";

import Layout, { Head } from "../../components/frontend/navigation/layout";

interface MinistryPageProps {
  ministry: MinistryInterface | null;
}

const MinistryPage = ({ ministry }: MinistryPageProps) => {
  if (!ministry) return null;

  const { description, link, name, photo, body } = ministry!;

  return (
    <>
      <Head title={name} link={link!} description={description} />
      <main id="ministry" className="page-main">
        <header className="relative">
          <div className="bg-img">
            <Image
              width={1920}
              height={1920}
              src={photo!}
              alt={name}
              className="image-cover"
            />
          </div>

          <div className="container relative z-10 text-secondary-50">
            <p className="text-xs uppercase sm:text-sm">Ministères</p>

            <h1 className="text-4xl font-extrabold md:text-6xl">{name}</h1>

            <p className="mt-8 text-xs sm:text-sm">{description}</p>
          </div>
        </header>

        <section>
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </section>
      </main>
    </>
  );
};

MinistryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ministry = await Ministry.findOne({ slug: context.query.slug });

  return {
    props: {
      ministry: ministry
        ? JSON.parse(JSON.stringify(ministry.toObject()))
        : null,
    },
  };
};

export default MinistryPage;
