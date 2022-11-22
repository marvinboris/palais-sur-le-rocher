import { NextApiRequest, NextApiResponse } from "next";

import { Method } from "../../../app/models";
import ApiMessageType from "../../../app/types/api/message";

import { handleError } from "../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const methods = await Method.find()

        res.json(methods.map(method => method.toObject()))
    } catch (error) {
        handleError(res, error)
    }
}