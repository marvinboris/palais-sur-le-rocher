import { ReactElement } from "react";

import Layout from "../../../components/backend/navigation/layout";
import ManageAddOrEditEvents from "../../../components/backend/ui/page/add-or-edit/events";

import { _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManagerEventsEditPage: NextPageWithLayout = () => (
  <ManageAddOrEditEvents />
);

ManagerEventsEditPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerEventsEditPage;
