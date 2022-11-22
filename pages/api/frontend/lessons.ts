import { NextApiRequest, NextApiResponse } from "next";

import { Lesson } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";

import { handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const lessons = await Lesson.find()

        res.json(lessons.map(lesson => lesson.toObject()))
    } catch (error) {
        handleError(res, error)
    }
}