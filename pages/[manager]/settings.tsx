import {
  AdjustmentsHorizontalIcon,
  ArrowDownOnSquareIcon,
  EnvelopeIcon,
  EyeIcon,
  FlagIcon,
  LockClosedIcon,
  PencilIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useState,
} from "react";

import { useContentContext } from "../../app/contexts/content";
import { classNames } from "../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import Button from "../../components/backend/ui/form/button";
import Layout, { Head } from "../../components/backend/navigation/layout";
import PageTitle from "../../components/backend/ui/title/page";
import Input from "../../components/frontend/ui/form/input";
import Select from "../../components/frontend/ui/form/select";

import { selectAuth, userSettings } from "../../features/auth/authSlice";

import { NextPageWithLayout } from "../_app";

type ValueType = any;

const readURL = (
  input: EventTarget & HTMLInputElement,
  setValue: Dispatch<SetStateAction<ValueType>>
) => {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setValue((value: ValueType) => ({
        ...value,
        photo: e.target!.result as string,
      }));
    };

    reader.readAsDataURL(file); // convert to base64 string
  }
};

const SettingsPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  const { data, role } = useAppSelector(selectAuth);

  const { content } = useContentContext();

  const {
    cms: {
      global: { app_name },
      backend: {
        pages: {
          settings: { title, subtitle, form, form_title, form_subtitle },
        },
      },
    },
  } = content!;

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState({
    ...data!,
    password: "",
    password_confirmation: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value: val } = e.target;
    if ("files" in e.target && e.target.files) readURL(e.target, setValue);
    setValue((value) => ({
      ...value,
      [name]: "files" in e.target && e.target.files ? e.target.files[0] : val,
    }));
  };

  const handlePhotoChange = () => document.getElementById("photo")?.click();

  const handleSubmit = () => {
    if (!editing) return;
    dispatch(userSettings(document.querySelector('form') as any));
    setEditing((editing) => !editing);
  };

  return (
    <>
      <Head
        link={`/${role}/settings`}
        title={`${title} | ${app_name}`}
        description={`${app_name}: Modifiez vos informations de profil.`}
      />
      <main className="flex-1">
        <PageTitle
          icon={AdjustmentsHorizontalIcon}
          title={title}
          subtitle={subtitle}
        />

        <div className="px-[33px] pt-[29px] pb-[54px] md:px-[42px] md:pt-[47px]">
          <form
            onSubmit={e => e.preventDefault()}
            className="mb-[25px] max-w-[700px] rounded-[30px] bg-white py-8 px-[38.36px] shadow-2xl dark:bg-secondary-800"
            encType="multipart/form-data"
          >
            <div className="mb-[46.94px] flex flex-wrap items-center justify-between md:flex-nowrap">
              <div className="order-2 md:order-1">
                <div className="mb-[4.63px] text-[25px] font-bold md:text-[22.21px] md:font-medium">
                  {form_title}
                </div>

                <div className="text-[12.96px]">{form_subtitle}</div>
              </div>

              <div className="order-1 ml-auto mb-8 flex items-center md:order-2 md:ml-0 md:mb-0">
                {editing ? (
                  <Button pill icon={ArrowDownOnSquareIcon} color="green" onClick={handleSubmit}>
                    {form.save_settings}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setEditing((editing) => !editing)}
                    pill
                    icon={PencilIcon}
                    color="night"
                  >
                    {form.edit_settings}
                  </Button>
                )}
              </div>
            </div>

            <div>
              <div className="md:flex md:items-start md:space-x-11">
                <div className="grid flex-1 grid-cols-1 gap-y-2 gap-x-4 overflow-auto md:grid-cols-2">
                  <input
                    type="hidden"
                    disabled={!editing}
                    name="_method"
                    value="PATCH"
                  />
                  <Input
                    inputSize="sm"
                    icon={UserIcon}
                    name="name"
                    placeholder={form.name}
                    onChange={onChange}
                    value={value.name}
                    disabled={!editing}
                  />
                  <Input
                    inputSize="sm"
                    icon={EnvelopeIcon}
                    type="email"
                    name="email"
                    placeholder={form.email}
                    onChange={onChange}
                    value={value.email}
                    disabled={!editing}
                  />
                  <Input
                    inputSize="sm"
                    type="tel"
                    name="phone"
                    placeholder={form.phone}
                    onChange={onChange}
                    value={value.phone}
                    disabled={!editing}
                  />
                  <Select
                    inputSize="sm"
                    name="locale"
                    icon={FlagIcon}
                    onChange={onChange}
                    value={value.locale}
                    disabled={!editing}
                  >
                    <option value="">{form.locale}</option>
                  </Select>
                  <Input
                    inputSize="sm"
                    icon={LockClosedIcon}
                    append={
                      <EyeIcon
                        className={classNames(
                          "w-6 text-green",
                          editing ? "cursor-pointer" : ""
                        )}
                      />
                    }
                    type="password"
                    name="password"
                    placeholder={form.password}
                    onChange={onChange}
                    value={value.password}
                    disabled={!editing}
                  />
                  <Input
                    inputSize="sm"
                    icon={LockClosedIcon}
                    append={
                      <EyeIcon
                        className={classNames(
                          "w-6 text-green",
                          editing ? "cursor-pointer" : ""
                        )}
                      />
                    }
                    type="password"
                    name="password_confirmation"
                    placeholder={form.password_confirmation}
                    onChange={onChange}
                    value={value.password_confirmation}
                    disabled={!editing}
                  />
                </div>

                <div
                  onClick={editing ? handlePhotoChange : () => {}}
                  className={classNames(
                    "relative mt-[14px] flex aspect-[5/2] flex-col items-center justify-center overflow-hidden rounded-[15px] text-white md:mt-0 md:aspect-square md:w-40 md:rounded-3xl",
                    editing ? "cursor-pointer" : ""
                  )}
                >
                  {value.photo && (
                    <Image
                      width={1920}
                      height={1920}
                      src={value.photo}
                      alt="User profile pic"
                      className="image-cover absolute inset-0 z-0"
                    />
                  )}
                  <div className="absolute inset-0 z-10 bg-black/40" />
                  <div className="relative z-20 mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 md:mb-1.5 md:h-14 md:w-14">
                    {editing ? (
                      <PencilSquareIcon className="w-4 md:w-6" />
                    ) : (
                      <LockClosedIcon className="w-4 md:w-6" />
                    )}
                  </div>
                  <div
                    className={classNames(
                      "relative z-20 text-[14.81px] font-medium md:font-bold",
                      !editing ? "opacity-50" : "opacity-100"
                    )}
                  >
                    Change
                  </div>
                </div>
              </div>

              <input
                type="file"
                name="photo"
                id="photo"
                className="hidden"
                onChange={onChange}
                accept="image/*"
                disabled={!editing}
              />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SettingsPage;
