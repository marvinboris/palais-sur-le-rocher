import { ReactElement } from "react";

import Layout from "../../../../components/backend/navigation/layout";
import ManageAddOrEditMethods from "../../../../components/backend/ui/page/add-or-edit/methods";

import { _delete } from "../../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../../_app";

const ManagerMethodsEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditMethods edit />
);

ManagerMethodsEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerMethodsEditPage;
