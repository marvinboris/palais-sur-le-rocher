import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditImages from '../../../components/backend/ui/page/add-or-edit/images'

import { NextPageWithLayout } from '../../_app'

const ManagerImagesEditPage: NextPageWithLayout = () => <ManageAddOrEditImages />

ManagerImagesEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerImagesEditPage