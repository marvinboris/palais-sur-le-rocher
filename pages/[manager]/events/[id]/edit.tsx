import { ReactElement } from 'react'

import Layout from '../../../../components/backend/navigation/layout'

import { _delete } from '../../../../features/backend/backendSlice'
import ManageAddOrEditEvents from '../../../../components/backend/ui/page/add-or-edit/events'

import { NextPageWithLayout } from '../../../_app'

const ManagerEventsEditPage: NextPageWithLayout = () => <ManageAddOrEditEvents edit />

ManagerEventsEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerEventsEditPage