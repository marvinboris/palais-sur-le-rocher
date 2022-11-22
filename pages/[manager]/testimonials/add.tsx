import { ReactElement } from 'react'

import Layout from '../../../components/backend/navigation/layout'

import { _delete } from '../../../features/backend/backendSlice'
import ManageAddOrEditTestimonials from '../../../components/backend/ui/page/add-or-edit/testimonials'

import { NextPageWithLayout } from '../../_app'

const ManagerTestimonialsEditPage: NextPageWithLayout = () => <ManageAddOrEditTestimonials />

ManagerTestimonialsEditPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ManagerTestimonialsEditPage