import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement } from 'react'
import { Ministry } from '../../app/models';

import { MinistryInterface } from '../../app/models/ministry';

import Layout, { Head } from "../../components/frontend/navigation/layout";

type MinistryType = MinistryInterface & { _id: string, link: string }

interface MinistryPageProps {
    ministries: MinistryType[]
}

const MinistryPage = ({ ministries }: MinistryPageProps) => {
    const { query: { slug } } = useRouter()

    const ministry = ministries.find(ministry => ministry.slug === slug)
    const { description, link, name, photo, body } = ministry!

    return <>
        <Head title={name} link={link} description={description} />
        <main id="ministries" className='page-main'>
            <header className='relative'>
                <div className="bg-img">
                    <Image width={1920} height={1920} src={photo!} alt={name} className="image-cover" />
                </div>

                <div className="container text-secondary-50 relative z-10">
                    <p className="text-xs sm:text-sm uppercase">Ministères</p>

                    <h1 className="text-4xl md:text-6xl font-extrabold">{name}</h1>

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

MinistryPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>
        {page}
    </Layout>
}

export async function getServerSideProps() {
    const ministries = await Ministry.find()

    return { props: { ministries: JSON.parse(JSON.stringify(ministries.map(ministry => ministry.toObject()))) } };
}

export default MinistryPage