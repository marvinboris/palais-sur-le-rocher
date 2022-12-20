import { BookOpenIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { LessonInterface } from '../../../app/models/lesson'

import Layout from '../../../components/backend/navigation/layout'
import Action from '../../../components/backend/ui/list/action'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerLessonsPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action } }, pages: { lessons: { form } } } } } = content!

    const resource = 'lessons'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.lessons ? (backend.lessons as LessonInterface[]) : []).map(lesson => updateObject(lesson, {
        created_at: convertDate(lesson.createdAt!),
        action: <Action props={props} resource='lessons' item={lesson} />,
    }));

    const fields = [
        { name: form.episode, key: 'episode' },
        { name: form.subtitle, key: 'subtitle' },
        { name: form.description, key: 'description' },
        { name: form.notes, key: 'notes' },
        { name: form.audio, key: 'audio' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={BookOpenIcon} resource={resource} />
}

ManagerLessonsPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerLessonsPage