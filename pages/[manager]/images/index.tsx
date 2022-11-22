import { PhotoIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { ImageInterface } from '../../../app/models/image'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerImagesPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { images: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'images' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.images)) {
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

    const data = (backend && backend.images ? (backend.images as ImageInterface[]) : []).map(image => {
        return updateObject(image, {
            created_at: convertDate(image.createdAt!),
            photo: <Photo photo={image.photo} see={see} title={image.photo!} />,
            action: <Action props={props} resource='images' item={image} />,
        });
    });

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/images`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={PhotoIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={PhotoIcon} props={{ ...props, backend: { status, data: backend!, message } }} isMounted={isMounted} resource='images' data={data} fields={[
            { name: form.photo, key: 'photo' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerImagesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerImagesPage