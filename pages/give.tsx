import Image from 'next/image'
import { ReactElement } from 'react'

import { Method } from '../app/models'
import { MethodInterface } from '../app/models/method'

import Layout, { Head } from '../components/frontend/navigation/layout'
import Methods from '../components/frontend/ui/blocks/methods'
import View from '../components/ui/view'

import { NextPageWithLayout } from './_app'

const params = {
    link: '/give',
    title: "Palais sur le Rocher | Donner",
    description: "Faire un don pour l'oeuvre de Dieu."
}

type MethodType = MethodInterface & { _id: string }

interface GivePageProps {
    give: MethodType[]
}

const GivePage: NextPageWithLayout<GivePageProps> = ({ give }) => {
    return <>
        <Head {...params} />
        <main id="give" className="page-main">
            <header className='relative'>
                <div className="bg-img">
                    <Image width={1920} height={1920} src="/images/jeremy-yap-eCEj-BR91xQ-unsplash.jpg" alt="Donner" className="image-cover" />
                </div>

                <div className="container text-secondary-50 relative z-10">
                    <p className="text-xs sm:text-sm uppercase">Faire un don</p>

                    <h1 className="text-4xl md:text-6xl font-extrabold">Donner</h1>

                    <p className="text-xs sm:text-sm mt-8">{params.description}</p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div className='space-y-6'>
                            <h2 className='section-subtitle'>Merci pour votre générosité</h2>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ipsum officiis, voluptate alias est sapiente itaque ducimus cupiditate. Mollitia explicabo aliquam exercitationem veniam. Suscipit sunt natus tempora molestias esse dicta.</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas ipsum officiis, voluptate alias est sapiente itaque ducimus cupiditate. Mollitia explicabo aliquam exercitationem veniam. Suscipit sunt natus tempora molestias esse dicta.</p>

                            <div>
                                <View title="Faire un don" action={<button className="btn btn-primary-600">Faire un don</button>}>
                                    <form action="">
                                        <div className="form-group">
                                            <label>Méthode de paiement</label>
                                            <Methods methods={give} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="amount">Montant du don</label>
                                            <input type="number" name="amount" id="amount" required />
                                        </div>

                                        <button className="btn btn-primary-600">Continuer</button>
                                    </form>
                                </View>
                            </div>
                        </div>

                        <div>
                            <Image width={1920} height={1920} src="/images/jeremy-yap-eCEj-BR91xQ-unsplash.jpg" alt="Donner" className='image-cover rounded-2xl' />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>
}

GivePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export async function getServerSideProps() {
    const methods = await Method.find()

        
    return { props: { give: JSON.parse(JSON.stringify(methods.map(method => method.toObject()))) } }
}

export default GivePage