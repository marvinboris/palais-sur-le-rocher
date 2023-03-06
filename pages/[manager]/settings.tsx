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
import { ChangeEvent, ReactElement, useState } from "react";

import { NextPageWithLayout } from "../_app";

import Layout, { Head } from "../../components/backend/navigation/layout";

import Button from "../../components/backend/ui/form/button";
import PageTitle from "../../components/backend/ui/title/page";

import Input from "../../components/frontend/ui/form/input";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import Select from "../../components/frontend/ui/form/select";

const params = {
  link: "/user/settings",
  title: "Settings | Valyou",
  description: "Your favorite e-commerce platform: your settings.",
};

type ValueType = any;

const readURL = (
  input: EventTarget & HTMLInputElement,
  setValue: (value: ValueType | ((value: ValueType) => ValueType)) => void
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
  const { data } = useAppSelector(selectAuth);

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

  return (
    <>
      <Head {...params} />
      <main className="flex-1">
        <PageTitle
          animated
          icon={AdjustmentsHorizontalIcon}
          title="Settings"
          subtitle="Manage your account details"
        />

        <div className="px-[33px] pt-[29px] pb-[54px] md:px-[42px] md:pt-[47px]">
          <div className="mb-[25px] max-w-[700px] rounded-[30px] bg-white dark:bg-secondary-800 py-8 px-[38.36px] shadow-2xl">
            <div className="mb-[46.94px] flex flex-wrap items-center justify-between md:flex-nowrap">
              <div className="order-2 md:order-1">
                <div className="mb-[4.63px] text-[25px] font-bold md:text-[22.21px] md:font-medium">
                  User Account Settings
                </div>

                <div className="text-[12.96px]">Edit or manage account</div>
              </div>

              <div className="order-1 ml-auto mb-8 flex items-center md:order-2 md:ml-0 md:mb-0">
                <Button
                  type={editing ? "submit" : "button"}
                  onClick={() => setEditing((editing) => !editing)}
                  pill
                  icon={editing ? ArrowDownOnSquareIcon : PencilIcon}
                  color={editing ? "green" : "night"}
                >
                  {editing ? "Save" : "Edit"} Settings
                </Button>
              </div>
            </div>

            <form>
              <div className="md:flex md:items-start md:space-x-11">
                <div className="grid flex-1 grid-cols-1 gap-y-2 gap-x-4 overflow-auto md:grid-cols-2">
                  <Input
                    inputSize="sm"
                    icon={UserIcon}
                    name="name"
                    placeholder="First Name"
                    onChange={onChange}
                    value={value.name}
                  />
                  <Input
                    inputSize="sm"
                    icon={EnvelopeIcon}
                    type="email"
                    name="email"
                    placeholder="E-mail Address"
                    onChange={onChange}
                    value={value.email}
                  />
                  <Input
                    inputSize="sm"
                    type="tel"
                    name="phone"
                    placeholder="054 430 3333"
                    onChange={onChange}
                    value={value.phone}
                  />
                  <Select
                    inputSize="sm"
                    name="locale"
                    icon={FlagIcon}
                    onChange={onChange}
                    value={value.locale}
                  >
                    <option value="">Select locale</option>
                  </Select>
                  <Input
                    inputSize="sm"
                    icon={LockClosedIcon}
                    append={
                      <EyeIcon className="w-6 cursor-pointer text-green" />
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                    value={value.password}
                  />
                  <Input
                    inputSize="sm"
                    icon={LockClosedIcon}
                    append={
                      <EyeIcon className="w-6 cursor-pointer text-green" />
                    }
                    type="password"
                    name="password_confirmation"
                    placeholder="Retype Password"
                    onChange={onChange}
                    value={value.password_confirmation}
                  />
                </div>

                <div
                  onClick={handlePhotoChange}
                  className="relative mt-[14px] flex aspect-[5/2] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[15px] text-white md:mt-0 md:aspect-square md:w-40 md:rounded-3xl"
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
                    <PencilSquareIcon className="w-4 md:w-6" />
                  </div>
                  <div className="relative z-20 text-[14.81px] font-medium md:font-bold">
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
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SettingsPage;
