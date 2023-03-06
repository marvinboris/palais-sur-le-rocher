import { ReactElement } from "react";

import Layout from "../../../components/backend/navigation/layout";
import ManageAddOrEditTithes from "../../../components/backend/ui/page/add-or-edit/tithes";

import { _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManagerTithesAddPage: NextPageWithLayout = () => (
  <ManageAddOrEditTithes />
);

ManagerTithesAddPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerTithesAddPage;
