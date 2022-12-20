import { Model, Schema } from "mongoose"

export interface FeatureInterface {
    id?: string
    name: string
    prefix: string
    createdAt?: Date
    updatedAt?: Date
}

export const FeatureSchema = new Schema<FeatureInterface, Model<FeatureInterface>>({
    name: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        required: true
    },
}, { timestamps: true })