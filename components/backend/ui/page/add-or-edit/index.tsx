import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import {
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useContentContext } from "../../../../../app/contexts/content";
import { resourceIcon } from "../../../../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import ManagerResourceManageStateType from "../../../../../app/types/account/manager/add-or-edit/state";
import Status from "../../../../../app/types/enums/status";
import ResourceType from "../../../../../app/types/resource";

import { selectAuth } from "../../../../../features/auth/authSlice";
import {
  info,
  patch,
  post,
  reset,
  selectBackend,
  show,
  _delete,
} from "../../../../../features/backend/backendSlice";

import { Head } from "../../../navigation/layout";

import Button from "../../form/button";
import PageTitle from "../../title/page";

import * as utility from "../../utils";

type Props = {
  initialState: ManagerResourceManageStateType;
  resource: ResourceType;
  singular: string;
  edit?: boolean;
  children?: ReactNode;
  staticChild?: ReactNode;
  state: ManagerResourceManageStateType;
  setState: Dispatch<SetStateAction<ManagerResourceManageStateType>>;
};

const ManagerAddOrEdit = ({
  initialState,
  resource,
  singular,
  edit,
  children,
  staticChild,
  state,
  setState,
}: Props) => {
  const icon = resourceIcon(resource);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectAuth);
  const { status, data: backend, message } = useAppSelector(selectBackend);

  const { content } = useContentContext();
  const {
    cms: {
      global: { app_name },
      backend: {
        components: {
          form: { save },
        },
        pages: { [resource]: cms },
      },
    },
  } = content!;

  const [isMounted, setIsMounted] = useState(false);

  const params = useMemo(() => ({ role: role!, resource }), [resource, role]);
  const props = useMemo(
    () => ({
      ...{
        auth: { role: role! },
        backend: { status, data: backend!, message },
        content: content!,
        history: router,

        reset: () => dispatch(reset()),
      },
      ...(edit
        ? {
            edit: true,
            id: router.query.id as string,

            show: (id: string) => dispatch(show({ ...params, id })),
            patch: (id: string, data: any) =>
              dispatch(patch({ ...params, id, data })),
          }
        : {
            info: () => dispatch(info(params)),
            post: (data: any) => dispatch(post({ ...params, data })),
          }),
    }),
    [backend, content, dispatch, edit, message, params, role, router, status]
  );

  useEffect(() => {
    if (status === Status.IDLE && !backend)
      utility.add.lifecycle.componentDidMount(props, setIsMounted);

    return () => {
      if (backend && !backend.message) dispatch(reset());
    };
  }, [backend, dispatch, props, status]);

  useEffect(() => {
    if (!state._id)
      utility.add.lifecycle.componentDidUpdate(resource, singular)(
        props,
        state,
        setState,
        () => setState({ ...initialState })
      );
  }, [
    initialState,
    message,
    props,
    resource,
    setState,
    singular,
    state,
    status,
  ]);

  const _content = (
    <div>
      {children}

      <div className="mt-5">
        <Button color="green" icon={ArrowDownOnSquareIcon}>
          {save}
        </Button>
      </div>
    </div>
  );

  return (
    <main className="flex flex-1 flex-col">
      <Head
        link={
          edit
            ? `/${role}/${resource}/${router.query.id as string}/edit`
            : `/${role}/${resource}/add`
        }
        title={`${edit ? ('edit' in cms ? cms.edit : '') : ('add' in cms ? cms.add : '')} | ${app_name}`}
        description={`${app_name} : ${edit ? ('edit' in cms ? cms.edit : '') : ('add' in cms ? cms.add : '')}`}
      />

      <PageTitle
        icon={icon}
        title={cms.title}
        subtitle={edit ? ('edit' in cms ? cms.edit : '') : ('add' in cms ? cms.add : '')}
      />

      <utility.add.lifecycle.render
        icon={icon}
        props={props}
        isMounted={isMounted}
        resource={resource}
      >
        {staticChild}
        {_content}
      </utility.add.lifecycle.render>
    </main>
  );
};

export default ManagerAddOrEdit;
