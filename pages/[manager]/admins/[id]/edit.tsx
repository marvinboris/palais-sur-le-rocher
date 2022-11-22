import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditAdmins from '../../../../components/backend/ui/page/add-or-edit/admins'

import { NextPageWithLayout } from '../../../_app'

const ManagerAdminsEditPage: NextPageWithLayout = () => <ManageAddOrEditAdmins edit />

ManagerAdminsEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerAdminsEditPage