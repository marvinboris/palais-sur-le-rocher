import { unlinkSync } from "fs"

import formidable from "formidable"
import { Model } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

import { deleteImage, updateImage } from "."

import { message } from "../../app/helpers/utils"

import ContentType from "../../app/types/content"
import ResourceType from "../../app/types/resource"
import ResourceInputType from "../../app/types/resource-input"

import handleRequest from "../formidable"

type Fields = { [key: string]: (fields: formidable.Fields) => Promise<any> | any }
type Keys = { [key: string]: (instance: any) => Promise<any> | any }

export const manageResource = (req: NextApiRequest, res: NextApiResponse, { information, cms, model, slug, resource, singular, file, fields, data }: {
    data: (req: NextApiRequest) => Promise<{ total: number, [key: string]: any[] | number }>
    information?: () => Promise<{ [key: string]: any }>

    cms: ContentType["cms"]
    model: Model<any>
    slug?: string[]
    resource: ResourceType
    singular: string

    fields: string[]
    file?: { name: string, uploadDir: string }
}) => {
    return {
        get: async () => res.json(await data(req)),
        info: !information ? () => { } : async () => res.json(await information()),
        show: !slug || !information ? () => { } : async (config?: { keys?: Keys }) => {
            const instance = await model.findById(slug[0])
            if (!instance) return res.json({ message: message(cms.backend.messages[resource].not_found, 'danger') })

            const input: ResourceInputType = {}
            const entries = await Promise.all(fields.map(async key => {
                const value = (config && config.keys && key in config.keys) ? (config.keys[key](instance) instanceof Promise ? await config.keys[key](instance) : config.keys[key](instance)) : instance[key]
                return [key, value]
            }))
            entries.forEach(([key, value]) => {
                input[key] = value
            });

            return res.json({ [singular]: { ...instance.toObject(), ...input }, ...(await information()) })
        },
        post: async (config?: { fields?: Fields }) => {
            const { fields: _fields, files } = await handleRequest(req, { uploadDir: file ? file.uploadDir : undefined })

            const input: ResourceInputType = {}
            const entries = await Promise.all(fields.map(async key => {
                const value = (config && config.fields && key in config.fields) ? (config.fields[key](_fields) instanceof Promise ? await config.fields[key](_fields) : config.fields[key](_fields)) : _fields[key]
                return [key, value]
            }))
            entries.forEach(([key, value]) => {
                input[key] = value
            });

            if (file) {
                const { [file.name]: fileGot } = files
                if ('size' in fileGot) {
                    if (fileGot.size > 0) input[file.name] = fileGot.newFilename
                    else unlinkSync(fileGot.filepath)
                }
            }
            await model.create(input)

            return res.json({ message: message(cms.backend.messages[resource].created, 'success') })
        },
        patch: !slug ? () => { } : async (config?: { fields?: Fields }) => {
            const instance = await model.findById(slug[0])
            if (!instance) return res.json({ message: message(cms.backend.messages[resource].not_found, 'danger') })

            const { fields: _fields, files } = await handleRequest(req, { uploadDir: file ? file.uploadDir : undefined })
            const input: ResourceInputType = {}
            const entries = await Promise.all(fields.map(async key => {
                const value = (config && config.fields && key in config.fields) ? (config.fields[key](_fields) instanceof Promise ? await config.fields[key](_fields) : config.fields[key](_fields)) : _fields[key]
                return [key, value]
            }))
            entries.forEach(([key, value]) => {
                if (value) input[key] = value
            });

            if (file) {
                const { [file.name]: fileGot } = files
                input[file.name] = updateImage(fileGot as formidable.File, instance)
            }
            await instance.updateOne(input)

            return res.json({ [singular]: instance.toObject(), message: message(cms.backend.messages[resource].updated, 'success') })
        },
        delete: !slug ? () => { } : async () => {
            const instance = await model.findById(slug[0])
            if (!instance) return res.json({ message: message(cms.backend.messages[resource].not_found, 'danger') })

            if (file && instance[file.name]) deleteImage(instance.toObject()[file.name])
            await instance.deleteOne()

            return res.json({ ...(await data(req)), message: message(cms.backend.messages[resource].deleted, 'success') })
        }
    }
}