import Image from 'next/image';
import { ReactElement } from 'react'

import { useLessonContext } from '../../app/contexts/lesson';
import { Lesson } from '../../app/models';
import { LessonInterface } from '../../app/models/lesson';

import Layout, { Head } from "../../components/frontend/navigation/layout";
import LessonBlock from '../../components/frontend/ui/blocks/lesson';
import DurationBlock from '../../components/frontend/ui/blocks/lesson/duration';

const params = {
    link: '/lessons',
    title: "Palais sur le Rocher | Enseignements",
    description: "Ecoutez les messages de notre Seigneur le long de nos différentes rencontres."
}

type LessonType = LessonInterface & { _id: string, link: string }

interface LessonsPageProps {
    lessons: LessonType[]
}

const LessonsPage = ({ lessons }: LessonsPageProps) => {
    const { lesson: currentLesson, setLesson, active, setActive } = useLessonContext()

    const onClick = (lesson: LessonType) => {
        if (currentLesson !== null && lesson.audio === currentLesson.audio) setActive(!active)
        else setLesson(lesson)
    }

    const renderLesson = (lesson: LessonType, index: number) => <LessonBlock key={`lesson-${lesson.link}-${index}`} {...lesson} current={currentLesson !== null && lesson.audio === currentLesson.audio && active} onClick={() => onClick(lesson)} />

    const lessonsContent = lessons.map(renderLesson)
    const lessonsUrls = lessons.map(lesson => lesson.audio!)

    return <>
        <Head {...params} />
        <main id='lessons' className='page-main'>
            <header className='relative'>
                <div className="bg-img">
                    <Image width={1920} height={1920} src="/images/aaron-burden-cmIqkMPfpMQ-unsplash.jpg" alt="Enseignements" className="image-cover" />
                </div>

                <div className="container text-secondary-50 relative z-10">
                    <p className="text-xs sm:text-sm uppercase">Liste de lecture</p>

                    <h1 className="text-4xl md:text-6xl font-extrabold">Enseignements</h1>

                    <p className="text-xs sm:text-sm mt-8">{lessons.length} enseignements, <span className="font-semibold"><DurationBlock urls={lessonsUrls} /></span></p>
                </div>
            </header>

            <section>
                <div className="container divide-y divide-secondary-100 dark:divide-secondary-200/20">
                    {lessonsContent}
                </div>
            </section>
        </main>
    </>
}

LessonsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>
        {page}
    </Layout>
}

export async function getServerSideProps() {
    const lessons = await Lesson.find()

    return { props: { lessons: JSON.parse(JSON.stringify(lessons.map(lesson => lesson.toObject()))) } }
}

export default LessonsPage