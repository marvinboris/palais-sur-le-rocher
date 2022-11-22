import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditCategories from '../../../components/backend/ui/page/add-or-edit/categories'

import { NextPageWithLayout } from '../../_app'

const ManagerCategoriesAddPage: NextPageWithLayout = () => <ManageAddOrEditCategories />

ManagerCategoriesAddPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerCategoriesAddPage