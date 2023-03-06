import { ChangeEvent, useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

import { useContentContext } from "../../../../../app/contexts/content";
import { classNames, resourceIcon } from "../../../../../app/helpers/utils";
import { useAppSelector } from "../../../../../app/hooks";
import { MemberInterface } from "../../../../../app/models/member";
import { MethodInterface } from "../../../../../app/models/method";
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state";
import ResourceType from "../../../../../app/types/resource";

import { selectBackend } from "../../../../../features/backend/backendSlice";

import Input from "../../form/input";
import Select from "../../form/select";

import * as utility from "../../utils";

import ManagerAddOrEdit from ".";
import Button from "../../form/button";
import { QrCodeIcon, StopIcon } from "@heroicons/react/24/outline";

type Props = { edit?: boolean };

const initialState = {
  member: "",
  method: "",
  amount: "",

  add: false,
};

export default function ManageAddOrEditTithes({ edit }: Props) {
  const resource: ResourceType = "tithes";
  const singular = "tithe";
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
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
  const [qrVisible, setQrVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => utility.add.component.inputChangeHandler(setState)(e);

  const members =
    backend && backend.members
      ? (backend.members as (MemberInterface & { _id: string })[])
      : [];
  const membersOptions = members.map((member) => (
    <option key={JSON.stringify(member)} value={member._id}>
      {member.name}
    </option>
  ));

  const methods =
    backend && backend.methods
      ? (backend.methods as (MethodInterface & { _id: string })[])
      : [];
  const methodsOptions = methods.map((method) => (
    <option key={JSON.stringify(method)} value={method._id}>
      {method.name}
    </option>
  ));

  const start = () => {
    qrScanner?.start();
    setQrVisible(true);
  };

  const stop = () => {
    qrScanner?.stop();
    setQrVisible(false);
  };

  useEffect(() => {
    if (videoRef.current !== null) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setState((state) => ({ ...state, member: result.data }));
          qrScanner.stop();
          setQrVisible(false);
        },
        { returnDetailedScanResult: true }
      );
      setQrScanner(qrScanner);
    }
  }, [videoRef.current]);

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
              icon={resourceIcon("members")}
              name="member"
              label={form.member}
              onChange={inputChangeHandler}
              required
              validation={{ required: true }}
              append={
                <div className="relative">
                  <QrCodeIcon onClick={start} className="w-5 cursor-pointer" />

                  <div
                    onClick={stop}
                    className={classNames(
                      "fixed inset-0 z-40 flex items-center justify-center bg-black/60 transition-all duration-200",
                      qrVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    )}
                  >
                    <div className="container">
                      <div className="mx-auto max-w-sm">
                        <video
                          ref={videoRef}
                          className="aspect-video w-full bg-white dark:bg-secondary-800"
                        />
                        <Button icon={StopIcon} onClick={stop} className="mt-4">
                          Stop
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              }
              value={state.member as string}
            >
              <option>{form.select_member}</option>
              {membersOptions}
            </Select>
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
