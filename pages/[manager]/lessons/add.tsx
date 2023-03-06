import { ReactElement } from "react";

import Layout from "../../../components/backend/navigation/layout";
import ManageAddOrEditLessons from "../../../components/backend/ui/page/add-or-edit/lessons";

import { _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManagerLessonsEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditLessons />
);

ManagerLessonsEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerLessonsEditPage;
