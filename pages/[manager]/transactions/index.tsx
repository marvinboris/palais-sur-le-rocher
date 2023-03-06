import { ReactElement } from "react";

import { useContentContext } from "../../../app/contexts/content";
import {
  classNames,
  convertDate,
  updateObject,
} from "../../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { TransactionInterface } from "../../../app/models/transaction";
import ResourceType from "../../../app/types/resource";

import Layout from "../../../components/backend/navigation/layout";
import ManageRead from "../../../components/backend/ui/page/read";

import { selectAuth } from "../../../features/auth/authSlice";
import { selectBackend, _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManageTransactionsPage: NextPageWithLayout = () => {
  const resource: ResourceType = "transactions";

  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectAuth);
  const { data: backend } = useAppSelector(selectBackend);

  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        components: {
          form: { pending, failed, completed },
        },
        pages: {
          [resource]: { form },
        },
      },
    },
  } = content!;

  const props = {
    delete: (id: string) => dispatch(_delete({ role: role!, resource, id })),
  };

  const data = (
    backend && backend[resource]
      ? (backend[resource] as TransactionInterface[])
      : []
  ).map((item) =>
    updateObject(item, {
      created_at: convertDate(item.createdAt!),
      status: (
        <span
          className={classNames(
            "rounded py-1 px-3 font-medium",
            [
              "bg-primary-600/10 text-primary-600",
              "bg-green/10 text-green",
              "bg-red/10 text-red",
            ][item.status!]
          )}
        >
          {[pending, failed, completed][item.status!]}
        </span>
      ),
    })
  );

  const fields = [
    { name: form.created_at, key: "created_at" },
    { name: form.amount, key: "amount" },
    { name: form.currency, key: "currency" },
    { name: form.method, key: "method" },
    { name: form.status, key: "status" },
    { name: form.address, key: "address" },
    { name: form.tx_id, key: "txId" },
    { name: form.tx_hash, key: "txHash" },
  ];

  return <ManageRead data={data} fields={fields} resource={resource} />;
};

ManageTransactionsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManageTransactionsPage;
