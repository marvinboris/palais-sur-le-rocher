import { createContext, useContext } from "react";

import { LessonInterface } from "../models/lesson";

type Type = (LessonInterface & { _id: string; link: string }) | null;

const LessonContext = createContext<{
  lesson: Type;
  setLesson: (lesson: Type) => void;
  active: boolean;
  setActive: (active: boolean) => void;
}>({
  lesson: null,
  setLesson: () => {},
  active: false,
  setActive: () => {},
});

export const useLessonContext = () => useContext(LessonContext);

export default LessonContext;
