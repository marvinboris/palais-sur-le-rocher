import { PhotoIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state";
import ResourceType from "../../../../../app/types/resource";

import InputImage from "../../form/input-image";

import * as utility from "../../utils";

import ManagerAddOrEdit from "../add-or-edit";

type Props = { edit?: boolean };

const initialState = {
  photo: "",

  add: false,
};

export default function ManageAddOrEditImages({ edit }: Props) {
  const resource: ResourceType = "images";
  const singular = "image";

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
