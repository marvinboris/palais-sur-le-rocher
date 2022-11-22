import Link from 'next/link'
import { LessonInterface } from '../../../../../app/models/lesson'

type LessonProps = LessonInterface & { _id: string, link: string } & {
    current: boolean
    onClick?: () => void
}

export default function Lesson({ date, description, episode, link = '#', subtitle, current, onClick }: LessonProps) {
    return <article aria-labelledby="episode-5-title" className="py-10 sm:py-12">
        <div className="lg:px-8">
            <div className="">
                <div className="px-4 sm:px-6 md:px-4 lg:px-0">
                    <div className="flex flex-col items-start">
                        <h2 id="episode-5-title" className="mt-2 text-lg font-bold text-secondary-900 dark:text-secondary-50">
                            <Link href={link}>
                                {episode}: {description}
                            </Link>
                        </h2>

                        <time dateTime={new Date(date).toDateString()} className="order-first font-mono text-sm leading-7">{new Date(date).toDateString()}</time>

                        <p className="mt-1 text-base leading-7">{subtitle}</p>

                        <div className="mt-4 flex items-center gap-4">
                            <button type="button" onClick={onClick} className="flex items-center text-sm font-bold leading-6 text-primary-600 hover:text-primary-700 active:text-primary-900" aria-label={`Lire l'épisode ${episode}: ${description}`}>
                                {current ? <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5 fill-current">
                                    <path d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z" fillRule="evenodd" clipRule="evenodd" />
                                </svg> : <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5 fill-current">
                                    <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
                                </svg>}

                                <span className="ml-3 capitalize" aria-hidden="true">écouter</span>
                            </button>

                            <span aria-hidden="true" className="text-sm font-bold">/</span>

                            <Link href={link} className="flex items-center text-sm font-bold leading-6 text-primary-600 hover:text-primary-700 active:text-primary-900" aria-label={`Lire les notes de l'épisode ${episode}: ${description}`}>Lire les notes</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article >
}