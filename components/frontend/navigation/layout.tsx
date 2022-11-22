import { useState, ComponentProps } from 'react'
import NextHead from 'next/head'

import LessonContext from '../../../app/contexts/lesson'
import { LessonInterface } from '../../../app/models/lesson'

import Toolbar from './toolbar'
import Footer from './footer'
import Listening from './listening'

export default function Layout({ children }: ComponentProps<'div'>) {
    const [lesson, setLesson] = useState<(LessonInterface & { _id: string, link: string }) | null>(null)
    const [active, setActive] = useState(false)

    return <LessonContext.Provider value={{ lesson, setLesson, active, setActive }}>
        <div className='min-h-screen flex flex-col'>
            <Toolbar />

            <div className="main-wrapper">
                {children}
            </div>

            <Footer />

            <Listening />
        </div>
    </LessonContext.Provider>
}

export interface PageParams {
    link: string
    title: string
    description: string
}

export const Head = ({ link, title, description }: PageParams) => <NextHead>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={link} />

    <meta property='og:title' content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={link} />

    <meta property='twitter:title' content={title} />
    <meta property="twitter:description" content={description} />
</NextHead>