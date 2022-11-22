import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditMinistries from '../../../components/backend/ui/page/add-or-edit/ministries'

import { NextPageWithLayout } from '../../_app'

const ManagerMinistriesEditPage: NextPageWithLayout = () => <ManageAddOrEditMinistries />

ManagerMinistriesEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerMinistriesEditPage