import { NextApiRequest, NextApiResponse } from "next";

import { Event } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";

import { handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const events = await Event.find()

        res.json(events.map(event => event.toObject()))
    } catch (error) {
        handleError(res, error)
    }
}