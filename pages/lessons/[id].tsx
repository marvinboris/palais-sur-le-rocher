import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement } from 'react'

import { useLessonContext } from '../../app/contexts/lesson';
import { LessonInterface } from '../../app/models/lesson';

import Layout, { Head } from "../../components/frontend/navigation/layout";
import Duration from '../../components/frontend/ui/blocks/lesson/duration';

type LessonType = LessonInterface & { _id: string, link: string }

interface LessonPageProps {
    lessons: LessonType[]
}

const LessonPage = ({ lessons }: LessonPageProps) => {
    const { lesson: currentLesson, setLesson, active, setActive } = useLessonContext()

    const { query: { id } } = useRouter()
    const lesson = lessons.find(lesson => lesson._id === id)
    const { date, description, episode, link, subtitle, notes, audio } = lesson!

    const onClick = () => {
        if (currentLesson !== null && audio === currentLesson.audio) setActive(!active)
        else setLesson(lesson!)
    }

    return <>
        <Head title={subtitle} link={link} description={description} />
        <main id="lesson" className='page-main'>
            <header className='relative'>
                <div className="bg-img">
                    <Image width={1920} height={1920} src="/images/aaron-burden-cmIqkMPfpMQ-unsplash.jpg" alt="Enseignements" className="image-cover" />
                </div>

                <div className="container text-secondary-50 relative z-10 md:flex md:space-x-6">
                    <div className='flex justify-end'>
                        <button type="button" onClick={onClick} className="group relative flex flex-shrink-0 items-center justify-center rounded-full bg-secondary-50 hover:bg-secondary-200 focus:outline-none focus:ring-secondary-50 h-14 w-14 focus:ring-2 focus:ring-offset-2" aria-label="Play">
                            <div className="absolute -inset-3 md:hidden" />

                            {!active ? <svg aria-hidden="true" viewBox="0 0 36 36" className="fill-secondary-700 group-active:fill-secondary-900 h-7 w-7">
                                <path d="M33.75 16.701C34.75 17.2783 34.75 18.7217 33.75 19.299L11.25 32.2894C10.25 32.8668 9 32.1451 9 30.9904L9 5.00962C9 3.85491 10.25 3.13323 11.25 3.71058L33.75 16.701Z" />
                            </svg> : <svg aria-hidden="true" viewBox="0 0 22 28" className="fill-secondary-700 group-active:fill-secondary-900 h-5 w-5">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.5 0C0.671573 0 0 0.671572 0 1.5V26.5C0 27.3284 0.671573 28 1.5 28H4.5C5.32843 28 6 27.3284 6 26.5V1.5C6 0.671573 5.32843 0 4.5 0H1.5ZM17.5 0C16.6716 0 16 0.671572 16 1.5V26.5C16 27.3284 16.6716 28 17.5 28H20.5C21.3284 28 22 27.3284 22 26.5V1.5C22 0.671573 21.3284 0 20.5 0H17.5Z" />
                            </svg>}
                        </button>
                    </div>

                    <div>
                        <p className="text-xs sm:text-sm uppercase">Enseignement</p>

                        <h1 className="text-4xl md:text-6xl font-extrabold">{description}</h1>

                        <p className="text-xs sm:text-sm mt-8"><span className='font-semibold'>{episode}: {subtitle}</span> • {new Date(date).toDateString()} • <span className="font-semibold"><Duration urls={[audio!]} /></span></p>
                    </div>
                </div>
            </header>

            <section>
                <div className="container">
                    <div dangerouslySetInnerHTML={{ __html: notes }} />
                </div>
            </section>
        </main>
    </>
}

LessonPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>
        {page}
    </Layout>
}

export async function getServerSideProps() {
    const lessons = await axios.get('/api/frontend/lessons');
    return { props: { lessons, } };
}

export default LessonPage