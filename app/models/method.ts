import { Model, Schema } from "mongoose"

const directory = '/images/methods/'

export interface MethodInterface {
    name: string
    description: string
    logo?: string
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const MethodSchema = new Schema<MethodInterface, Model<MethodInterface>>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        get: (logo: string) => logo ? directory + logo : undefined
    },
    isActive: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true, toObject: { getters: true } })