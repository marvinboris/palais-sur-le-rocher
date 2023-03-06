import { ReactElement } from "react";

import Layout from "../../../components/backend/navigation/layout";
import ManageAddOrEditMembers from "../../../components/backend/ui/page/add-or-edit/members";

import { _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManagerMembersEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditMembers />
);

ManagerMembersEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerMembersEditPage;
