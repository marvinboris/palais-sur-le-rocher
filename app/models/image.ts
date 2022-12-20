import { Model, Schema } from "mongoose"

const directory = '/images/gallery/'

export interface ImageInterface {
    id?: string
    photo?: string
    createdAt?: Date
    updatedAt?: Date
}

export const ImageSchema = new Schema<ImageInterface, Model<ImageInterface>>({
    photo: {
        type: String,
        required: true,
        get: (photo: string) => directory + photo
    },
}, { timestamps: true, toObject: { getters: true } })
