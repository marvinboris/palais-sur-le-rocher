import {
  ArrowDownOnSquareIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { NextPageWithLayout } from "../../_app";

import { useContentContext } from "../../../app/contexts/content";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Status from "../../../app/types/enums/status";

import Layout, { Head } from "../../../components/backend/navigation/layout";
import Button from "../../../components/backend/ui/form/button";
import Input from "../../../components/backend/ui/form/input";
import InputImage from "../../../components/backend/ui/form/input-image";
import PageTitle from "../../../components/backend/ui/title/page";

import { selectAuth } from "../../../features/auth/authSlice";
import {
  get,
  patch,
  selectBackend,
} from "../../../features/backend/backendSlice";

type ValueType = any;
type SetValueType = Dispatch<SetStateAction<ValueType>>;

const readURL = (
  input: EventTarget & HTMLInputElement,
  setValue: SetValueType
) => {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setValue((value: ValueType) => {
        let result = { ...value };
        const keys = input.name.split("[").map((x) => x.replace("]", ""));
        let current: any = result;
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (i === keys.length - 1) {
            if (!current[k]) current[k] = {};
            current[k] = e.target!.result;
          } else {
            if (
              i === keys.length - 2 &&
              Number.isInteger(+keys[i + 1]) &&
              !Array.isArray(current[k])
            )
              current[k] = [];
            else if (!current[k]) current[k] = {};
            current = current[k];
          }
        }
        return { ...value, ...result };
      });
    };

    reader.readAsDataURL(file); // convert to base64 string
  }
};

const ManagerCmsGlobalPage: NextPageWithLayout = () => {
  const { content } = useContentContext();
  const {
    cms: {
      global: { app_name, logo },
      backend: {
        components: {
          form: { save },
        },
        pages: {
          cms: { title, global, form },
        },
      },
    },
  } = content!;

  const dispatch = useAppDispatch();
  const { role } = useAppSelector(selectAuth);
  const { status, data } = useAppSelector(selectBackend);

  const [value, setValue] = useState<ValueType>(content!.cms.global);

  const [params] = useState({
    role: role!,
    resource: "cms",
  });

  useEffect(() => {
    if (status === Status.IDLE && !(data && data.cms)) {
      dispatch(get(params));
    }
  }, [data, dispatch, params, role, status]);

  useEffect(() => {
    if (data && value.app_name === "") setValue({ ...data.cms.global });
  }, [data, value.app_name]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value: val } = e.target;
    if ("files" in e.target && e.target.files)
      return readURL(e.target, setValue);
    setValue((value: ValueType) => ({
      ...value,
      [name]: val,
    }));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(patch({ ...params, id: "global", data: e.target }));
  };

  const handlePhotoChange = (id: string) =>
    document.getElementById(id)?.click();

  return (
    <>
      <Head
        link={`/${role}/cms/global`}
        title={`${title} | ${app_name}`}
        description=""
      />
      <main className="flex-1">
        <PageTitle icon={Cog8ToothIcon} title={title} subtitle={global} />

        <div className="px-[33px] pt-[29px] pb-[54px] md:px-[42px] md:pt-[47px]">
          <div className="mb-[25px] rounded-[30px] bg-white py-8 px-[38.36px] shadow-2xl dark:bg-secondary-800">
            <div className="mb-[46.94px] flex flex-wrap items-center justify-between md:flex-nowrap">
              <div className="order-2 md:order-1">
                <div className="mb-[4.63px] text-[25px] font-bold md:text-[22.21px] md:font-medium">
                  {global}
                </div>

                <div className="h-[6.5732px] w-[30.24px] rounded-xl bg-yellow" />
              </div>

              <div className="order-1 ml-auto mb-8 flex items-center md:order-2 md:ml-0 md:mb-0"></div>
            </div>

            <form onSubmit={submitHandler}>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="grid flex-1 grid-cols-1 gap-y-2 gap-x-4 overflow-auto md:col-span-2 md:grid-cols-2">
                  <Input
                    onChange={onChange}
                    value={value.app_name}
                    name="global[app_name]"
                    required
                    validation={{ required: true }}
                    label={form.app_name}
                  />
                  <Input
                    onChange={onChange}
                    value={value.company_name}
                    name="global[company_name]"
                    required
                    validation={{ required: true }}
                    label={form.company_name}
                  />
                  {Object.keys(logo).map((key) => (
                    <InputImage
                      label={`${form.logo}(${key})`}
                      key={`global-input-logo-${key}`}
                      name={`global-logo-${key}`}
                      value={value.logo[key]!}
                      onClick={() => handlePhotoChange(`global-logo-${key}`)}
                    />
                  ))}
                </div>

                <div>
                  <InputImage
                    label={form.favicon}
                    name="global-favicon"
                    value={value.favicon!}
                    onClick={() => handlePhotoChange("global-favicon")}
                  />
                  <InputImage
                    label={form.company_logo}
                    name="global-company-logo"
                    value={value.company_logo!}
                    onClick={() => handlePhotoChange("global-company-logo")}
                  />
                </div>
              </div>

              <div className="mt-5">
                <Button pill icon={ArrowDownOnSquareIcon} color="green">
                  {save}
                </Button>
              </div>

              <input
                type="file"
                id="global-company-logo"
                name="global[company_logo]"
                className="hidden"
                onChange={onChange}
                accept=".png,.jpg,.jpeg"
              />
              <input
                type="file"
                id="global-favicon"
                name="global[favicon]"
                className="hidden"
                onChange={onChange}
                accept=".png,.jpg,.jpeg"
              />
              <input
                type="file"
                id="global-logo-big"
                name="global[logo][big]"
                className="hidden"
                onChange={onChange}
                accept=".png,.jpg,.jpeg"
              />
              <input
                type="file"
                id="global-logo-dark"
                name="global[logo][dark]"
                className="hidden"
                onChange={onChange}
                accept=".png,.jpg,.jpeg"
              />
              <input
                type="file"
                id="global-logo-default"
                name="global[logo][default]"
                className="hidden"
                onChange={onChange}
                accept=".png,.jpg,.jpeg"
              />
              <input
                type="file"
                id="global-logo-light"
                name="global[logo][light]"
                className="hidden"
                onChange={onChange}
                accept=".png,.jpg,.jpeg"
              />
              <input
                type="file"
                id="global-logo-named"
                name="global[logo][named]"
                className="hidden"
                onChange={onChange}
                accept=".png,.jpg,.jpeg"
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

ManagerCmsGlobalPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerCmsGlobalPage;
