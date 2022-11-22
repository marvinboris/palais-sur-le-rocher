import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditStaffMembers from '../../../components/backend/ui/page/add-or-edit/staff-members'

import { NextPageWithLayout } from '../../_app'

const ManagerStaffMembersEditPage: NextPageWithLayout = () => <ManageAddOrEditStaffMembers />

ManagerStaffMembersEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerStaffMembersEditPage