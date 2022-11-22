import { NextApiRequest, NextApiResponse } from "next";

import { StaffMember } from "../../../../app/models";
import ApiMessageType from "../../../../app/types/api/message";

import { handleError } from "../../../../lib/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | ApiMessageType>
) {
    try {
        const staffMembers = await StaffMember.find()

        res.json({
            principal: staffMembers.filter(member => member.principal).map(member => member.toObject()),
            staff: staffMembers.filter(member => !member.principal).map(member => member.toObject())
        })
    } catch (error) {
        handleError(res, error)
    }
}