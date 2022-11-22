import { Lesson } from "../models";
import { LessonInterface } from "../models/lesson";

const lessons: LessonInterface[] = [
    { notes: "Notes par défaut", date: new Date(2022, 9, 21, 1).getTime(), description: "Les obstacles à la manifestation de l'alliance", episode: 283, audio: `20220923_194944.m4a`, subtitle: "Etude Biblique" },
]

export default async function lessonsSeed() {
    await Lesson.insertMany(lessons)
}