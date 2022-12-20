import { UsersIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { StaffMemberInterface } from '../../../app/models/staff-member'

import Layout from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManageStaffMembersPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { staff_members: { form } } } } } = content!

    const resource = 'staff_members'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.staff_members ? (backend.staff_members as StaffMemberInterface[]) : []).map(staff_member => {
        return updateObject(staff_member, {
            created_at: convertDate(staff_member.createdAt!),
            photo: <Photo photo={staff_member.photo} see={see} title={`${form.staff_member_photo}: ${staff_member.name}`} />,
            action: <Action props={props} resource='staff_members' item={staff_member} />,
        });
    });

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.title, key: 'title' },
        { name: form.description, key: 'description' },
        { name: form.principal, key: 'principal' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={UsersIcon} resource={resource} />
}

ManageStaffMembersPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManageStaffMembersPage