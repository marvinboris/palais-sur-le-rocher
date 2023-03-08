import { ReactElement } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { convertDate, updateObject } from "../../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { UserInterface } from "../../../app/models/user";
import ResourceType from "../../../app/types/resource";

import Layout from "../../../components/backend/navigation/layout";
import Photo from "../../../components/backend/ui/list/photo";
import Action from "../../../components/backend/ui/list/action";
import ManageRead from "../../../components/backend/ui/page/read";

import { selectAuth } from "../../../features/auth/authSlice";
import { selectBackend, _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManagerUsersPage: NextPageWithLayout = () => {
  const resource: ResourceType = "users";

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
    backend && backend[resource] ? (backend[resource] as UserInterface[]) : []
  ).map((item) =>
    updateObject(item, {
      created_at: convertDate(item.createdAt!),
      photo: (
        <Photo
          photo={item.photo}
          see={see}
          title={`${form.user_photo}: ${item.name}`}
        />
      ),
      action: <Action props={props} resource={resource} item={item} />,
    })
  );

  const fields = [
    { name: form.full_name, key: "name", className: "w-full" },
    { name: form.email, key: "email" },
    { name: form.phone, key: "phone" },
    { name: form.role, key: "role" },
    { name: form.photo, key: "photo" },
    { name: action, key: "action", fixed: true },
  ];

  return <ManageRead data={data} fields={fields} resource={resource} />;
};

ManagerUsersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerUsersPage;
