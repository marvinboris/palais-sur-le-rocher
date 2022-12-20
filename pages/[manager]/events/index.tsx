import { BellIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { EventInterface } from '../../../app/models/event'

import Layout from '../../../components/backend/navigation/layout'
import Photo from '../../../components/backend/ui/list/photo'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManageEventsPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action, see } }, pages: { events: { form } } } } } = content!

    const resource = 'events'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.events ? (backend.events as EventInterface[]) : []).map(event => {
        return updateObject(event, {
            created_at: convertDate(event.createdAt!),
            photo: <Photo photo={event.photo} see={see} title={`${form.event_photo}: ${event.title}`} />,
            action: <Action props={props} resource='events' item={event} />,
        });
    });

    const fields = [
        { name: form.title, key: 'title' },
        { name: form.description, key: 'description' },
        { name: form.body, key: 'body' },
        { name: form.photo, key: 'photo' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={BellIcon} resource={resource} />
}

ManageEventsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManageEventsPage