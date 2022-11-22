import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement } from 'react'

import { Event } from '../../app/models';
import { EventInterface } from '../../app/models/event';

import Layout, { Head } from "../../components/frontend/navigation/layout";

type EventType = EventInterface & { _id: string, link: string }

interface EventPageProps {
    events: EventType[]
}

const EventPage = ({ events }: EventPageProps) => {
    const { query: { slug } } = useRouter()

    const event = events.find(event => event.slug === slug)
    const { description, link, title, photo, body } = event!

    return <>
        <Head title={title} link={link} description={description} />
        <main id="event" className='page-main'>
            <header className='relative'>
                <div className="bg-img">
                    <Image width={1920} height={1920} src={photo!} alt={title} className="image-cover" />
                </div>

                <div className="container text-secondary-50 relative z-10">
                    <p className="text-xs sm:text-sm uppercase">Evènements</p>

                    <h1 className="text-4xl md:text-6xl font-extrabold">{title}</h1>

                    <p className="text-xs sm:text-sm mt-8">{description}</p>
                </div>
            </header>

            <section>
                <div className="container">
                    <div dangerouslySetInnerHTML={{ __html: body }} />
                </div>
            </section>
        </main>
    </>
}

EventPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>
        {page}
    </Layout>
}

export async function getServerSideProps() {
    const events = await Event.find()

    return { props: { events: JSON.parse(JSON.stringify(events.map(event => event.toObject()))) } };
}

export default EventPage