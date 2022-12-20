import { RectangleStackIcon } from '@heroicons/react/24/outline'
import { ReactElement } from 'react'

import { useContentContext } from '../../../app/contexts/content'
import { convertDate, updateObject } from '../../../app/helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { CategoryInterface } from '../../../app/models/category'

import Layout from '../../../components/backend/navigation/layout'
import Action from '../../../components/backend/ui/list/action'
import Status from '../../../components/backend/ui/list/status'
import ManageRead from '../../../components/backend/ui/page/read'

import { selectAuth } from '../../../features/auth/authSlice'
import { selectBackend, _delete } from '../../../features/backend/backendSlice'

import { NextPageWithLayout } from '../../_app'

const ManagerCategoriesPage: NextPageWithLayout = () => {
    const dispatch = useAppDispatch()

    const { role } = useAppSelector(selectAuth)
    const { data: backend } = useAppSelector(selectBackend)

    const { content } = useContentContext()
    const { cms: { backend: { components: { list: { action } }, pages: { categories: { form } } } } } = content!

    const resource = 'categories'
    const props = { delete: (id: string) => dispatch(_delete({ role: role!, resource, id })) }

    const data = (backend && backend.categories ? (backend.categories as CategoryInterface[]) : []).map(category => updateObject(category, {
        created_at: convertDate(category.createdAt!),
            isActive: <Status value={category.isActive!} />,
            action: <Action props={props} resource='categories' item={category} />,
    }));

    const fields = [
        { name: form.name, key: 'name' },
        { name: form.is_active, key: 'isActive' },
        { name: form.created_at, key: 'created_at' },
        { name: action, key: 'action', fixed: true }
    ]

    return <ManageRead data={data} fields={fields} icon={RectangleStackIcon} resource={resource} />
}

ManagerCategoriesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerCategoriesPage