import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Publication } from "../../../app/models";
import { PublicationInterface } from "../../../app/models/publication";

import Layout, { Head } from "../../../components/frontend/navigation/layout";

interface PublicationPageProps {
  publication: PublicationInterface | null;
}

const PublicationPage = ({ publication }: PublicationPageProps) => {
  if (!publication) return null;

  const { description, link, title, photo, body } = publication;

  return (
    <>
      <Head title={title} link={link!} description={description} />
      <main id="publication" className="page-main">
        <header className="relative">
          <div className="bg-img">
            <Image
              width={1920}
              height={1920}
              src={photo!}
              alt={title}
              className="image-cover"
            />
          </div>

          <div className="container relative z-10 text-secondary-50">
            <p className="text-xs uppercase sm:text-sm">Explorer</p>

            <h1 className="text-4xl font-extrabold md:text-6xl">Blog</h1>

            <p className="mt-8 text-xs sm:text-sm">{title}</p>
          </div>
        </header>

        <section>
          <div className="container space-y-3">
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="text-xl font-semibold"
            />
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </section>
      </main>
    </>
  );
};

PublicationPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const publication = await Publication.findOne({ slug: context.query.slug });

  return {
    props: {
      publication: publication
        ? JSON.parse(JSON.stringify(publication.toObject()))
        : null,
    },
  };
};

export default PublicationPage;
