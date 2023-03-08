import {
  ArrowDownOnSquareIcon,
  PlayIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";

import { useContentContext } from "../../../app/contexts/content";
import { convertDate, updateObject } from "../../../app/helpers/utils";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { LessonInterface } from "../../../app/models/lesson";
import ResourceType from "../../../app/types/resource";

import Layout from "../../../components/backend/navigation/layout";
import Button from "../../../components/backend/ui/form/button";
import Action from "../../../components/backend/ui/list/action";
import Download from "../../../components/backend/ui/list/download";
import ManageRead from "../../../components/backend/ui/page/read";

import { selectAuth } from "../../../features/auth/authSlice";
import { selectBackend, _delete } from "../../../features/backend/backendSlice";

import { NextPageWithLayout } from "../../_app";

const AudioPlayer = ({ src = "" }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [active, setActive] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [rate, setRate] = useState(1);
  let [end, setEnd] = useState(0);

  useEffect(() => {
    const audio = new Audio(src);

    const setAudioVolume = () => setVolume(audio.volume);
    const setAudioRate = () => setRate(audio.playbackRate);
    const setAudioEnd = () => setEnd((end += 1));

    // events on audio object
    audio.addEventListener("volumechange", setAudioVolume);
    audio.addEventListener("ratechange", setAudioRate);
    audio.addEventListener("ended", setAudioEnd);

    setAudio(audio);

    audio.volume = volume;
    audio.playbackRate = rate;

    return () => {
      audio.pause();

      setAudio(null);
      setActive(false);
      setEnd(0);
    };
  }, [src]);

  useEffect(() => {
    if (audio != null) {
      if (active) audio.play();
      else audio.pause();
    }
  }, [active]);

  const play = () => {
    setActive(true);
    audio!.play();
  };

  const pause = () => {
    setActive(false);
    audio!.pause();
  };

  return audio ? (
    <div>
      <Button
        size="sm"
        justify="center"
        onClick={active ? pause : play}
        color={active ? "red" : "green"}
      >
        {active ? <StopIcon className="w-5" /> : <PlayIcon className="w-5" />}
      </Button>
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
      download: <Download href={item.audio} />,
      action: <Action props={props} resource={resource} item={item} />,
    })
  );

  const fields = [
    { name: form.episode, key: "episode" },
    { name: form.description, key: "description", className: "w-full" },
    { name: form.subtitle, key: "subtitle" },
    { name: form.notes, key: "notes" },
    { name: form.audio, key: "audio" },
    { name: form.download, key: "download" },
    { name: form.created_at, key: "created_at" },
    { name: action, key: "action", fixed: true },
  ];

  return <ManageRead data={data} fields={fields} resource={resource} />;
};

ManagerLessonsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManagerLessonsPage;
