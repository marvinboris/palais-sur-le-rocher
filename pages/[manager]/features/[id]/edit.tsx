import { ReactElement } from "react";

import Layout from "../../../../components/backend/navigation/layout";
import ManageAddOrEditFeatures from "../../../../components/backend/ui/page/add-or-edit/features";

import { _delete } from "../../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../../_app";

const ManagerFeaturesEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditFeatures edit />
);

ManagerFeaturesEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerFeaturesEditPage;
