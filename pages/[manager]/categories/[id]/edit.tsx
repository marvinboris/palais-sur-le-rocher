import { ReactElement } from "react";

import Layout from "../../../../components/backend/navigation/layout";
import ManageAddOrEditCategories from "../../../../components/backend/ui/page/add-or-edit/categories";

import { _delete } from "../../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../../_app";

const ManagerCategoriesEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditCategories edit />
);

ManagerCategoriesEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerCategoriesEditPage;
