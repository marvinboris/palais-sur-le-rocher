import path from 'path';

import { NextApiRequest, NextApiResponse, PageConfig } from "next";

import { Publication } from '../../../../../app/models';

import { getCms, handleError, methodNotAllowed } from "../../../../../lib/utils";
import { manageResource } from '../../../../../lib/utils/resource';
import { CategoryInterface } from '../../../../../app/models/category';

export const data = async (req: NextApiRequest) => {
    const { page = 1, show = 10, search = '' } = req.query
    let total = 0

    const regex = new RegExp(search as string, 'i')

    const data = await Publication
        .find({
            $or: [
                { description: regex },
                { title: regex },
                { body: regex },
                { 'category.name': regex },
            ]
        })
        .populate<{ category: CategoryInterface }>('category')
    total = data.length

    const publications = (show === 'All' ? data :
        data.filter((_, index) => (+page - 1) * +show <= index && index < +page * +show)
    ).map(publication => ({
        ...publication.toObject(),
        category: publication.category.name
    }))

    return { publications, total }
}

export const uploadDir = path.join(process.cwd(), 'public', 'images', 'publications')
export const resource = 'publications'
export const resourceConfig = {
    singular: 'publication',
    fields: ['description', 'title', 'body', 'isActive', 'category'],
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
            model: Publication,
            cms, resource,
            ...resourceConfig,
        })

        if (req.method === 'GET') return manage.get()
        else if (req.method === 'POST') return manage.post({
            validate: {
                title: { required: true },
                description: { required: true },
                body: { required: true },
                category: { required: true },
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