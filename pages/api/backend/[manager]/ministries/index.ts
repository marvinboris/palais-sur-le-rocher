import path from 'path';

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Ministry } from '../../../../../app/models';

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from '../../../../../lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Ministry
        .find({
            $or: [
                { name: regex },
                { description: regex },
            ]
        })
    total = data.length

    const ministries = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(ministry => ({ ...ministry.toObject() }))

    return { ministries, total }
}

export const uploadDir = path.join(process.cwd(), 'public', 'images', 'ministries')
export const resource = 'ministries'
export const resourceConfig = {
    singular: 'ministry',
    fields: ['name', 'description', 'price', 'isActive'],
    file: { name: 'photo', uploadDir }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<unknown | { error: string }>
) {
    // const type = req.query.manager as string

    try {
        const cms = getCms()
        // const manager = await getAccount(req)
        const manage = manageResource(req, res, {
            data,
            model: Ministry,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            fields: {
                isActive: fields => fields.isActive == '1',
            }
        })
        else methodNotAllowed(req, res)
    } catch (error) {
        handleError(res, error)
    }
}

export const config: PageConfig = {
    api: {
        bodyParser: false,
    }
}