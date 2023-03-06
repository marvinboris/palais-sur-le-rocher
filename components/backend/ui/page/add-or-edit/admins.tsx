import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import { resourceIcon } from "../../../../../app/helpers/utils";
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state";
import ResourceType from "../../../../../app/types/resource";

import Input from "../../form/input";
import InputImage from "../../form/input-image";

import * as utility from "../../utils";

import ManagerAddOrEdit from "../add-or-edit";

type Props = { edit?: boolean };

const initialState = {
  name: "",
  phone: "",
  photo: "",
  email: "",
  password: "",
  password_confirmation: "",

  add: false,
};

export default function ManageAddOrEditAdmins({ edit }: Props) {
  const resource: ResourceType = "admins";
  const singular = "admin";
  const icon = resourceIcon(resource);

  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        pages: {
          [resource]: { form },
        },
      },
    },
  } = content!;

  const [state, setState] = useState<ManagerResourceManageStateType>({
    ...initialState,
  });

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => utility.add.component.inputChangeHandler(setState)(e);
  const fileUpload = (id: string) => utility.add.component.fileUpload(id);

  return (
    <ManagerAddOrEdit
      edit={edit}
      resource={resource}
      singular={singular}
      initialState={initialState}
      state={state}
      setState={setState}
      staticChild={
        <>
          <input
            type="file"
            id="photo"
            name="photo"
            className="hidden"
            onChange={inputChangeHandler}
            accept=".png,.jpg,.jpeg"
          />
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="grid flex-1 grid-cols-1 gap-y-2 gap-x-4 overflow-auto md:grid-cols-2">
            <Input
              icon={icon}
              onChange={inputChangeHandler}
              value={state.name as string}
              name="name"
              required
              validation={{ required: true }}
              label={form.name}
            />
            <Input
              type="tel"
              addon={!edit && <span className="text-sm">+237</span>}
              onChange={inputChangeHandler}
              value={state.phone as string}
              name="phone"
              required
              validation={{ required: true }}
              label={form.phone}
            />
            <Input
              type="password"
              icon={LockClosedIcon}
              onChange={inputChangeHandler}
              value={state.password as string}
              name="password"
              required
              validation={{ required: true, minLength: 5 }}
              label={form.password}
            />
            <Input
              type="password"
              icon={LockClosedIcon}
              onChange={inputChangeHandler}
              value={state.password_confirmation as string}
              name="password_confirmation"
              required
              validation={{
                required: true,
                minLength: 5,
                confirm: state.password as string,
              }}
              label={form.password_confirmation}
            />
            <Input
              type="email"
              icon={EnvelopeIcon}
              onChange={inputChangeHandler}
              value={state.email as string}
              name="email"
              required
              validation={{ required: true, isEmail: true }}
              label={form.email}
            />
          </div>
        </div>

        <div>
          <InputImage
            label={form.photo}
            name="photo"
            value={state.photo as string}
            onClick={() => fileUpload("photo")}
          />
        </div>
      </div>
    </ManagerAddOrEdit>
  );
}
