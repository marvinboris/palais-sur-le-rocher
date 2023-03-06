import { ReactElement } from "react";

import Layout from "../../../../components/backend/navigation/layout";
import ManageAddOrEditDonations from "../../../../components/backend/ui/page/add-or-edit/donations";

import { _delete } from "../../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../../_app";

const ManagerDonationsEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditDonations edit />
);

ManagerDonationsEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerDonationsEditPage;
