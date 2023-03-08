import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import { Event } from "../../app/models";
import { EventInterface } from "../../app/models/event";

import Layout, { Head } from "../../components/frontend/navigation/layout";

interface EventPageProps {
  event: EventInterface | null;
}

const EventPage = ({ event }: EventPageProps) => {
  if (!event) return null;

  const { description, link, title, photo, body } = event;

  return (
    <>
      <Head title={title} link={link!} description={description} />
      <main id="event" className="page-main">
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
            <p className="text-xs uppercase sm:text-sm">Evènements</p>

            <h1 className="text-4xl font-extrabold md:text-6xl">{title}</h1>

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

EventPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const event = await Event.findOne({ slug: context.query.slug });

  return {
    props: {
      event: event ? JSON.parse(JSON.stringify(event.toObject())) : null,
    },
  };
};

export default EventPage;
