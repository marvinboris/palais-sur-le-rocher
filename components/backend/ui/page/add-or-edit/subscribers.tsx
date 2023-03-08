import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import { resourceIcon } from "../../../../../app/helpers/utils";
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state";
import ResourceType from "../../../../../app/types/resource";

import Input from "../../form/input";

import * as utility from "../../utils";

import ManagerAddOrEdit from ".";

type Props = { edit?: boolean };

const initialState = {
  email: "",

  add: false,
};

export default function ManageAddOrEditSubscribers({ edit }: Props) {
  const resource: ResourceType = "subscribers";
  const singular = "subscriber";
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

  return (
    <ManagerAddOrEdit
      edit={edit}
      resource={resource}
      singular={singular}
      initialState={initialState}
      state={state}
      setState={setState}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="grid flex-1 grid-cols-1 gap-y-2 gap-x-4 overflow-auto md:grid-cols-2">
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
      </div>
    </ManagerAddOrEdit>
  );
}
