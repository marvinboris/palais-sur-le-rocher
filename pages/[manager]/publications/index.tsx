import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { PublicationInterface } from '../../../app/models/publication'

import Layout from '../../../components/backend/navigation/layout'
import Action from '../../../components/backend/ui/list/action'
import Photo from '../../../components/backend/ui/list/photo'
import Status from '../../../components/backend/ui/list/status'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagePublicationsPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { publications: { form } } } } } = content!

    const resource = 'publications'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.publications ? (backend.publications as PublicationInterface[]) : []).map(publication => {
        return updateObject(publication, {
            created_at: convertDate(publication.createdAt!),
            isActive: <Status value={publication.isActive} />,
            photo: <Photo photo={publication.photo} see={see} title={`${form.publication_photo}: ${publication.title}`} />,
            action: <Action props={props} resource='publications' item={publication} />,
        });
    });

    const fields = [
        { name: form.title, key: 'title' },
        { name: form.description, key: 'description' },
        { name: form.body, key: 'body' },
        { name: form.category, key: 'category' },
        { name: form.is_active, key: 'isActive' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={ChatBubbleLeftEllipsisIcon} resource={resource} />
}

ManagePublicationsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagePublicationsPage