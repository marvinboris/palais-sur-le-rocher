import { ReactElement, useEffect, useState } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { convertDate, updateObject } from "../../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { LessonInterface } from "../../../app/models/lesson";
import ResourceType from "../../../app/types/resource";

import Layout from "../../../components/backend/navigation/layout";
import Action from "../../../components/backend/ui/list/action";
import ManageRead from "../../../components/backend/ui/page/read";

import { selectAuth } from "../../../features/auth/authSlice";
import { selectBackend, _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const AudioPlayer = ({ src = "" }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    setAudio(audio);

    return () => {
      audio.pause();
      audio.remove();
    };
  }, [src]);

  return audio ? (
    <div>
      <button onClick={() => (!audio.paused ? audio.pause() : audio.play())}>
        {!audio.paused ? "Pause" : "Play"}
      </button>
    </div>
  ) : null;
};

const ManagerLessonsPage: NextPageWithLayout = () => {
  const resource: ResourceType = "lessons";

  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectAuth);
  const { data: backend } = useAppSelector(selectBackend);

  const { content } = useContentContext();
  const {
    cms: {
      backend: {
        components: {
          list: { action },
        },
        pages: {
          [resource]: { form },
        },
      },
    },
  } = content!;

  const props = {
    delete: (id: string) => dispatch(_delete({ role: role!, resource, id })),
  };

  const data = (
    backend && backend[resource] ? (backend[resource] as LessonInterface[]) : []
  ).map((item) =>
    updateObject(item, {
      created_at: convertDate(item.createdAt!),
      audio: <AudioPlayer src={item.audio} />,
      action: <Action props={props} resource={resource} item={item} />,
    })
  );

  const fields = [
    { name: form.episode, key: "episode" },
    { name: form.subtitle, key: "subtitle" },
    { name: form.description, key: "description" },
    { name: form.notes, key: "notes" },
    { name: form.audio, key: "audio" },
    { name: form.created_at, key: "created_at" },
    { name: action, key: "action", fixed: true },
  ];

  return <ManageRead data={data} fields={fields} resource={resource} />;
};

ManagerLessonsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerLessonsPage;
