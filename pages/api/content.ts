import { NextApiRequest, NextApiResponse } from "next";
import { Event, Ministry } from "../../app/models";

import ApiMessageType from "../../app/types/api/message";

import { getCms, handleError } from "../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const cms = getCms()
        const events = await Event.find()
        const ministries = await Ministry.find()

        res.json({ cms, events: events.map(event => event.toObject()), ministries: ministries.map(ministry => ministry.toObject()) })
    } catch (error) {
        handleError(res, error)
    }
}