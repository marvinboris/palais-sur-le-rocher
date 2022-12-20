import path from 'path';

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Testimonial } from '../../../../../app/models';

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from '../../../../../lib/utils/resource';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Testimonial
        .find({
            $or: [
                { name: regex },
                { title: regex },
                { body: regex },
            ]
        })
    total = data.length

    const testimonials = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(testimonial => ({ ...testimonial.toObject() }))

    return { testimonials, total }
}

export const uploadDir = path.join(process.cwd(), 'public', 'images', 'testimonials')
export const resource = 'testimonials'
export const resourceConfig = {
    singular: 'testimonial',
    fields: ['name', 'title', 'body', 'isActive'],
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
            model: Testimonial,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                name: { required: true },
                title: { required: true },
                body: { required: true },
            },
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