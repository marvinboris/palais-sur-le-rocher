import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { StaffMemberInterface } from '../../../app/models/staff-member'
import Status from '../../../app/types/enums/status'

import Layout, { Head } from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import PageTitle from '../../../components/backend/ui/title/page'
import * as utility from '../../../components/backend/ui/utils'

import { selectAuth } from '../../../features/auth/authSlice'
import { get, reset, selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerStaffMembersPage: NextPageWithLayout = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { status, data: backend, message } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { global: { app_name }, backend: { components: { list: { action, see } }, pages: { staff_members: { form, index, title } } } } } = content!

    const [isMounted, setIsMounted] = useState(false)
    const [params] = useState({ role: role!, resource: 'staff_members' })

    useEffect(() => {
        if (status === Status.IDLE && !(backend && backend.staff_members)) {
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

    const data = (backend && backend.staff_members ? (backend.staff_members as StaffMemberInterface[]) : []).map(staff_member => {
        return updateObject(staff_member, {
            created_at: convertDate(staff_member.createdAt!),
            photo: <Photo photo={staff_member.photo} see={see} title={`${form.staff_member_photo}: ${staff_member.name}`} />,
            action: <Action props={props} resource='staff_members' item={staff_member} />,
        });
    });

    return <main className='flex-1 flex flex-col'>
        <Head link={`/${role}/staff-members`} title={`${index} | ${app_name}`} description={`${app_name} : ${index}`} />

        <PageTitle icon={ChatBubbleOvalLeftEllipsisIcon} title={title} subtitle={index} />

        <utility.index.lifecycle.render icon={ChatBubbleOvalLeftEllipsisIcon} props={{ ...props, backend: { status, data: backend!, message } }} isMounted={isMounted} resource='staff_members' data={data} fields={[
            { name: form.name, key: 'name' },
            { name: form.title, key: 'title' },
            { name: form.description, key: 'description' },
            { name: form.is_active, key: 'isActive' },
            { name: form.principal, key: 'principal' },
            { name: form.photo, key: 'photo' },
            { name: action, key: 'action', fixed: true }
        ]} />
    </main>
}

ManagerStaffMembersPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerStaffMembersPage