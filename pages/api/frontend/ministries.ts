import { NextApiRequest, NextApiResponse } from "next";

import { Ministry } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";

import { handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const ministries = await Ministry.find()

        res.json(ministries.map(ministry => ministry.toObject()))
    } catch (error) {
        handleError(res, error)
    }
}