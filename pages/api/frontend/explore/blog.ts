import { NextApiRequest, NextApiResponse } from "next";

import { Publication } from "../../../../app/models";
import ApiMessageType from "../../../../app/types/api/message";

import { handleError } from "../../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const publications = await Publication.find().populate('category')

        res.json(publications.map(publication => publication.toObject()))
    } catch (error) {
        handleError(res, error)
    }
}