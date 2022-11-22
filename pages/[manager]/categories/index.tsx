import { CogIcon, TagIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { CategoryInterface } from '../../../app/models/category'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerCategoriesPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { categories: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'categories' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.categories)) {
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

    const data = (backend && backend.categories ? (backend.categories as CategoryInterface[]) : []).map(category => updateObject(category, {
        created_at: convertDate(category.createdAt!),
        action: <Action props={props} resource='categories' item={category} />,
    }));

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/categories`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={CogIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={CogIcon} props={{ ...props, backend: { status, data: backend!, message } }} isMounted={isMounted} resource='categories' data={data} fields={[
            { name: form.name, key: 'name', className: 'w-100' },
            { name: form.is_active, key: 'isActive' },
            { name: form.created_at, key: 'created_at' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerCategoriesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerCategoriesPage