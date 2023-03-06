import { ReactElement } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { convertDate, updateObject } from "../../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CategoryInterface } from "../../../app/models/category";
import ResourceType from "../../../app/types/resource";

import Layout from "../../../components/backend/navigation/layout";
import Action from "../../../components/backend/ui/list/action";
import Status from "../../../components/backend/ui/list/status";
import ManageRead from "../../../components/backend/ui/page/read";

import { selectAuth } from "../../../features/auth/authSlice";
import { selectBackend, _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManagerCategoriesPage: NextPageWithLayout = () => {
  const resource: ResourceType = "categories";

  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectAuth);
  const { data: backend } = useAppSelector(selectBackend);

  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        components: {
          list: { action },
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
      ? (backend[resource] as CategoryInterface[])
      : []
  ).map((item) =>
    updateObject(item, {
      created_at: convertDate(item.createdAt!),
      isActive: <Status value={item.isActive!} />,
      action: <Action props={props} resource={resource} item={item} />,
    })
  );

  const fields = [
    { name: form.name, key: "name", className: 'w-full' },
    { name: form.is_active, key: "isActive" },
    { name: form.created_at, key: "created_at" },
    { name: action, key: "action", fixed: true },
  ];

  return <ManageRead data={data} fields={fields} resource={resource} />;
};

ManagerCategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerCategoriesPage;
