import axios from 'axios'
import Image from 'next/image'
import { ReactElement } from 'react'

import { CategoryInterface } from '../app/models/category'
import { EventInterface } from '../app/models/event'
import { ImageInterface } from '../app/models/image'
import { MinistryInterface } from '../app/models/ministry'
import { PublicationInterface } from '../app/models/publication'
import { TestimonialInterface } from '../app/models/testimonial'

import Layout, { Head } from '../components/frontend/navigation/layout'
import Event from "../components/frontend/ui/blocks/event"
import ImageBlock from "../components/frontend/ui/blocks/image"
import Ministry from '../components/frontend/ui/blocks/ministry'
import Publication from '../components/frontend/ui/blocks/publication'
import Testimony from "../components/frontend/ui/blocks/testimonial"

import { NextPageWithLayout } from './_app'

const params = {
  link: '/',
  title: "Palais sur le Rocher",
  description: "Bienvenue à l'église du Palais sur le Rocher (PSR)! Découvrez l'amour de Dieu au travers de nos différents ministères."
}

type EventType = EventInterface & { _id: string, link: string }
type ImageType = ImageInterface & { _id: string }
type MinistryType = MinistryInterface & { _id: string, link: string }
type PublicationType = Omit<PublicationInterface, 'category'> & { _id: string, link: string, category: CategoryInterface }
type TestimonyType = TestimonialInterface & { _id: string }

const renderPublication = (publication: PublicationType, index: number) => <Publication key={`publication-${publication.link}-${index}`} {...publication} />
const renderMinistry = (ministry: MinistryType, index: number) => <Ministry key={`ministry-${ministry.name}-${index}`} {...ministry} />
const renderImage = (image: ImageType, index: number) => <ImageBlock key={`image-${image.photo}-${index}`} {...image} />
const renderEvent = (event: EventType, index: number) => <Event key={`event-${event.link}-${index}`} {...event} />
const renderTestimony = (testimony: TestimonyType, index: number) => <Testimony key={`testimony-${testimony.body}-${index}`} {...testimony} />

interface HomeDataType {
  publications: PublicationType[],
  ministries: MinistryType[],
  gallery: ImageType[],
  events: EventType[],
  testimonies: TestimonyType[],
}

interface HomePageProps {
  home: HomeDataType
}

