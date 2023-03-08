import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import { resourceIcon } from "../../../../../app/helpers/utils";
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state";
import ResourceType from "../../../../../app/types/resource";

import Input from "../../form/input";
import TextArea from "../../form/text-area";

import * as utility from "../../utils";

import ManagerAddOrEdit from ".";
import InputFile from "../../form/input-file";

type Props = { edit?: boolean };

const initialState = {
  episode: "",
  date: "",
  description: "",
  subtitle: "",
  notes: "",
  audio: "",
  isActive: "1",

  add: false,
};

export default function ManageAddOrEditLessons({ edit }: Props) {
  const resource: ResourceType = "lessons";
  const singular = "lesson";
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
            id="audio"
            name="audio"
            className="hidden"
            onChange={inputChangeHandler}
            accept=".m4a"
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
              value={state.episode as string}
              name="episode"
              required
              validation={{ required: true }}
              label={form.episode}
            />
            <Input
              icon={CalendarDaysIcon}
              onChange={inputChangeHandler}
              value={state.date as string}
              name="date"
              type="date"
              required
              validation={{ required: true }}
              label={form.date}
            />
            <Input
              className="col-span-2"
              icon={icon}
              onChange={inputChangeHandler}
              value={state.subtitle as string}
              name="subtitle"
              required
              validation={{ required: true }}
              label={form.subtitle}
            />
            <TextArea
              className="col-span-2"
              onChange={inputChangeHandler}
              value={state.description as string}
              name="description"
              required
              validation={{ required: true }}
              label={form.description}
            />
            <TextArea
              className="col-span-2"
              onChange={inputChangeHandler}
              value={state.notes as string}
              name="notes"
              required
              validation={{ required: true }}
              label={form.notes}
            />
          </div>
        </div>

        <div>
          <InputFile
            label={form.audio}
            name="audio"
            onClick={() => fileUpload("audio")}
            value={state.audio as string}
          />
        </div>
      </div>
    </ManagerAddOrEdit>
  );
}
