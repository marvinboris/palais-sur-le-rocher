import Image from "next/image";
import { ReactElement } from "react";

import { Publication } from "../../app/models";
import { CategoryInterface } from "../../app/models/category";
import { PublicationInterface } from "../../app/models/publication";

import Layout, { Head } from "../../components/frontend/navigation/layout";
import PublicationBlock from "../../components/frontend/ui/blocks/publication";

type PublicationType = Omit<PublicationInterface, "category"> & {
  _id: string;
  link: string;
  category: CategoryInterface;
};

const params = {
  link: "/explore/blog",
  title: "Palais sur le Rocher | Blog",
  description: "Retrouvez toutes nos publications.",
};

interface BlogPageProps {
  blog: PublicationType[];
}

const BlogPage = ({ blog }: BlogPageProps) => {
  const renderPublication = (publication: PublicationType, index: number) => (
    <PublicationBlock
      key={`publication-${publication.link}-${index}`}
      {...publication}
    />
  );

  const blogContent = blog.map(renderPublication);

  return (
    <>
      <Head {...params} />
      <main id="explore-blog" className="page-main">
        <header className="relative">
          <div className="bg-img">
            <Image
              width={1920}
              height={1920}
              src="/images/aaron-burden-6jYoil2GhVk-unsplash.jpg"
              alt="A propos"
              className="image-cover"
            />
          </div>

          <div className="container relative z-10 text-secondary-50">
            <p className="text-xs uppercase sm:text-sm">Explorer</p>

            <h1 className="text-4xl font-extrabold md:text-6xl">Blog</h1>

            <p className="mt-8 text-xs sm:text-sm">{params.description}</p>
          </div>
        </header>

        <section className="section">
          <div className="container">
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blogContent}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

BlogPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  const publications = await Publication.find().populate("category");

  return {
    props: {
      blog: JSON.parse(
        JSON.stringify(
          publications.map((publication) => publication.toObject())
        )
      ),
    },
  };
}

export default BlogPage;
