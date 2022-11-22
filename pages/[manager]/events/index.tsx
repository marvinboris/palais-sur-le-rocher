import { BellIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { EventInterface } from '../../../app/models/event'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerEventsPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { events: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'events' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.events)) {
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

    const data = (backend && backend.events ? (backend.events as EventInterface[]) : []).map(event => {
        return updateObject(event, {
            created_at: convertDate(event.createdAt!),
            photo: <Photo photo={event.photo} see={see} title={`${form.event_photo}: ${event.title}`} />,
            action: <Action props={props} resource='events' item={event} />,
        });
    });

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/events`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={BellIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={BellIcon} props={{ ...props, backend: { status, data: backend!, message } }} isMounted={isMounted} resource='events' data={data} fields={[
            { name: form.title, key: 'title' },
            { name: form.description, key: 'description' },
            { name: form.body, key: 'body' },
            { name: form.photo, key: 'photo' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerEventsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerEventsPage