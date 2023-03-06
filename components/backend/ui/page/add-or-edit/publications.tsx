import { EyeIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import { resourceIcon } from "../../../../../app/helpers/utils";
import { useAppSelector } from "../../../../../app/hooks";
import { CategoryInterface } from "../../../../../app/models/category";
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state";
import ResourceType from "../../../../../app/types/resource";

import { selectBackend } from "../../../../../features/backend/backendSlice";

import Input from "../../form/input";
import InputImage from "../../form/input-image";
import Select from "../../form/select";
import TextArea from "../../form/text-area";

import * as utility from "../../utils";

import ManagerAddOrEdit from ".";

type Props = { edit?: boolean };

const initialState = {
  name: "",
  phone: "",
  photo: "",
  email: "",
  password: "",
  password_confirmation: "",
  category: "",

  add: false,
};

export default function ManageAddOrEditPublications({ edit }: Props) {
  const resource: ResourceType = "publications";
  const singular = "publication";
  const icon = resourceIcon(resource);

  const { data: backend } = useAppSelector(selectBackend);

  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        components: {
          form: { active, inactive },
        },
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

  const categories =
    backend && backend.categories
      ? (backend.categories as (CategoryInterface & { _id: string })[])
      : [];
  const categoriesOptions = categories.map((category) => (
    <option key={JSON.stringify(category)} value={category._id}>
      {category.name}
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
              value={state.title as string}
              name="title"
              required
              validation={{ required: true }}
              label={form.title}
            />
            <Select
              icon={resourceIcon("categories")}
              name="category"
              label={form.category}
              onChange={inputChangeHandler}
              required
              validation={{ required: true }}
              value={state.category as string}
            >
              <option>{form.select_category}</option>
              {categoriesOptions}
            </Select>
            <Input
              className="md:col-span-2"
              icon={icon}
              onChange={inputChangeHandler}
              value={state.description as string}
              name="description"
              required
              validation={{ required: true }}
              label={form.description}
            />
            <TextArea
              className="md:col-span-2"
              onChange={inputChangeHandler}
              value={state.body as string}
              name="body"
              required
              validation={{ required: true }}
              label={form.body}
            />
            <Select
              icon={EyeIcon}
              label={form.is_active}
              onChange={inputChangeHandler}
              value={state.isActive as string}
              name="isActive"
              required
              validation={{ required: true }}
            >
              <option>{form.select_status}</option>
              <option value={1}>{active}</option>
              <option value={0}>{inactive}</option>
            </Select>
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
