import { WrenchIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LessonInterface } from '../../../app/models/lesson'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerLessonsPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { lessons: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'lessons' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.lessons)) {
            dispatch(get(params))
            setIsMounted(true)
        }
    }, [backend, dispatch, params, status])

    const props = {
        auth: { role: role! },
        backend: { status, data: backend!, message },
        content: content!,
        history: router,

        get: (page?: number, show?: number | string, search?: string) => dispatch(get({ ...params, page, show, search })),
        delete: (_id: string) => dispatch(_delete({ ...params, id: _id })),
        reset: () => dispatch(reset()),
    }

    const data = (backend && backend.lessons ? (backend.lessons as LessonInterface[]) : []).map(lesson => {
        return updateObject(lesson, {
            created_at: convertDate(lesson.createdAt!),
            action: <Action props={props} resource='lessons' item={lesson} />,
        });
    });

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/lessons`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={WrenchIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={WrenchIcon} props={{ ...props, backend: { status, data: backend!, message } }} isMounted={isMounted} resource='lessons' data={data} fields={[
            { name: form.episode, key: 'episode' },
            { name: form.description, key: 'description' },
            { name: form.subtitle, key: 'subtitle' },
            { name: form.notes, key: 'notes' },
            { name: form.audio, key: 'audio' },
            { name: form.date, key: 'date' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerLessonsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerLessonsPage