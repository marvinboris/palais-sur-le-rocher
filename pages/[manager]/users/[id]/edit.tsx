import { ReactElement } from "react";

import Layout from "../../../../components/backend/navigation/layout";
import ManageAddOrEditUsers from "../../../../components/backend/ui/page/add-or-edit/users";

import { _delete } from "../../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../../_app";

const ManagerUsersEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditUsers edit />
);

ManagerUsersEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerUsersEditPage;