const HomePage: NextPageWithLayout<HomePageProps> = ({ home }) => {
  const { publications, ministries, gallery, events, testimonies } = home

  const publicationsContent = publications.map(renderPublication)
  const ministriesContent = ministries.map(renderMinistry)
  const galleryContent = gallery.map(renderImage)
  const eventsContent = events.map(renderEvent)
  const testimoniesContent = []
  for (let i = 0; i < Math.ceil(testimonies.length / 2); i++) {
    testimoniesContent.push(<li key={`testimoniesContent-${i}`}>
      <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
        {renderTestimony(testimonies[2 * i], 2 * i)}
        {(testimonies.length > 2 * i + 1) && renderTestimony(testimonies[2 * i + 1], 2 * i + 1)}
      </ul>
    </li>)
  }

  return <>
    <Head {...params} />
    <main>
      <header className="container py-40 text-center lg:py-52 flex flex-col items-center justify-center">
        <p className="font-display text-lg text-primary-600 font-semibold mb-6">Mission évangélique du secours divin</p>

        <h1 className='mx-auto max-w-4xl font-display text-5xl font-extrabold tracking-tight text-secondary-900 sm:text-7xl dark:text-white'>Palais sur le Rocher</h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-secondary-600 dark:text-secondary-400">
          Notre mission est de bâtir des rois, changer des vies, sauver des âmes pour la gloire du Seigneur Jésus-Christ.
        </p>

        <div className="mt-10 flex justify-center gap-x-6">
          <a className="btn btn-primary" href="/register"><span>Nous rejoindre <span className="hidden lg:inline">maintenant</span></span></a>
        </div>
      </header>

      <section id="about" aria-label="Palais sur le Rocher" className='section bg-secondary-50 dark:bg-secondary-800'>
        <div className="relative container">
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
              <div className="lg:pl-20">
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-x-lg xl:max-x-xl px-2.5 mx-auto">
                  <Image width={1920} height={1920} alt="Image de présentation" src="/images/marek-piwnicki-k6ncmbh6pHk-unsplash.jpg" decoding="async" data-nimg="future" className="aspect-square rounded-2xl bg-secondary-100 object-cover dark:bg-secondary-800 text-transparent" loading="lazy" />
                </div>
              </div>

              <div className="lg:order-first lg:row-span-2">
                <div className="section-header">
                  <h1 className="section-header-title lg:text-left">Bienvenue au Palais sur le Rocher</h1>
                </div>

                <div className="mt-6 space-y-7 text-base text-secondary-600 dark:text-secondary-400">
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, animi officia ipsum deserunt consequuntur architecto consequatur quidem reiciendis sed quibusdam consectetur, eum corrupti. Quis quam atque nobis facere similique eum!</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, animi officia ipsum deserunt consequuntur architecto consequatur quidem reiciendis sed quibusdam consectetur, eum corrupti. Quis quam atque nobis facere similique eum!</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, animi officia ipsum deserunt consequuntur architecto consequatur quidem reiciendis sed quibusdam consectetur, eum corrupti. Quis quam atque nobis facere similique eum!</p>

                  <p className="text-lg text-primary-600 text-right">
                    Rev. Daniel MBISSOKO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="publications" aria-label="Dernières nouvelles sur Palais" className='section'>
        <div className="container">
          <div className="section-header">
            <h2 className="section-header-title">Aux dernières nouvelles</h2>

            <p className="section-header-subtitle">Ecoutez des derniers enseignements, des oeuvres de l&apos;Eternel dans la vie de son peuple.</p>
          </div>

          <ul className="section-body grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-6 text-sm leading-6">
            {publicationsContent}
          </ul>
        </div>
      </section>

      <section id="ministries" aria-label='Les ministères' className="section dark:bg-secondary-800">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header-title">Les ministères du Palais</h2>
          </div>

          <div className="section-body grid gap-6 lg:mt-20 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {ministriesContent}
          </div>
        </div>
      </section>

      <section id="testimonials" aria-label="Quelques témoignages" className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container">
          <div className="lg:flex flex-wrap items-center lg:-mx-3">
            <div className="lg:w-6/12 xl:w-5/12 lg:px-3">
              <div className="section-header">
                <h2 className="section-header-title">Les merveilles de notre Seigneur</h2>

                <p className="section-header-subtitle">Nous sommes incapables de dénombrer les bienfaits de l&apos;Eternel dans nos vies mais il nous arrive parfois d&apos;en citer quelques uns.</p>
              </div>

              <ul role="list" className="section-body grid grid-cols-1 gap-6">
                {testimoniesContent}
              </ul>
            </div>

            <div className="mt-16 lg:mt-0 lg:w-6/12 xl:w-7/12 lg:px-3">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                {galleryContent}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" aria-label='Les moments privilégiés' className="section dark:bg-secondary-800">
        <div className="container">
          <div className="section-header">
            <h2 className="section-header-title">Les moments privilégiés</h2>

            <p>Car se retrouver dans la présence de Dieu est un privilège, nous en profitons et invitons tout un chacun à en profiter avec nous.</p>
          </div>

          <ul role="list" className="section-body grid grid-cols-2 gap-6 sm:gap-8 lg:mt-20 md:grid-cols-3 xl:grid-cols-4">
            {eventsContent}
          </ul>
        </div>
      </section>

      <section id="map" aria-label='Trouver le Palais' className='bg-secondary-100 dark:bg-secondary-800'>
        <iframe src="https://www.google.com/maps/d/embed?mid=1qxttzUZkrtU0Q2Pnr0BgOAGLrsOz4YpQ&ehbc=2E312F" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='w-full h-full min-h-[500px]' />
      </section>

      <section id="newsletter" className='section'>
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="section-header lg:text-left">
            <h2 className="section-header-title">Recevez toutes les nouvelles</h2>

            <p className="section-header-subtitle">Restez à l&apos;écoute des derniers enseignements, des oeuvres de l&apos;Eternel dans la vie de son peuple.</p>
          </div>

          <div className="section-body">
            <form>
              <h3 className="text-lg font-semibold tracking-tight text-primary-900 dark:text-white">Souscrire à notre newsletter <span aria-hidden="true">↓</span></h3>

              <div className="mt-5 flex rounded-3xl bg-white py-2.5 pr-2.5 shadow-xl shadow-primary-900/5 focus-within:ring-2 focus-within:ring-primary-900 ">
                <input type="email" required placeholder="Adresse mail" aria-label="Adresse mail" className="-my-2.5 flex-auto bg-transparent pl-6 pr-2.5 text-base text-secondary-900 placeholder:text-secondary-400 focus:outline-none" />

                <button className="inline-flex justify-center rounded-2xl bg-primary-600 p-4 text-base font-semibold text-white hover:bg-primary-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 active:text-white/70" type="submit">
                  <span className="sr-only sm:not-sr-only">Souscrire</span>

                  <span className="sm:hidden">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
                      <path d="m14 7 5 5-5 5M19 12H5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </>
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps() {
  const home = await axios.get('/api/frontend/home');
  return { props: { home } }
}

export default HomePage