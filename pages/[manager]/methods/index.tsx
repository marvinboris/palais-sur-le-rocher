import { WrenchIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { MethodInterface } from '../../../app/models/method'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerMethodsPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { methods: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'methods' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.methods)) {
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

    const data = (backend && backend.methods ? (backend.methods as MethodInterface[]) : []).map(method => {
        return updateObject(method, {
            created_at: convertDate(method.createdAt!),
            logo: <Photo photo={method.logo} see={see} title={`${form.method_logo}: ${method.name}`} />,
            action: <Action props={props} resource='methods' item={method} />,
        });
    });

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/methods`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={WrenchIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={WrenchIcon} props={{ ...props, backend: { status, data: backend!, message } }} isMounted={isMounted} resource='methods' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.description, key: 'description' },
            { name: form.is_active, key: 'isActive' },
            { name: form.logo, key: 'logo' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerMethodsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerMethodsPage