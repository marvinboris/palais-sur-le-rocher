import { ChangeEvent, useState } from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import { resourceIcon } from "../../../../../app/helpers/utils";
import { useAppSelector } from "../../../../../app/hooks";
import { MethodInterface } from "../../../../../app/models/method";
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state";
import ResourceType from "../../../../../app/types/resource";

import { selectBackend } from "../../../../../features/backend/backendSlice";

import Input from "../../form/input";
import Select from "../../form/select";

import * as utility from "../../utils";

import ManagerAddOrEdit from ".";

type Props = { edit?: boolean };

const initialState = {
  method: "",
  amount: "",

  add: false,
};

export default function ManageAddOrEditDonations({ edit }: Props) {
  const resource: ResourceType = "donations";
  const singular = "donation";
  const icon = resourceIcon(resource);

  const { data: backend } = useAppSelector(selectBackend);

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

  const methods =
    backend && backend.methods
      ? (backend.methods as (MethodInterface & { _id: string })[])
      : [];
  const methodsOptions = methods.map((method) => (
    <option key={JSON.stringify(method)} value={method._id}>
      {method.name}
    </option>
  ));

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
            <Select
              icon={resourceIcon("methods")}
              name="method"
              label={form.method}
              onChange={inputChangeHandler}
              required
              validation={{ required: true }}
              value={state.method as string}
            >
              <option>{form.select_method}</option>
              {methodsOptions}
            </Select>
            <Input
              icon={icon}
              onChange={inputChangeHandler}
              value={state.amount as string}
              name="amount"
              required
              validation={{ required: true }}
              label={form.amount}
            />
          </div>
        </div>
      </div>
    </ManagerAddOrEdit>
  );
}
