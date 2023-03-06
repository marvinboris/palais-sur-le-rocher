import { ReactElement } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { convertDate, updateObject } from "../../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { MethodInterface } from "../../../app/models/method";
import ResourceType from "../../../app/types/resource";

import Layout from "../../../components/backend/navigation/layout";
import Action from "../../../components/backend/ui/list/action";
import Photo from "../../../components/backend/ui/list/photo";
import Status from "../../../components/backend/ui/list/status";
import ManageRead from "../../../components/backend/ui/page/read";

import { selectAuth } from "../../../features/auth/authSlice";
import { selectBackend, _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManagerMethodsPage: NextPageWithLayout = () => {
  const resource: ResourceType = "methods";

  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectAuth);
  const { data: backend } = useAppSelector(selectBackend);

  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        components: {
          list: { action, see },
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
    backend && backend[resource] ? (backend[resource] as MethodInterface[]) : []
  ).map((item) =>
    updateObject(item, {
      created_at: convertDate(item.createdAt!),
      isActive: <Status value={item.isActive} />,
      logo: (
        <Photo
          photo={item.logo!}
          see={see}
          title={`${form.method_logo}: ${item.name}`}
        />
      ),
      action: <Action props={props} resource={resource} item={item} />,
    })
  );

  const fields = [
    { name: form.name, key: "name", className: 'w-full' },
    { name: form.is_active, key: "isActive" },
    { name: form.logo, key: "logo" },
    { name: form.created_at, key: "created_at" },
    { name: action, key: "action", fixed: true },
  ];

  return <ManageRead data={data} fields={fields} resource={resource} />;
};

ManagerMethodsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerMethodsPage;
