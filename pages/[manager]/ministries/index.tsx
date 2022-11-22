import { WrenchIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { MinistryInterface } from '../../../app/models/ministry'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerMinistriesPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { ministries: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'ministries' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.ministries)) {
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

    const data = (backend && backend.ministries ? (backend.ministries as MinistryInterface[]) : []).map(ministry => {
        return updateObject(ministry, {
            created_at: convertDate(ministry.createdAt!),
            photo: <Photo photo={ministry.photo} see={see} title={`${form.ministry_photo}: ${ministry.name}`} />,
            action: <Action props={props} resource='ministries' item={ministry} />,
        });
    });

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/ministries`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={WrenchIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={WrenchIcon} props={{ ...props, backend: { status, data: backend!, message } }} isMounted={isMounted} resource='ministries' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.description, key: 'description' },
            { name: form.body, key: 'body' },
            { name: form.photo, key: 'photo' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerMinistriesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerMinistriesPage