import { HomeIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { MinistryInterface } from '../../../app/models/ministry'

import Layout from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManageMinistriesPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { ministries: { form } } } } } = content!

    const resource = 'ministries'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.ministries ? (backend.ministries as MinistryInterface[]) : []).map(ministry => {
        return updateObject(ministry, {
            created_at: convertDate(ministry.createdAt!),
            photo: <Photo photo={ministry.photo} see={see} title={`${form.ministry_photo}: ${ministry.name}`} />,
            action: <Action props={props} resource='ministries' item={ministry} />,
        });
    });

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.description, key: 'description' },
        { name: form.body, key: 'body' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={HomeIcon} resource={resource} />
}

ManageMinistriesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManageMinistriesPage