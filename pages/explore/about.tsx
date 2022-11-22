import Image from 'next/image';
import { ReactElement } from 'react'

import Layout, { Head } from "../../components/frontend/navigation/layout";

const params = {
    link: '/explore/about',
    title: "Palais sur le Rocher | A propos",
    description: "Tout savoir sur le Palais sur le Rocher et la Mission évangélique du secours divin."
}

const AboutPage = () => {
    return <>
        <Head {...params} />
        <main id="explore-about" className="page-main">
            <header className='relative'>
                <div className="bg-img">
                    <Image width={1920} height={1920} src="/images/marek-piwnicki-k6ncmbh6pHk-unsplash.jpg" alt="A propos" className="image-cover" />
                </div>

                <div className="container text-secondary-50 relative z-10">
                    <p className="text-xs sm:text-sm uppercase">Explorer</p>

                    <h1 className="text-4xl md:text-6xl font-extrabold">A propos</h1>

                    <p className="text-xs sm:text-sm mt-8">{params.description}</p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div>
                            <Image width={1920} height={1920} src="/images/marek-piwnicki-k6ncmbh6pHk-unsplash.jpg" alt="A propos" className='image-cover rounded-2xl' />
                        </div>

                        <div className='space-y-6'>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ipsum officiis, voluptate alias est sapiente itaque ducimus cupiditate. Mollitia explicabo aliquam exercitationem veniam. Suscipit sunt natus tempora molestias esse dicta.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ipsum officiis, voluptate alias est sapiente itaque ducimus cupiditate. Mollitia explicabo aliquam exercitationem veniam. Suscipit sunt natus tempora molestias esse dicta.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ipsum officiis, voluptate alias est sapiente itaque ducimus cupiditate. Mollitia explicabo aliquam exercitationem veniam. Suscipit sunt natus tempora molestias esse dicta.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ipsum officiis, voluptate alias est sapiente itaque ducimus cupiditate. Mollitia explicabo aliquam exercitationem veniam. Suscipit sunt natus tempora molestias esse dicta.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>
        {page}
    </Layout>
}

export default AboutPage