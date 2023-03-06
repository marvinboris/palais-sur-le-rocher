import { useQRCode } from "next-qrcode";
import { ReactElement } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { convertDate, updateObject } from "../../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { MemberInterface } from "../../../app/models/member";
import ResourceType from "../../../app/types/resource";

import Layout from "../../../components/backend/navigation/layout";
import Photo from "../../../components/backend/ui/list/photo";
import Action from "../../../components/backend/ui/list/action";
import ManageRead from "../../../components/backend/ui/page/read";

import { selectAuth } from "../../../features/auth/authSlice";
import { selectBackend, _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const ManageMembersPage: NextPageWithLayout = () => {
  const resource: ResourceType = "members";

  const dispatch = useAppDispatch();

  const { Canvas } = useQRCode();

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
    backend && backend[resource] ? (backend[resource] as MemberInterface[]) : []
  ).map((item) =>
    updateObject(item, {
      created_at: convertDate(item.createdAt!),
      qr: (
        <Photo see={see} title={`${form.member_qr}: ${item.name}`}>
          <Canvas
            text={item.id!}
            options={{
              level: "M",
              margin: 3,
              scale: 4,
              width: 200,
            }}
          />
        </Photo>
      ),
      photo: (
        <Photo
          photo={item.photo}
          see={see}
          title={`${form.member_photo}: ${item.name}`}
        />
      ),
      action: <Action props={props} resource={resource} item={item} />,
    })
  );

  const fields = [
    { name: form.name, key: "name", className: "w-full" },
    { name: form.qr_code, key: "qr" },
    { name: form.photo, key: "photo" },
    { name: action, key: "action", fixed: true },
  ];

  return <ManageRead data={data} fields={fields} resource={resource} />;
};

ManageMembersPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManageMembersPage;
