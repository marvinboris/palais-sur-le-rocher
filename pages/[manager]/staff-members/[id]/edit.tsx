import { ReactElement } from "react";

import Layout from "../../../../components/backend/navigation/layout";
import ManageAddOrEditStaffMembers from "../../../../components/backend/ui/page/add-or-edit/staff-members";

import { _delete } from "../../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../../_app";

const ManagerStaffMembersEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditStaffMembers edit />
);

ManagerStaffMembersEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerStaffMembersEditPage;
